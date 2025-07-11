import { MongoClient } from 'mongodb';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in an ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection details
const mongoUri = 'mongodb://localhost:27017';
const dbName = 'employeeDB';
const collectionName = 'employees';

// Path to output JSON file (inside the backend/datasets folder)
const outputFilePath =  './employees_from_db.json';  // Correct path

async function exportData() {
    try {
        // Step 1: Connect to MongoDB
        const client = new MongoClient(mongoUri);
        await client.connect();
        console.log('Connected to MongoDB');

        // Get the database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Step 2: Fetch all employees from MongoDB
        const employees = await collection.find({}).toArray();
        console.log(`Found ${employees.length} employees.`);

        // Step 3: Write the data to a new JSON file in the datasets folder
        await fs.writeFile(outputFilePath, JSON.stringify(employees, null, 2), 'utf-8');
        console.log(`Data successfully exported to: ${outputFilePath}`);

        // Close the MongoDB connection
        await client.close();
    } catch (err) {
        console.error('Error exporting data:', err);
    }
}

// Run the export function
exportData();
