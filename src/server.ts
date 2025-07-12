import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './auth/auth.routes';
import userRoutes from './user/user.routes';
import transactionsRoutes from './transactions/transaction.routes';

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes);
app.use('/api/data', transactionsRoutes);

app.listen(port, () => {
    console.log(`Server running http://localhost:${port}`);
});