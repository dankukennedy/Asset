import express from 'express'
//import userRoutes from './routes/assetRoutes'
import userRoutes from './routes/userRoutes';

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())


app.use('/api', userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})