interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface BubbleProps {
  message: Message;
}

const Bubble = ({ message }: BubbleProps) => {
  const { content, role } = message;

  return (
    <div className={`${role} bubble`}>
      {content}
    </div>
  );
};

export default Bubble;