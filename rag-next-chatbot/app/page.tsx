'use client';

import { useEffect, useRef } from 'react';
import { useChat } from 'ai/react';

import Bubble from './components/Bubble';
import LoadingBubble from './components/LoadingBubble';
import PromptsSuggestionsRow from './components/PromptSuggestionsRow';

export default function Home() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
  } = useChat({
    api: '/api/chat',
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <main>
      <h1>Let's build a F1 RAG Chatbot!</h1>

      <section className="populated">
        {messages.map((message) => (
          <Bubble
            key={message.id}
            message={{
              role: message.role as 'user' | 'assistant',
              content: message.content,
            }}
          />
        ))}

        {isLoading && <LoadingBubble />}

        <div ref={messagesEndRef} />

        {messages.length === 0 && (
          <div className="starter-text">
            <PromptsSuggestionsRow onPromptClick={handlePromptClick} />
          </div>
        )}
      </section>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about F1 racing..."
          disabled={isLoading}
        />

        <input
          type="submit"
          value={isLoading ? '...' : 'Send'}
          disabled={isLoading}
        />
      </form>
    </main>
  );
}