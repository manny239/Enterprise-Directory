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

// New route to get manager and subordinate data by employee ID
router.get('/employee/:id/hierarchy', async (req, res) => {
  const { id } = req.params

  try {
    const db = await connectToMongo()
    const employees = await db.collection('employees').find({}).toArray()

    const currentEmployee = employees.find(emp => emp._id === id)
    if (!currentEmployee) {
      return res.status(404).json({ error: 'Employee not found' })
    }

    // Find manager using reportsTo field
    let manager = null
    if (currentEmployee.reportsTo) {
      manager = employees.find(emp => emp._id === currentEmployee.reportsTo)
    }

    // Find subordinates (employees who report to this employee)
    const subordinates = employees.filter(emp => emp.reportsTo === currentEmployee._id)

    res.json({
      manager: manager ? {
        _id: manager._id,
        fullName: manager.name,
        phoneNumber: manager.phone_number,
        jobRole: manager.job_role,
        workLocation: manager.work_location
      } : null,
      subordinates: subordinates.map(sub => ({
        _id: sub._id,
        fullName: sub.name,
        phoneNumber: sub.phone_number,
        jobRole: sub.job_role,
        workLocation: sub.work_location,
        salary: sub.salary
      }))
    })
  } catch (error) {
    console.error('Error fetching hierarchy:', error)
    res.status(500).json({ error: 'Failed to fetch hierarchy data' })
  }
})

export default router
