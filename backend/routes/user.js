import { Router } from 'express'
import { connectToMongo } from '../mongo_connection.js'

const router = Router()

function getTier(role = '') {
  const r = role.toLowerCase()
  if (r === 'ceo' || r.includes('chief') || r.includes('vp')) return 1
  if (r.includes('director')) return 2
  if (r.includes('manager')) return 3
  if (r.includes('analyst') || r.includes('engineer')) return 4
  return 5
}

// POST /api/me
router.post('/me', async (req, res) => {
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

  // Find manager (1 tier above in same location)
  const manager = employees.find(emp =>
    getTier(emp.job_role) < userTier &&
    emp.work_location === userLocation
  )

  // Find direct reports (1 tier below in same location)
  const directReports = employees.filter(emp =>
    getTier(emp.job_role) > userTier &&
    emp.work_location === userLocation &&
    emp.name !== currentUser.name
  )

  res.json({
    name: currentUser.name,
    job_role: currentUser.job_role,
    work_location: currentUser.work_location,
    phone_number: currentUser.phone_number,
    salary: currentUser.salary,
    reportsTo: manager ? manager.name : null,
    directReports: directReports.map(e => ({
      name: e.name,
      job_role: e.job_role,
      work_location: e.work_location,
      salary: e.salary // Frontend can hide this unless HR
    }))
  })
})

export default router
