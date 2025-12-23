import { useState, useRef, useEffect, type KeyboardEvent, type ChangeEvent } from 'react';
import { Send } from 'lucide-react';
import './ChatInputField.css';

export interface ChatInputFieldProps {
  /** Placeholder text for the input */
  placeholder?: string;
  /** Visual variant: 'full' for multi-line style, 'compact' for single row */
  variant?: 'full' | 'compact';
  /** Callback when user submits the input */
  onSubmit?: (value: string) => void;
  /** Controlled input value */
  value?: string;
  /** Callback when input value changes */
  onChange?: (value: string) => void;
  /** Callback when input receives focus */
  onFocus?: () => void;
  /** Callback when input loses focus */
  onBlur?: () => void;
  /** Additional class name */
  className?: string;
  /** Disable the input */
  disabled?: boolean;
}

export default function ChatInputField({
  placeholder = 'Start a new research in this folder...',
  variant = 'full',
  onSubmit,
  value: controlledValue,
  onChange,
  onFocus,
  onBlur,
  className = '',
  disabled = false,
}: ChatInputFieldProps) {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Support both controlled and uncontrolled modes
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const isActive = value.trim().length > 0;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const handleSubmit = () => {
    if (!isActive || disabled) return;
    onSubmit?.(value);
    if (!onChange) {
      setInternalValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    // Show cursor blink only when focused and empty
  }, [isFocused, value]);

  const containerClasses = [
    'chat-input-field',
    variant === 'compact' && 'chat-input-field--compact',
    className,
  ].filter(Boolean).join(' ');

  const buttonClasses = [
    'chat-input-field__send-btn',
    isActive && !disabled ? 'chat-input-field__send-btn--active' : 'chat-input-field__send-btn--disabled',
  ].join(' ');

  return (
    <div className={containerClasses} onClick={handleContainerClick}>
      <div className="chat-input-field__text-container">
        <div className="chat-input-field__input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="chat-input-field__input"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsFocused(true);
              onFocus?.();
            }}
            onBlur={() => {
              setIsFocused(false);
              onBlur?.();
            }}
            disabled={disabled}
          />
          {isFocused && value === '' && (
            <span className="chat-input-field__cursor" />
          )}
        </div>
      </div>
      <div className="chat-input-field__button-container">
        <button
          type="button"
          className={buttonClasses}
          onClick={handleSubmit}
          disabled={!isActive || disabled}
          aria-label="Send message"
        >
          <Send />
        </button>
      </div>
    </div>
  );
}

