import { MongoClient} from 'mongodb'

//Mongo Connection
async function connectToMongo() {
    try {
        const uri = process.env.MONGO_URI
        const client = new MongoClient(uri)
        await client.connect()
        console.log('Connected to MongoDB successfully')
        return client.db(process.env.DB_NAME || 'employeeDB')
    } catch (err) {
        console.error('Error connecting to Mongo', err)
    }
}

export { connectToMongo }