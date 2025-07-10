import { MongoClient } from "mongodb"
import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const mongoUri = "mongodb://localhost:27017"
const dbName = "employeeDB"
const collectionName = "employees"

async function loadData() {
    try {
        const filePath = path.join(__dirname, "datasets", "employees.json")
        const fileData = await fs.readFile(filePath, "utf-8")
        const employees = JSON.parse(fileData)

        const client = new MongoClient(mongoUri)
        await client.connect()
        console.log("Connected to MongoDB")

        const db = client.db(dbName)
        const collection = db.collection(collectionName)

        const result = await collection.insertMany(employees)
        console.log(`${result.insertedCount} documents inserted.`)

        await client.close()
        } catch (err) {
            console.error("Error loading data:", err)
    }
}

loadData()