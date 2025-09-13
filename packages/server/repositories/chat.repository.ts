const conversationMap = new Map<string, string>();

export const chatRepository = {
    getConversationResponseId: (conversationId: string): string | undefined => {
        return conversationMap.get(conversationId);
    },
    setConversationResponseId: (conversationId: string, responseId: string): void => {
        conversationMap.set(conversationId, responseId);
    }
}