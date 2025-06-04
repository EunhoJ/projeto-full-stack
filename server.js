import 'dotenv/config';
import env from 'dotenv';
import app from './src/app.js';

env.config();
const port = process.env.PORT || 3300;

app.listen(port, () => {
  console.log(`Servidor rodando.`);
})