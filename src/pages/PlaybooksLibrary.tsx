import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlaybooksLibrary.css';

interface CustomPlaybook {
  id: string;
  name: string;
  basedOn: string;
  scope: string;
  focus: string;
  output: string;
}

interface Playbook {
  id: string;
  icon: string;
  title: string;
  description: string;
  duration: string;
  outputType: string;
  outputIcon: string;
  category: string;
}

const categoryTabs = [
  { id: 'all', label: 'All Playbooks', icon: 'fa-layer-group' },
  { id: 'market', label: 'Market Intel', icon: 'fa-chart-line' },
  { id: 'deal', label: 'Deal Sourcing', icon: 'fa-handshake' },
  { id: 'diligence', label: 'Diligence & Risk', icon: 'fa-shield-halved' },
];

const standardPlaybooks: Playbook[] = [
  {
    id: 'domain-mapper',
    icon: 'fa-building-columns',
    title: 'Domain Mapper',
    description: 'Map relevant players in a domain, extract offerings, and cluster them by type and maturity.',
    duration: '~10 MIN',
    outputType: 'HEATMAP',
    outputIcon: 'fa-chart-simple',
    category: 'market',
  },
  {
    id: 'deep-dive',
    icon: 'fa-magnifying-glass',
    title: 'Deep Dive',
    description: '360° due diligence on a target company. Product, tech, traction, and risk analysis.',
    duration: '~8 MIN',
    outputType: 'PDF REPORT',
    outputIcon: 'fa-file-pdf',
    category: 'diligence',
  },
  {
    id: 'carve-out',
    icon: 'fa-arrow-trend-up',
    title: 'Carve-Out Likelihood',
    description: 'Predict divestiture opportunities using financial distress signals and strategic shifts.',
    duration: '~15 MIN',
    outputType: 'SCORED LIST',
    outputIcon: 'fa-list-ol',
    category: 'deal',
  },
  {
    id: 'buyer-mapping',
    icon: 'fa-dollar-sign',
    title: 'Buyer Mapping',
    description: 'Identify high-fit potential buyers for target companies based on strategic adjacency.',
    duration: '~10 MIN',
    outputType: 'TARGET LIST',
    outputIcon: 'fa-list-check',
    category: 'deal',
  },
  {
    id: 'vendor-risk',
    icon: 'fa-triangle-exclamation',
    title: 'Vendor Risk',
    description: 'TPRM workflow focusing on privacy compliance, security posture, and financial stability.',
    duration: '~12 MIN',
    outputType: 'RISK CARD',
    outputIcon: 'fa-id-card',
    category: 'diligence',
  },
  {
    id: 'pe-exit',
    icon: 'fa-file-lines',
    title: 'PE Exit Analysis',
    description: 'Predictive sell-side intelligence. Identify portfolio companies likely to transact.',
    duration: '~8 MIN',
    outputType: 'EXIT BRIEF',
    outputIcon: 'fa-file-export',
    category: 'deal',
  },
];

interface PlaybooksLibraryProps {
  onRemix?: (playbook: Playbook) => void;
  customPlaybooks?: CustomPlaybook[];
}

export default function PlaybooksLibrary({ onRemix, customPlaybooks = [] }: PlaybooksLibraryProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlaybooks = standardPlaybooks.filter((playbook) => {
    const matchesTab = activeTab === 'all' || playbook.category === activeTab;
    const matchesSearch = playbook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playbook.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleRun = (playbookId: string) => {
    navigate(`/workflow/${playbookId}`);
  };

  const handleRemix = (playbook: Playbook) => {
    if (onRemix) {
      onRemix(playbook);
    }
  };

  // Default custom playbook for display
  const displayCustomPlaybooks = customPlaybooks.length > 0 ? customPlaybooks : [
    {
      id: 'eu-genai-supply-chain',
      name: 'EU GenAI Supply Chain',
      basedOn: 'MARKET SCAN',
      scope: 'GenAI · UK & Europe · Series A-C',
      focus: '4 offering areas',
      output: 'Heatmap + Company List',
    },
  ];

  return (
    <main className="library-main">
      <div className="library-container">
        {/* Sticky header section */}
        <div className="library-sticky-header">
          {/* Header with title and search */}
          <header className="library-header">
            <div className="library-title-area">
              <h1>Playbooks</h1>
              <p className="library-subtitle">Explore standard workflows and create custom playbooks</p>
            </div>
            <div className="library-search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search playbooks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </header>

          {/* Tab navigation */}
          <nav className="library-tabs">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                className={`library-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {'icon' in tab && tab.icon && <i className={`fa-solid ${tab.icon}`}></i>}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* My Custom Playbooks section */}
        <section className="library-section">
          <div className="section-header">
            <h2>My Custom Playbooks</h2>
            <span className="saved-badge">SAVED</span>
          </div>

          <div className="custom-playbook-card">
            <div className="custom-card-header">
              <div className="custom-icon">
                <i className="fa-solid fa-globe"></i>
              </div>
              <span className="custom-badge">CUSTOM</span>
            </div>

            <h3 className="custom-title">{displayCustomPlaybooks[0].name}</h3>
            <p className="custom-based-on">BASED ON: {displayCustomPlaybooks[0].basedOn}</p>

            <div className="custom-details">
              <p><span>Scope:</span> {displayCustomPlaybooks[0].scope}</p>
              <p><span>Focus:</span> {displayCustomPlaybooks[0].focus}</p>
              <p><span>Output:</span> {displayCustomPlaybooks[0].output}</p>
            </div>

            <div className="custom-actions">
              <button className="btn-edit">Edit</button>
              <button className="btn-run" onClick={() => handleRun(displayCustomPlaybooks[0].id)}>
                Run <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </section>

        {/* Standard Playbooks section */}
        {filteredPlaybooks.length > 0 && (
          <section className="library-section">
            <div className="section-header">
              <h2>
                <i className="fa-solid fa-wand-magic-sparkles section-icon"></i>
                Standard Playbooks
              </h2>
              <span className="playbook-count">{filteredPlaybooks.length} workflows</span>
            </div>

            <div className="playbooks-grid">
              {filteredPlaybooks.map((playbook) => (
                <div key={playbook.id} className="playbook-card">
                  <div className="playbook-card-header">
                    <div className="playbook-meta">
                      <span className="workflow-label">INTELLIGENCE WORKFLOW</span>
                      <button className="menu-btn">
                        <i className="fa-solid fa-ellipsis"></i>
                      </button>
                    </div>
                  </div>

                  <h3 className="playbook-title">{playbook.title}</h3>
                  <p className="playbook-description">{playbook.description}</p>

                  <div className="playbook-footer">
                    <div className="playbook-info">
                      <span className="info-item">
                        <i className="fa-regular fa-clock"></i>
                        {playbook.duration}
                      </span>
                      <span className="info-item">
                        <i className={`fa-solid ${playbook.outputIcon}`}></i>
                        {playbook.outputType}
                      </span>
                    </div>
                    <div className="playbook-actions">
                      <button className="action-remix" onClick={() => handleRemix(playbook)}>
                        <i className="fa-solid fa-rotate"></i>
                        Remix
                      </button>
                      <button className="action-run" onClick={() => handleRun(playbook.id)}>
                        Run <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

