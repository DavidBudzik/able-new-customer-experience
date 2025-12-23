import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import ChatInputField from './ChatInputField';
import './Hero.css';

const suggestedQueries = [
  'Deep dive on monday.com',
  'Scan AI in logistics',
  'Competitor analysis for Stripe',
  'Market mapping for Fintech in EU',
  'Risk report for Vendor X',
];

export default function Hero() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (value?: string) => {
    const queryValue = value || query;
    if (!queryValue.trim()) return;
    navigate('/chat', { state: { initialQuery: queryValue } });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setIsFocused(false);
    // Auto-submit after selecting a suggestion
    navigate('/chat', { state: { initialQuery: suggestion } });
  };

  return (
    <section className="hero">
      <h1>Good afternoon, Erez.</h1>
      <p>
        Start with your playbooks, or open curated intelligence generated for your team.
      </p>

      <div className="omnibar-container" ref={containerRef}>
        <ChatInputField
          placeholder="Try: 'Deep dive on monday.com' or 'Scan AI in logistics'"
          variant="compact"
          value={query}
          onChange={setQuery}
          onFocus={() => setIsFocused(true)}
          onSubmit={handleSubmit}
          className="hero-search-input"
        />

        {isFocused && (
          <div className="suggestions-modal">
            <div className="suggestions-header">Suggested Queries</div>
            <div className="suggestions-grid">
              {suggestedQueries.map((suggestion) => (
                <button
                  key={suggestion}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Search size={14} />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
