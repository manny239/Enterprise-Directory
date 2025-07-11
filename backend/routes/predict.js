import { Router } from 'express'
import { spawn } from "child_process"

const router = Router()

router.post('/predict', async (req, res) => {
    const pythonProcess = spawn('python', [scriptPath, ...args])
})

export default router