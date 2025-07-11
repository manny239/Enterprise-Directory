import { Router } from 'express'
import { connectToMongo } from '../mongo_connection.js'

const router = Router()

router.get ("/jobroles", async (req, res) => {
    try {
        const db = await connectToMongo()
        const collection = db.collection("employees")
        const data = await collection.distinct("job_role").toArray()

        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Failed to fetch valid data' })
    }
})

router.get ("/worklocations", async (req, res) => {
    try {
        const db = await connectToMongo()
        const collection = db.collection("employees")
        const data = await collection.distinct("work_location").toArray()

        res.status(200).json(data)
    }
    catch (err) {
        console.log (err)
    }
})

export default router