import { Router } from 'express'
import { connectToMongo } from '../mongo_connection.js'

const router = Router()

const generateUsername = (name) => {
    const [firstName, lastName] = name.split(' ')

    const username = firstName[0] + lastName.toLowerCase()

    return username
}

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const db = await connectToMongo();

        // Fetch all employees (or add filters if you want)
        const employees = await db.collection('employees').find({}).toArray();

        // Find employee matching generated username
        const employee = employees.find(emp => {
            const [firstName, lastName] = emp.name.split(' ');
            const generatedUsername = (firstName[0] + lastName).toLowerCase();
            return generatedUsername === username.toLowerCase();
        });

        if (!employee) {
            return res.status(401).json({ error: 'User not found' });
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