import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017'
const dbName = process.env.DB_NAME || 'employeesDB'
const collectionName = 'employees'

function getTier(role = '') {
  const r = role.toLowerCase()
  if (r === 'ceo' || r.includes('chief') || r.includes('vp')) return 1
  if (r.includes('director')) return 2
  if (r.includes('manager')) return 3
  if (r.includes('analyst') || r.includes('engineer')) return 4
  return 5
}

async function buildHierarchy() {
  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db(dbName)
  const employees = await db.collection(collectionName).find({}).toArray()
  await client.close()

  const locationMap = {}

  // Group employees by location and assign tier
  for (const emp of employees) {
    const tier = getTier(emp.job_role)
    const location = emp.work_location

    const enriched = { ...emp, tier, reportsTo: null }

    if (!locationMap[location]) locationMap[location] = []
    locationMap[location].push(enriched)
  }

  // Assign managers
  for (const location in locationMap) {
    const emps = locationMap[location]

    for (const emp of emps) {
      const potentialManagers = emps.filter(e => e.tier < emp.tier)
      if (potentialManagers.length > 0) {
        // Pick the first available higher-tier person as manager
        emp.reportsTo = potentialManagers[0].name
      }
    }
  }

  // Print out the hierarchy
  for (const location in locationMap) {
    console.log(`\n📍 ${location.toUpperCase()}`)

    const emps = locationMap[location].sort((a, b) => a.tier - b.tier)

    for (const emp of emps) {
      console.log(`- ${emp.name} (${emp.job_role}, Tier ${emp.tier})`)
      if (emp.reportsTo) {
        console.log(`   ↳ Reports to: ${emp.reportsTo}`)
      }
    }
  }
}

buildHierarchy()

