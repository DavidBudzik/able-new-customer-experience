import { useState, useEffect, useRef } from 'react';
import ChatInputField from '../ChatInputField';
import './ChatPanel.css';

interface ChatPanelProps {
  initialQuery?: string;
}

export default function ChatPanel({ initialQuery }: ChatPanelProps) {
  const [messages, setMessages] = useState<Array<{ type: string; content: string; chips?: string[] }>>([
    {
      type: 'system',
      content: `Hello! I'm Able, your AI research assistant. How can I help you today?`,
      chips: ['Deep dive on a company', 'Market analysis', 'Competitor research'],
    },
  ]);
  const [input, setInput] = useState('');
  const hasProcessedInitialQuery = useRef(false);

  // Process initial query from Hero omnibar
  useEffect(() => {
    if (initialQuery && !hasProcessedInitialQuery.current) {
      hasProcessedInitialQuery.current = true;
      
      // Add user message and AI response
      setMessages((prev) => [
        ...prev,
        { type: 'user', content: initialQuery },
        {
          type: 'system',
          content: `I'm analyzing your request: "${initialQuery}"\n\nHere's what I'm working on:\n\n• Gathering relevant data and insights\n• Analyzing market trends and competitive landscape\n• Identifying key patterns and opportunities\n\nWould you like me to dive deeper into any specific aspect?`,
          chips: ['Show detailed analysis', 'Export findings', 'Compare with competitors'],
        },
      ]);
    }
  }, [initialQuery]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { type: 'user', content: input },
      {
        type: 'system',
        content: `Comparison Summary:\n\nAcme Corp focuses on demand forecasting with a SaaS model, targeting enterprise logistics. Series B, $12M ARR.\n\nTechFlow specializes in route optimization with an API-first approach, targeting mid-market. Series A, $5M ARR.\n\nKey difference: Acme is more enterprise-focused while TechFlow has a developer-centric go-to-market.`,
      },
    ]);
    setInput('');
  };

  return (
    <div className="chat-panel">
      <div className="chat-body">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-msg ${msg.type === 'user' ? 'user' : 'system'}`}>
            <div className="msg-content">{msg.content}</div>
            {msg.chips && (
              <div className="msg-chips">
                {msg.chips.map((chip, i) => (
                  <span key={i} className="chip">
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <ChatInputField
          placeholder="Ask Able anything..."
          variant="compact"
          value={input}
          onChange={setInput}
          onSubmit={handleSend}
          className="chat-panel-input"
        />
      </div>
    </div>
  );
}

