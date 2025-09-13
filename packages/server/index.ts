import express from 'express';

import dotenv from 'dotenv';
import { chatController } from './controllers/chat.controller';
dotenv.config();


const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.post('/api/chat', chatController.SendMessage)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});