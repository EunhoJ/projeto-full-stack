import 'dotenv/config';
import dotenv from 'dotenv';
import app from './src/app.js';

dotenv.config();
const port = process.env.PORT || 3300;

app.listen(port, () => {
  console.log(`Servidor rodando.`);
})