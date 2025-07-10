import { Router } from 'express'
import { connectToMongo } from '../mongo_connection.js'

const router = Router()

const generateUsername = (name) => {
    return name.replace(/\s+/g, '').toLowerCase()
  }


router.post('/login', async (req, res) => {
    console.log('POST /api/login hit with body:', req.body) 
    const { username, password } = req.body
  
    try {
      const db = await connectToMongo()
  
      const employees = await db.collection('employees').find({}).toArray()
      console.log(`Total employees in DB: ${employees.length}`)


      // Match username
      const employee = employees.find(emp =>
        generateUsername(emp.name) === username.toLowerCase()
      )
  
      if (!employee) {
        return res.status(401).json({ error: 'User not found' })
      }

        // Password check (demo): password == 'rap' or matches MongoDB _id as string
        const validpw = password === 'rap' || password === employee._id.toString();

        if (!validpw) {
            return res.status(401).json({ error: 'Invalid Password' });
        }

        res.json(employee);
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Login failed', details: err });
    }
});


export default router