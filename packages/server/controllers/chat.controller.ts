import { z } from 'zod';
import { chatService } from '../services/chat.service';
import type { Request, Response } from 'express';

const chatSchema = z.object({
    prompt: z.string().trim()
        .min(10, "Prompt must be at least 10 characters long")
        .max(1000, "Prompt must be at most 100 characters long"),
    conversationId: z.string().uuid("Invalid conversation ID"),
})


export const chatController = {
    async SendMessage(req: Request, res: Response) {
        try {
            const validation = chatSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({ error: "Invalid request body", details: validation.error.format() })
            }
            const { prompt, conversationId } = validation.data;
            const response = await chatService.sendMessage(conversationId, prompt);
            res.json({ response: response.message });
        }
        catch (error) {
            console.error("Error communicating with OpenAI:", error);
            res.status(500).json({ error: "Failed to get response from OpenAI" });
        }
    }
}