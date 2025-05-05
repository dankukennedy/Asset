import express from 'express'
import env from "../env";
import assetRoutes from './routes/assetRoutes'
import userRoutes from './routes/userRoutes';
import  blockRoutes from './routes/blockRoutes'
import  departmentRoutes from './routes/deptRoutes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/api', userRoutes);
app.use('/api', assetRoutes);
app.use('/api', blockRoutes);
app.use('/api', departmentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})

