import { Router } from 'express'
import { connectToMongo } from '../mongo_connection.js'

const router = Router()

const generateUsername = (name) => {
    return name.replace(/\s+/g, '').toLowerCase()
  }


router.post('/login', async (req, res) => {
    console.log('POST /api/auth/login hit with body:', req.body) 
    const { username, password } = req.body
  
    try {
      const db = await connectToMongo()
      
      if (!db) {
        return res.status(500).json({ error: 'Database connection failed' })
      }
  
      const employees = await db.collection('employees').find({}).toArray()
      console.log(`Total employees in DB: ${employees.length}`)

      if (employees.length === 0) {
        return res.status(500).json({ error: 'No employees found in database' })
      }

      // Match username
      const employee = employees.find(emp =>
        generateUsername(emp.name) === username.toLowerCase()
      )
  
      if (!employee) {
        console.log('Available usernames:', employees.slice(0, 5).map(emp => generateUsername(emp.name)))
        return res.status(401).json({ error: 'User not found' })
      }

        // Password check (demo): password == 'rap' or matches MongoDB _id as string
        const validpw = password === 'rap' || password === employee._id.toString();

        if (!validpw) {
            return res.status(401).json({ error: 'Invalid Password' });
        }

        res.json({
            success: true,
            message: 'Login successful',
            user: {
                _id: employee._id,
                fullName: employee.name,
                phoneNumber: employee.phone_number,
                jobRole: employee.job_role,
                workLocation: employee.work_location,
                salary: employee.salary
            }
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Login failed', details: err.message });
    }
});


export default router