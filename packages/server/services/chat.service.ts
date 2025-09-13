import OpenAI from 'openai';
import { chatRepository } from '../repositories/chat.repository';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

type ChatResponse = {
    id: string;
    message: string;
}


export const chatService = {
    async sendMessage (conversationId: string, prompt: string): Promise<ChatResponse> {
        const response = await openai.responses.create({
            model: "gpt-4o-mini",
            input: prompt,
            temperature: 0.2,
            max_output_tokens: 100,
            previous_response_id: chatRepository.getConversationResponseId(conversationId),
        })
        console.log(chatRepository.getConversationResponseId(conversationId));
        chatRepository.setConversationResponseId(conversationId, response.id);
        return { id: response.id, message: response.output_text } as ChatResponse;
    }
}