import express from 'express'
import { chatController } from './controllers/chat.controller';
import type { Request, Response } from 'express';

export const router = express.Router();

router.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
});

router.get('/api/status', (req: Request, res: Response) => {
    res.json({ status: 'API is running' });
});


router.post('/api/chat', chatController.SendMessage)