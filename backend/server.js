import express from "express"
import { MongoClient, ObjectID } from 'mongodb'
import dotenv from 'dotenv'
import corsn from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || 'mongobd://localhost:27017'
const DB_NAME = process.env.DBNAME || 'employeesDB'

app.use(cors())
app.use(express.json())

let db

const connectTOMongo = async () => {
    try{
        const client = new MongoClient(MONGO_URI)
        await client.connect()
        console.log('Connected to Mongo')
        db = client.db(DB_NAME)
    } catch (err){
        console.error('Failed to connect to Mongo'. err)
    }
}

//Fire up Server
app.listen(PORT, async() => {
    await connectToMongo()
    console.log(`Serverr running on port ${PORT}`)
})

