import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, FolderPlus, Check, X, Pencil, Play, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import AbleLogo from '../components/AbleLogo';
import ChatInputField from '../components/ChatInputField';
import './Chat.css';

interface LocationState {
  initialQuery?: string;
}

interface PlanStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'running' | 'completed' | 'skipped';
  isEditing?: boolean;
  result?: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'plan';
  content: string;
  chips?: string[];
  plan?: PlanStep[];
  planTitle?: string;
  planStatus?: 'awaiting' | 'running' | 'completed';
}

export default function Chat() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasProcessedInitialQuery = useRef(false);

  // Handle initial query from Hero
  useEffect(() => {
    if (state?.initialQuery && !hasProcessedInitialQuery.current) {
      hasProcessedInitialQuery.current = true;
      setChatInput(state.initialQuery);
      setTimeout(() => {
        handleSendMessage(state.initialQuery);
      }, 300);
    } else if (!state?.initialQuery) {
      inputRef.current?.focus();
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generatePlan = (query: string): { title: string; steps: PlanStep[] } => {
    if (query.toLowerCase().includes('logistics') || query.toLowerCase().includes('ai')) {
      return {
        title: 'AI in Logistics Market Scan',
        steps: [
          {
            id: '1',
            title: 'Identify key market segments',
            description: 'Analyze the logistics AI market by segments: last-mile delivery, warehouse automation, route optimization, and supply chain visibility.',
            status: 'pending',
          },
          {
            id: '2',
            title: 'Compile top players by funding',
            description: 'List companies with $50M+ in total funding, including recent funding rounds and valuations.',
            status: 'pending',
          },
          {
            id: '3',
            title: 'Map competitive landscape',
            description: 'Create a heatmap showing market positioning, technology focus, and geographic coverage.',
            status: 'pending',
          },
          {
            id: '4',
            title: 'Analyze investment trends',
            description: 'Review VC activity, M&A deals, and strategic partnerships in the past 24 months.',
            status: 'pending',
          },
          {
            id: '5',
            title: 'Generate summary report',
            description: 'Compile findings into an executive summary with key insights and recommendations.',
            status: 'pending',
          },
        ],
      };
    }

    if (query.toLowerCase().includes('monday.com')) {
      return {
        title: 'monday.com Deep Dive Analysis',
        steps: [
          {
            id: '1',
            title: 'Company overview & financials',
            description: 'Analyze revenue growth, margins, ARR, and key financial metrics from recent earnings.',
            status: 'pending',
          },
          {
            id: '2',
            title: 'Product & technology assessment',
            description: 'Review product roadmap, platform capabilities, and technical differentiators.',
            status: 'pending',
          },
          {
            id: '3',
            title: 'Competitive positioning',
            description: 'Map against Asana, Notion, ClickUp, and other work management platforms.',
            status: 'pending',
          },
          {
            id: '4',
            title: 'Customer & market analysis',
            description: 'Segment customer base by industry, size, and use case. Identify expansion opportunities.',
            status: 'pending',
          },
        ],
      };
    }

    return {
      title: 'Research Plan',
      steps: [
        {
          id: '1',
          title: 'Define research scope',
          description: `Clarify objectives and key questions for "${query}".`,
          status: 'pending',
        },
        {
          id: '2',
          title: 'Gather primary data',
          description: 'Search databases, news sources, and proprietary datasets for relevant information.',
          status: 'pending',
        },
        {
          id: '3',
          title: 'Analyze findings',
          description: 'Synthesize data into actionable insights and identify patterns.',
          status: 'pending',
        },
        {
          id: '4',
          title: 'Generate deliverables',
          description: 'Create summary report, charts, or other requested artifacts.',
          status: 'pending',
        },
      ],
    };
  };

  const handleSendMessage = (overrideInput?: string) => {
    const messageText = overrideInput || chatInput;
    if (!messageText.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);
    
    // Generate plan-based response
    setTimeout(() => {
      const { title, steps } = generatePlan(messageText);
      
      const planMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'plan',
        content: `I've created a plan for your request. Review the steps below and approve, edit, or skip any steps before I begin.`,
        planTitle: title,
        plan: steps,
        planStatus: 'awaiting',
      };
      
      setMessages(prev => [...prev, planMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const updatePlanStep = (messageId: string, stepId: string, updates: Partial<PlanStep>) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId && msg.plan) {
        return {
          ...msg,
          plan: msg.plan.map(step => 
            step.id === stepId ? { ...step, ...updates } : step
          ),
        };
      }
      return msg;
    }));
  };

  const approveStep = (messageId: string, stepId: string) => {
    updatePlanStep(messageId, stepId, { status: 'approved' });
  };

  const skipStep = (messageId: string, stepId: string) => {
    updatePlanStep(messageId, stepId, { status: 'skipped' });
  };

  const toggleEditStep = (messageId: string, stepId: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId && msg.plan) {
        return {
          ...msg,
          plan: msg.plan.map(step => 
            step.id === stepId ? { ...step, isEditing: !step.isEditing } : step
          ),
        };
      }
      return msg;
    }));
  };

  const updateStepDescription = (messageId: string, stepId: string, newDescription: string) => {
    updatePlanStep(messageId, stepId, { description: newDescription, isEditing: false });
  };

  const approveAllSteps = (messageId: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId && msg.plan) {
        return {
          ...msg,
          plan: msg.plan.map(step => 
            step.status === 'pending' ? { ...step, status: 'approved' } : step
          ),
        };
      }
      return msg;
    }));
  };

  const executePlan = async (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message?.plan) return;

    // Update plan status to running
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, planStatus: 'running' } : msg
    ));

    // Execute each approved step sequentially
    for (const step of message.plan) {
      if (step.status === 'skipped') continue;
      
      // Set step to running
      updatePlanStep(messageId, step.id, { status: 'running' });
      
      // Simulate step execution
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
      
      // Complete the step with a result
      updatePlanStep(messageId, step.id, { 
        status: 'completed',
        result: getStepResult(step.title),
      });
    }

    // Mark plan as completed
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, planStatus: 'completed' } : msg
    ));

    // Add completion message
    const completionMessage: ChatMessage = {
      id: (Date.now() + 2).toString(),
      type: 'assistant',
      content: `✅ **Plan completed successfully!**\n\nAll steps have been executed. Here's a summary of what was accomplished:\n\n• Analyzed market segments and key players\n• Compiled funding data and investment trends\n• Generated competitive landscape mapping\n• Created executive summary with insights\n\nWould you like me to export these findings or dive deeper into any specific area?`,
      chips: ['Export as PDF', 'Generate heatmap', 'Add to project'],
    };
    
    setMessages(prev => [...prev, completionMessage]);
  };

  const getStepResult = (stepTitle: string): string => {
    if (stepTitle.includes('market segments')) {
      return 'Identified 4 key segments: Last-mile ($4.2B), Warehouse ($3.8B), Route Optimization ($2.6B), Visibility ($1.8B)';
    }
    if (stepTitle.includes('players')) {
      return 'Found 12 companies with $50M+ funding. Top 3: Flexport ($2.2B), project44 ($420M), FourKites ($200M)';
    }
    if (stepTitle.includes('landscape')) {
      return 'Generated competitive heatmap with 18 companies across 6 dimensions';
    }
    if (stepTitle.includes('investment')) {
      return '$3.2B total disclosed funding in 18 months. 4 unicorns identified.';
    }
    if (stepTitle.includes('summary')) {
      return 'Executive summary ready with 5 key insights and 3 recommendations';
    }
    return 'Step completed successfully';
  };

  const canExecutePlan = (plan: PlanStep[]): boolean => {
    return plan.some(step => step.status === 'approved');
  };

  const handleChipClick = (chip: string) => {
    if (chip === 'Add to project') {
      navigate('/projects', { state: { fromChat: true, messages } });
    } else {
      setChatInput(chip);
      inputRef.current?.focus();
    }
  };

  const handleCreateProject = () => {
    navigate('/projects', { state: { fromChat: true, messages, createProject: true } });
  };

  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());

  const toggleStepExpand = (stepId: string) => {
    setExpandedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepId)) {
        next.delete(stepId);
      } else {
        next.add(stepId);
      }
      return next;
    });
  };

  return (
    <main className="chat-main">
      <div className="chat-container">
        {/* Empty State */}
        {messages.length === 0 && (
          <div className="chat-empty">
            <div className="chat-empty-icon">
              <AbleLogo size={64} color="#181818" />
            </div>
            <h2>Start a new research thread</h2>
            <p>Ask anything — run a deep dive, scan a market, or analyze a company.</p>
            <div className="quick-actions">
              <button onClick={() => setChatInput('Deep dive on ')}>
                <i className="fa-solid fa-magnifying-glass"></i>
                Deep dive
              </button>
              <button onClick={() => setChatInput('Market scan for ')}>
                <i className="fa-solid fa-radar"></i>
                Market scan
              </button>
              <button onClick={() => setChatInput('Competitor analysis for ')}>
                <i className="fa-solid fa-chart-line"></i>
                Competitor analysis
              </button>
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.length > 0 && (
          <div className="chat-messages-area">
            <div className="messages-list">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-msg ${msg.type}`}>
                  {(msg.type === 'assistant' || msg.type === 'plan') && (
                    <div className="msg-avatar">
                      <Sparkles size={16} />
                    </div>
                  )}
                  <div className="msg-content">
                    {msg.type === 'plan' ? (
                      <div className="plan-container">
                        <div className="plan-header">
                          <div className="plan-title-row">
                            <h3>{msg.planTitle}</h3>
                            {msg.planStatus === 'running' && (
                              <span className="plan-status running">
                                <Loader2 size={14} className="spin" />
                                Running...
                              </span>
                            )}
                            {msg.planStatus === 'completed' && (
                              <span className="plan-status completed">
                                <Check size={14} />
                                Completed
                              </span>
                            )}
                          </div>
                          <p className="plan-intro">{msg.content}</p>
                        </div>
                        
                        <div className="plan-steps">
                          {msg.plan?.map((step, index) => (
                            <div 
                              key={step.id} 
                              className={`plan-step ${step.status} ${expandedSteps.has(step.id) ? 'expanded' : ''}`}
                            >
                              <div className="step-header" onClick={() => toggleStepExpand(step.id)}>
                                <div className="step-number">
                                  {step.status === 'completed' ? (
                                    <Check size={14} />
                                  ) : step.status === 'running' ? (
                                    <Loader2 size={14} className="spin" />
                                  ) : step.status === 'skipped' ? (
                                    <X size={14} />
                                  ) : (
                                    index + 1
                                  )}
                                </div>
                                <div className="step-title-area">
                                  <span className="step-title">{step.title}</span>
                                  {step.status === 'approved' && (
                                    <span className="step-badge approved">Approved</span>
                                  )}
                                  {step.status === 'skipped' && (
                                    <span className="step-badge skipped">Skipped</span>
                                  )}
                                </div>
                                <button className="step-expand-btn">
                                  {expandedSteps.has(step.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                              </div>
                              
                              {expandedSteps.has(step.id) && (
                                <div className="step-body">
                                  {step.isEditing ? (
                                    <div className="step-edit">
                                      <textarea 
                                        defaultValue={step.description}
                                        onBlur={(e) => updateStepDescription(msg.id, step.id, e.target.value)}
                                        autoFocus
                                      />
                                      <button 
                                        className="step-edit-save"
                                        onClick={() => toggleEditStep(msg.id, step.id)}
                                      >
                                        Save
                                      </button>
                                    </div>
                                  ) : (
                                    <p className="step-description">{step.description}</p>
                                  )}
                                  
                                  {step.result && (
                                    <div className="step-result">
                                      <strong>Result:</strong> {step.result}
                                    </div>
                                  )}
                                  
                                  {msg.planStatus === 'awaiting' && step.status === 'pending' && (
                                    <div className="step-actions">
                                      <button 
                                        className="step-action approve"
                                        onClick={() => approveStep(msg.id, step.id)}
                                      >
                                        <Check size={14} />
                                        Approve
                                      </button>
                                      <button 
                                        className="step-action edit"
                                        onClick={() => toggleEditStep(msg.id, step.id)}
                                      >
                                        <Pencil size={14} />
                                        Edit
                                      </button>
                                      <button 
                                        className="step-action skip"
                                        onClick={() => skipStep(msg.id, step.id)}
                                      >
                                        <X size={14} />
                                        Skip
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        {msg.planStatus === 'awaiting' && msg.plan && (
                          <div className="plan-footer">
                            <button 
                              className="plan-action secondary"
                              onClick={() => approveAllSteps(msg.id)}
                            >
                              Approve all steps
                            </button>
                            <button 
                              className="plan-action primary"
                              onClick={() => executePlan(msg.id)}
                              disabled={!canExecutePlan(msg.plan)}
                            >
                              <Play size={14} />
                              Execute plan
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="msg-text" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
                        {msg.chips && (
                          <div className="msg-chips">
                            {msg.chips.map((chip, idx) => (
                              <button 
                                key={idx} 
                                className="action-chip"
                                onClick={() => handleChipClick(chip)}
                              >
                                {chip}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="chat-msg assistant">
                  <div className="msg-avatar">
                    <Sparkles size={16} />
                  </div>
                  <div className="msg-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Floating action to save to project */}
            {messages.length >= 2 && (
              <button className="save-to-project-fab" onClick={handleCreateProject}>
                <FolderPlus size={18} />
                Save to project
              </button>
            )}
          </div>
        )}

        {/* Input Area */}
        <div className="chat-input-container">
          <ChatInputField
            placeholder="Ask anything..."
            variant="compact"
            value={chatInput}
            onChange={setChatInput}
            onSubmit={handleSendMessage}
            className="chat-page-input"
          />
          <div className="chat-input-hint">
            <span>Press Enter to send · ⌘K for commands</span>
          </div>
        </div>
      </div>
    </main>
  );
}
