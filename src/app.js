import cors from 'cors';
import express from 'express';
import userRoutes from './routes/user.routes.js'
// import productRoutes from './routes/product.routes';
// import productRoutes from './routes/product.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes)
// app.use('/api/products', productRoutes)
// app.use('/api/categories', categoryRoutes)

export default app;