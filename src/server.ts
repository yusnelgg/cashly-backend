import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './auth/auth.routes'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/api/auth', authRoutes)

app.listen(port, () => {
    console.log(`Server running http://localhost:${port}`);
});