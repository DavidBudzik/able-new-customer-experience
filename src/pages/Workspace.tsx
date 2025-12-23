import { useState, useRef, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import ChatInputField from '../components/ChatInputField';
import './Workspace.css';

interface Project {
  id: string;
  name: string;
  lastUpdated: string;
  status?: 'active' | 'draft' | 'completed';
  subtitle?: string;
  playbooks: SavedPlaybook[];
  artifacts: Artifact[];
}

interface SavedPlaybook {
  id: string;
  name: string;
  icon: string;
  type: string;
}

interface Artifact {
  id: string;
  name: string;
  type: 'report' | 'heatmap' | 'list' | 'chart';
  icon: string;
  generatedBy: string;
  date: string;
}

interface LocationState {
  initialQuery?: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  chips?: string[];
  artifact?: {
    id: string;
    name: string;
    type: string;
  };
}

// Mock projects mapped to QuickTiles IDs
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Nordic Tech Roll-up',
    subtitle: '12 targets · Due diligence phase',
    lastUpdated: '2 hours ago',
    status: 'active',
    playbooks: [
      { id: 'market-scan', name: 'Market Scan', icon: 'fa-radar', type: 'Intelligence' },
      { id: 'deep-dive', name: 'Deep Dive', icon: 'fa-magnifying-glass', type: 'Diligence' },
      { id: 'vendor-risk', name: 'Vendor Risk', icon: 'fa-shield-halved', type: 'Risk' },
    ],
    artifacts: [
      { id: 'a1', name: 'Nordic Market Heatmap', type: 'heatmap', icon: 'fa-chart-simple', generatedBy: 'Market Scan', date: 'Dec 20' },
      { id: 'a2', name: 'Target Company List', type: 'list', icon: 'fa-list', generatedBy: 'Market Scan', date: 'Dec 20' },
      { id: 'a3', name: 'Klarna Deep Dive', type: 'report', icon: 'fa-file-lines', generatedBy: 'Deep Dive', date: 'Dec 19' },
    ],
  },
  {
    id: '2',
    name: 'Carve-out Assessment',
    subtitle: 'Operational readiness template',
    lastUpdated: '4 hours ago',
    status: 'active',
    playbooks: [
      { id: 'carve-out', name: 'Carve-Out Analysis', icon: 'fa-arrow-trend-up', type: 'Deal' },
    ],
    artifacts: [
      { id: 'a4', name: 'Operational Readiness Report', type: 'report', icon: 'fa-file-lines', generatedBy: 'Carve-Out', date: 'Dec 20' },
    ],
  },
  {
    id: '3',
    name: 'Logistics Sector Deep-dive',
    subtitle: 'Market analysis · 8 sources',
    lastUpdated: 'Yesterday',
    playbooks: [
      { id: 'domain-mapper', name: 'Domain Mapper', icon: 'fa-sitemap', type: 'Intelligence' },
      { id: 'market-scan', name: 'Market Scan', icon: 'fa-radar', type: 'Intelligence' },
    ],
    artifacts: [
      { id: 'a5', name: 'Logistics Landscape Map', type: 'heatmap', icon: 'fa-chart-simple', generatedBy: 'Domain Mapper', date: 'Dec 18' },
      { id: 'a6', name: 'Key Players Analysis', type: 'report', icon: 'fa-file-lines', generatedBy: 'Market Scan', date: 'Dec 18' },
    ],
  },
  {
    id: '4',
    name: 'EU Regulatory Impact',
    subtitle: 'Policy briefing draft',
    lastUpdated: 'Yesterday',
    status: 'draft',
    playbooks: [
      { id: 'policy-scan', name: 'Policy Scanner', icon: 'fa-gavel', type: 'Regulatory' },
    ],
    artifacts: [
      { id: 'a7', name: 'EU AI Act Summary', type: 'report', icon: 'fa-file-lines', generatedBy: 'Policy Scanner', date: 'Dec 17' },
    ],
  },
  {
    id: '5',
    name: 'FinTech Consolidation',
    subtitle: '6 targets · Screening',
    lastUpdated: '2 days ago',
    playbooks: [
      { id: 'market-scan', name: 'Market Scan', icon: 'fa-radar', type: 'Intelligence' },
      { id: 'vendor-risk', name: 'Vendor Risk', icon: 'fa-shield-halved', type: 'Risk' },
    ],
    artifacts: [
      { id: 'a8', name: 'FinTech Landscape', type: 'heatmap', icon: 'fa-chart-simple', generatedBy: 'Market Scan', date: 'Dec 15' },
    ],
  },
  {
    id: 'eu-genai',
    name: 'EU GenAI Supply Chain',
    lastUpdated: '2 hours ago',
    playbooks: [
      { id: 'market-scan', name: 'Market Scan', icon: 'fa-radar', type: 'Intelligence' },
      { id: 'deep-dive', name: 'Deep Dive', icon: 'fa-magnifying-glass', type: 'Diligence' },
    ],
    artifacts: [
      { id: 'a1', name: 'GenAI Landscape Heatmap', type: 'heatmap', icon: 'fa-chart-simple', generatedBy: 'Market Scan', date: 'Dec 20' },
      { id: 'a2', name: 'Series A-C Company List', type: 'list', icon: 'fa-list', generatedBy: 'Market Scan', date: 'Dec 20' },
      { id: 'a3', name: 'Anthropic Deep Dive', type: 'report', icon: 'fa-file-lines', generatedBy: 'Deep Dive', date: 'Dec 19' },
    ],
  },
];

