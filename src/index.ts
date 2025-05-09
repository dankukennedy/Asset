import express from 'express'
import env from "../env";
import assetRoutes from './routes/assetRoutes'
import userRoutes from './routes/userRoutes';
import  blockRoutes from './routes/blockRoutes'
import  departmentRoutes from './routes/deptRoutes'
import  assetUserRoutes from './routes/assetUserRoutes'
import  roomRoutes from './routes/roomRoutes'
import  allocationRoutes from './routes/allocationRoutes'
import  transferRoutes from './routes/transferRoute'
import  auditRoutes from './routes/systemAuditRoutes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/api', userRoutes);
app.use('/api', assetRoutes);
app.use('/api', blockRoutes);
app.use('/api', departmentRoutes);
app.use('/api', assetUserRoutes);
app.use('/api', roomRoutes);
app.use('/api', allocationRoutes);
app.use('/api', transferRoutes);
app.use('/api', auditRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})

