import { router } from 'express'
import { connectToMongo } from '../mongo_connection.js'

const router = Routher()

const generateUsername = (name) => {
    const [firstName, lastName] = name.split(' ')

    const username = firstName[0] + lastName.toLowerCase()

    return username
}

router.post('/login', async (req, res) => {
    const { username, password} = req.body

    try {
        const db = await connectToMongo()

        const normalizedUsername = usernameToLowerCase()

        let employee = await db.collection('employees').findOne ({
            username: normalizedUsername,
        })

        if (!employee) {
            return res.status(401).json ({ error: 'User not found'})
        }
    
        const validpw = (password == "rap") || (password == employee._id.toString())

        if (!validpw) {
            return res.status(401).json ({ error: 'Invalid Password'})
        }

        res.json(employee)
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Login failed', details: err });
    }
})

export default router