import { FaArrowUp } from 'react-icons/fa';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';

type FormData = {
  prompt: string;
};

type ChatFormProps = {
  onSubmit: (data: FormData) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLFormElement>) => void;
};

const ChatForm: React.FC<ChatFormProps> = ({ onSubmit, onKeyDown }) => {
  const { register, handleSubmit, formState, reset } = useForm<FormData>();

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      className="flex flex-col gap-4 items-end border-2 p-4 rounded-3xl"
      onSubmit={handleSubmit(handleFormSubmit)}
      onKeyDown={onKeyDown}
    >
      <textarea
        {...register('prompt', {
          required: true,
          maxLength: 1000,
          validate: (value) => value.trim().length > 0,
        })}
        className="w-full border-0 focus:outline-0 resize-none"
        maxLength={1000}
        placeholder="Ask me anything..."
      />
      <Button className="rounded-full" disabled={!formState.isValid}>
        <FaArrowUp />
      </Button>
    </form>
  );
};

export default ChatForm;
