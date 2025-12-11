import ReactMarkdown from 'react-markdown';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

type MessageListProps = {
  messages: Message[];
  isBotTyping: boolean;
};

const MessageList: React.FC<MessageListProps> = ({ messages, isBotTyping }) => {
  return (
    <div className="flex flex-col gap-4 mb-4 h-[70vh] overflow-y-auto">
      {messages.map((message, index) => (
        <p
          className={`px-3 py-1 ${
            message.role === 'user'
              ? 'bg-blue-600 text-white self-end'
              : 'bg-gray-100 text-black self-start'
          } rounded-2xl`}
          key={index}
          onCopy={(e) => {
            e.preventDefault();
            const selection = window.getSelection();
            if (selection) {
              const selectedText = selection.toString();
              navigator.clipboard.writeText(selectedText);
            }
          }}
        >
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </p>
      ))}
      {isBotTyping && (
        <div className="flex gap-1 self-start px-3 py-3 bg-gray-200 text-black rounded-2xl">
          <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.1s]"></div>
          <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.2s]"></div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
