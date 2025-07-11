import { Router } from 'express'
import { connectToMongo } from '../mongo_connection.js'

const router = Router()

const directReportsCache = {}

function getTier(role = '') {
  const r = role.toLowerCase()
  if (r === 'ceo' || r.includes('chief') || r.includes('vp')) return 1
  if (r.includes('director')) return 2
  if (r.includes('manager')) return 3
  if (r.includes('analyst') || r.includes('engineer')) return 4
  return 5
}

function getRandomItems(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}


router.post('/user', async (req, res) => {
  const { username } = req.body

  if (!username) {
    return res.status(400).json({ error: 'Username required' })
  }

  const db = await connectToMongo()
  const employees = await db.collection('employees').find({}).toArray()

  const currentUser = employees.find(emp => 
    emp.name.replace(/\s+/g, '').toLowerCase() === username.toLowerCase()
  )

  if (!currentUser) {
    return res.status(404).json({ error: 'User not found' })
  }

  const userTier = getTier(currentUser.job_role)
  const userLocation = currentUser.work_location

  const manager = employees.find(emp =>
    getTier(emp.job_role) < userTier &&
    emp.work_location === userLocation
  )

  let randomDirectReports = directReportsCache[username]

  if (!randomDirectReports) {
    const directReports = employees.filter(emp =>
      getTier(emp.job_role) > userTier &&
      emp.work_location === userLocation &&
      emp.name !== currentUser.name
    )
    const numDirectReports = Math.floor(Math.random() * 3) + 1 
    randomDirectReports = getRandomItems(directReports, numDirectReports)
    directReportsCache[username] = randomDirectReports
  }

  res.json({
    name: currentUser.name,
    job_role: currentUser.job_role,
    work_location: currentUser.work_location,
    phone_number: currentUser.phone_number,
    salary: currentUser.salary,
    reportsTo: manager ? manager.name : null,
    directReports: randomDirectReports.map(e => ({
      name: e.name,
      job_role: e.job_role,
      work_location: e.work_location,
      salary: e.salary
    }))
  })
})

export default router