export default function Workspace() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const state = location.state as LocationState | null;
  
  // Get project ID from URL params
  const sourceType = searchParams.get('source');
  const projectId = searchParams.get('id');
  
  // Find initial project based on URL params or default to first
  const getInitialProject = () => {
    if (projectId) {
      const found = mockProjects.find(p => p.id === projectId);
      if (found) return found;
    }
    return mockProjects[0];
  };
  
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<Project>(getInitialProject());
  const [chatInput, setChatInput] = useState('');
  const [showNewProject, setShowNewProject] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [contextMenuProjectId, setContextMenuProjectId] = useState<string | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const getWelcomeMessage = (project: Project): ChatMessage => ({
    id: '1',
    type: 'assistant',
    content: `Welcome back to **${project.name}**! ${project.subtitle ? `\n\n*${project.subtitle}*\n\n` : '\n\n'}I can help you run playbooks, analyze your ${project.artifacts.length} existing artifacts, or answer questions about your research.`,
    chips: ['Run a playbook', 'Show latest artifact', 'Summarize progress'],
  });
  
  const [messages, setMessages] = useState<ChatMessage[]>([getWelcomeMessage(getInitialProject())]);
  
  // Update selected project when URL params change
  useEffect(() => {
    if (projectId) {
      const found = mockProjects.find(p => p.id === projectId);
      if (found && found.id !== selectedProject.id) {
        setSelectedProject(found);
        setMessages([getWelcomeMessage(found)]);
        setActiveArtifact(null);
      }
    }
  }, [projectId]);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when editing starts
  useEffect(() => {
    if (editingProjectId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingProjectId]);

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenuProjectId(null);
    };
    if (contextMenuProjectId) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [contextMenuProjectId]);

  const handleContextMenu = (e: React.MouseEvent, projectId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setContextMenuProjectId(projectId);
  };

  const startEditing = (project: Project) => {
    setEditingProjectId(project.id);
    setEditingName(project.name);
    setContextMenuProjectId(null);
  };

  const saveEdit = () => {
    if (editingProjectId && editingName.trim()) {
      setProjects(projects.map(p => 
        p.id === editingProjectId ? { ...p, name: editingName.trim() } : p
      ));
      if (selectedProject.id === editingProjectId) {
        setSelectedProject({ ...selectedProject, name: editingName.trim() });
      }
    }
    setEditingProjectId(null);
    setEditingName('');
  };

  const cancelEdit = () => {
    setEditingProjectId(null);
    setEditingName('');
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const deleteProject = (projectId: string) => {
    const newProjects = projects.filter(p => p.id !== projectId);
    setProjects(newProjects);
    if (selectedProject.id === projectId && newProjects.length > 0) {
      setSelectedProject(newProjects[0]);
    }
    setContextMenuProjectId(null);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: chatInput,
    };
    
    // Simulate different response types based on input
    let assistantMessage: ChatMessage;
    const input = chatInput.toLowerCase();
    
    if (input.includes('show') && input.includes('artifact')) {
      const latestArtifact = selectedProject.artifacts[0];
      assistantMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Here's your latest artifact from **${latestArtifact.generatedBy}**:`,
        artifact: {
          id: latestArtifact.id,
          name: latestArtifact.name,
          type: latestArtifact.type,
        },
        chips: ['Analyze this', 'Export as PDF', 'Share with team'],
      };
      setActiveArtifact(latestArtifact);
    } else if (input.includes('run') || input.includes('playbook')) {
      assistantMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I'll run the **Market Scan** playbook on your current project.\n\n**Estimated time:** 8-10 minutes\n**Output:** Heatmap + Company List\n\nWould you like me to proceed?`,
        chips: ['Start now', 'Configure first', 'Run different playbook'],
      };
    } else if (input.includes('summarize') || input.includes('progress')) {
      assistantMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `## ${selectedProject.name} Summary\n\n**Status:** ${selectedProject.status || 'In Progress'}\n**Artifacts Generated:** ${selectedProject.artifacts.length}\n**Playbooks Available:** ${selectedProject.playbooks.length}\n\n### Recent Activity\n${selectedProject.artifacts.slice(0, 3).map(a => `• **${a.name}** - ${a.date}`).join('\n')}\n\n### Recommended Next Steps\n1. Review the latest ${selectedProject.artifacts[0]?.type || 'report'}\n2. Run Deep Dive on top targets\n3. Schedule stakeholder review`,
        chips: ['Show artifacts', 'Run next playbook', 'Export summary'],
      };
    } else {
      assistantMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I'm analyzing your request about "${chatInput}".\n\nBased on the data in **${selectedProject.name}**, here are some insights:\n\n• Found ${selectedProject.artifacts.length} relevant artifacts\n• ${selectedProject.playbooks[0]?.name || 'Market Scan'} playbook can provide deeper analysis\n• Consider running a Deep Dive for detailed profiles`,
        chips: ['Run Deep Dive', 'Show artifacts', 'Export analysis'],
      };
    }
    
    setMessages([...messages, userMessage, assistantMessage]);
    setChatInput('');
  };

  const handleChipClick = (chip: string) => {
    setChatInput(chip);
    // Optionally auto-send
    // setTimeout(() => handleSendMessage(), 100);
  };
  
  const handleArtifactClick = (artifact: Artifact) => {
    setActiveArtifact(artifact);
  };

  const getArtifactTypeColor = (type: string) => {
    switch (type) {
      case 'report': return '#2563eb';
      case 'heatmap': return '#7c3aed';
      case 'list': return '#059669';
      case 'chart': return '#d97706';
      default: return '#6b7280';
    }
  };

  return (
    <main className="projects-main">
      {/* Sidebar */}
      <aside className={`projects-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-title">Projects</h1>
          <div className="sidebar-header-actions">
            <button className="new-project-btn" onClick={() => setShowNewProject(true)}>
              <i className="fa-solid fa-plus"></i>
            </button>
            <button 
              className="collapse-btn" 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <i className={`fa-solid ${sidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
            </button>
          </div>
        </div>

        <div className="projects-list">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`project-item ${selectedProject.id === project.id ? 'active' : ''}`}
              onClick={() => editingProjectId !== project.id && setSelectedProject(project)}
              onContextMenu={(e) => handleContextMenu(e, project.id)}
            >
              <div className="project-icon">
                <i className="fa-solid fa-folder"></i>
              </div>
              <div className="project-info">
                {editingProjectId === project.id ? (
                  <input
                    ref={editInputRef}
                    type="text"
                    className="project-name-input"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onBlur={saveEdit}
                    onKeyDown={handleEditKeyDown}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <>
                    <span className="project-name">{project.name}</span>
                    <span className="project-meta">{project.lastUpdated}</span>
                  </>
                )}
              </div>
              <button 
                className="project-menu-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleContextMenu(e, project.id);
                }}
              >
                <i className="fa-solid fa-ellipsis"></i>
              </button>
            </div>
          ))}
        </div>

        {/* Context Menu */}
        {contextMenuProjectId && (
          <div 
            className="project-context-menu"
            style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="context-menu-item"
              onClick={() => {
                const project = projects.find(p => p.id === contextMenuProjectId);
                if (project) startEditing(project);
              }}
            >
              <i className="fa-solid fa-pen"></i>
              Rename
            </button>
            <button 
              className="context-menu-item delete"
              onClick={() => deleteProject(contextMenuProjectId)}
            >
              <i className="fa-solid fa-trash"></i>
              Delete
            </button>
          </div>
        )}

        <div className="sidebar-footer">
          <button className="sidebar-action">
            <i className="fa-solid fa-gear"></i>
            Settings
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="project-content">
        {/* Project Header */}
        <header className="project-header">
          <div className="project-header-left">
            <div className="project-header-icon">
              <i className="fa-solid fa-folder"></i>
            </div>
            <div>
              <h2 className="project-title">{selectedProject.name}</h2>
              <span className="project-updated">Last updated {selectedProject.lastUpdated}</span>
            </div>
          </div>
          <div className="project-header-actions">
            <button className="header-btn">
              <i className="fa-solid fa-share-nodes"></i>
              Share
            </button>
            <button className="header-btn">
              <i className="fa-solid fa-ellipsis"></i>
            </button>
          </div>
        </header>

        <div className="project-body">
          {/* Left Panel - Chat */}
          <div className="chat-section">
            <div className="chat-messages">
              <div className="messages-container">
                {messages.map((msg) => (
                  <div key={msg.id} className={`chat-message ${msg.type}`}>
                    {msg.type === 'assistant' && (
                      <div className="message-avatar">
                        <i className="fa-solid fa-sparkles"></i>
                      </div>
                    )}
                    <div className="message-bubble">
                      <div className="message-content" dangerouslySetInnerHTML={{ 
                        __html: msg.content
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em>$1</em>')
                          .replace(/## (.*?)(?:\n|$)/g, '<h4>$1</h4>')
                          .replace(/### (.*?)(?:\n|$)/g, '<h5>$1</h5>')
                          .replace(/• /g, '<span class="bullet">•</span> ')
                          .replace(/\n/g, '<br/>')
                      }} />
                      {msg.artifact && (
                        <div 
                          className="message-artifact-card"
                          onClick={() => {
                            const artifact = selectedProject.artifacts.find(a => a.id === msg.artifact?.id);
                            if (artifact) setActiveArtifact(artifact);
                          }}
                        >
                          <div className="artifact-card-icon">
                            <i className="fa-solid fa-file-lines"></i>
                          </div>
                          <div className="artifact-card-info">
                            <span className="artifact-card-name">{msg.artifact.name}</span>
                            <span className="artifact-card-type">{msg.artifact.type}</span>
                          </div>
                          <i className="fa-solid fa-arrow-right"></i>
                        </div>
                      )}
                      {msg.chips && (
                        <div className="message-chips">
                          {msg.chips.map((chip, idx) => (
                            <button 
                              key={idx} 
                              className="chip-btn"
                              onClick={() => handleChipClick(chip)}
                            >
                              {chip}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="chat-input-area">
              <ChatInputField
                placeholder="Ask about your research..."
                variant="compact"
                value={chatInput}
                onChange={setChatInput}
                onSubmit={handleSendMessage}
                className="workspace-chat-input"
              />
              <div className="chat-input-hints">
                <span>Try: "Run Market Scan" or "Summarize progress"</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Artifact Viewer or Resources */}
          {activeArtifact ? (
            <div className="artifact-viewer">
              <div className="artifact-viewer-header">
                <div className="artifact-viewer-title">
                  <div 
                    className="artifact-type-badge"
                    style={{ backgroundColor: `${getArtifactTypeColor(activeArtifact.type)}15`, color: getArtifactTypeColor(activeArtifact.type) }}
                  >
                    <i className={`fa-solid ${activeArtifact.icon}`}></i>
                    {activeArtifact.type}
                  </div>
                  <h3>{activeArtifact.name}</h3>
                  <span className="artifact-viewer-meta">
                    Generated by {activeArtifact.generatedBy} · {activeArtifact.date}
                  </span>
                </div>
                <div className="artifact-viewer-actions">
                  <button className="viewer-action-btn">
                    <i className="fa-solid fa-download"></i>
                  </button>
                  <button className="viewer-action-btn">
                    <i className="fa-solid fa-share-nodes"></i>
                  </button>
                  <button className="viewer-close-btn" onClick={() => setActiveArtifact(null)}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
              <div className="artifact-viewer-content">
                {activeArtifact.type === 'heatmap' && (
                  <div className="artifact-heatmap-preview">
                    <div className="heatmap-placeholder">
                      <div className="heatmap-grid">
                        {[...Array(20)].map((_, i) => (
                          <div 
                            key={i} 
                            className="heatmap-cell"
                            style={{ 
                              opacity: 0.3 + Math.random() * 0.7,
                              backgroundColor: ['#2563eb', '#7c3aed', '#059669', '#d97706'][Math.floor(Math.random() * 4)]
                            }}
                          />
                        ))}
                      </div>
                      <div className="heatmap-labels">
                        <span>Market Opportunity</span>
                        <span>Competitive Intensity</span>
                      </div>
                    </div>
                  </div>
                )}
                {activeArtifact.type === 'report' && (
                  <div className="artifact-report-preview">
                    <div className="report-section">
                      <h4>Executive Summary</h4>
                      <p>This analysis covers the key findings from the {activeArtifact.generatedBy} playbook run on {activeArtifact.date}.</p>
                    </div>
                    <div className="report-section">
                      <h4>Key Findings</h4>
                      <ul>
                        <li>Market size estimated at $4.2B with 18% CAGR</li>
                        <li>3 tier-1 players dominate 60% market share</li>
                        <li>Emerging segment shows 2.5x growth potential</li>
                        <li>Regulatory tailwinds expected in Q2 2025</li>
                      </ul>
                    </div>
                    <div className="report-section">
                      <h4>Recommendations</h4>
                      <p>Based on our analysis, we recommend focusing on the mid-market segment where competition is less intense and growth rates are highest.</p>
                    </div>
                  </div>
                )}
                {activeArtifact.type === 'list' && (
                  <div className="artifact-list-preview">
                    <table className="artifact-table">
                      <thead>
                        <tr>
                          <th>Company</th>
                          <th>Stage</th>
                          <th>Score</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td>Klarna</td><td>Growth</td><td>92</td><td className="status-high">High Priority</td></tr>
                        <tr><td>Spotify</td><td>Public</td><td>88</td><td className="status-med">Medium</td></tr>
                        <tr><td>iZettle</td><td>Acquired</td><td>85</td><td className="status-low">Archive</td></tr>
                        <tr><td>Northvolt</td><td>Growth</td><td>91</td><td className="status-high">High Priority</td></tr>
                        <tr><td>Einride</td><td>Series C</td><td>78</td><td className="status-med">Medium</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="resources-panel">
              {/* Playbooks Section */}
              <section className="resources-section">
                <div className="section-header">
                  <h3>
                    <i className="fa-solid fa-book"></i>
                    Playbooks
                  </h3>
                  <button className="add-btn">
                    <i className="fa-solid fa-plus"></i>
                    Add
                  </button>
                </div>
                <div className="playbooks-list">
                  {selectedProject.playbooks.map((playbook) => (
                    <div key={playbook.id} className="playbook-item">
                      <div className="playbook-icon">
                        <i className={`fa-solid ${playbook.icon}`}></i>
                      </div>
                      <div className="playbook-info">
                        <span className="playbook-name">{playbook.name}</span>
                        <span className="playbook-type">{playbook.type}</span>
                      </div>
                      <button className="run-playbook-btn">
                        <i className="fa-solid fa-play"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Artifacts Section */}
              <section className="resources-section">
                <div className="section-header">
                  <h3>
                    <i className="fa-solid fa-cube"></i>
                    Artifacts
                  </h3>
                  <span className="artifact-count">{selectedProject.artifacts.length}</span>
                </div>
                <div className="artifacts-list">
                  {selectedProject.artifacts.map((artifact) => (
                    <div 
                      key={artifact.id} 
                      className="artifact-item"
                      onClick={() => handleArtifactClick(artifact)}
                    >
                      <div 
                        className="artifact-icon" 
                        style={{ backgroundColor: `${getArtifactTypeColor(artifact.type)}15`, color: getArtifactTypeColor(artifact.type) }}
                      >
                        <i className={`fa-solid ${artifact.icon}`}></i>
                      </div>
                      <div className="artifact-info">
                        <span className="artifact-name">{artifact.name}</span>
                        <span className="artifact-meta">
                          {artifact.generatedBy} · {artifact.date}
                        </span>
                      </div>
                      <button className="artifact-action">
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <div className="modal-overlay" onClick={() => setShowNewProject(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create new project</h2>
              <button className="modal-close" onClick={() => setShowNewProject(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Project name</label>
                <input type="text" placeholder="e.g., Series B Due Diligence" />
              </div>
              <div className="form-group">
                <label>Description (optional)</label>
                <textarea placeholder="What is this project about?" rows={3}></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowNewProject(false)}>Cancel</button>
              <button className="btn-primary">Create project</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
