import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Clock, FileText, Play, ChevronRight, Sparkles, BookOpen, Star } from 'lucide-react';
import './PlaybooksSection.css';

interface Playbook {
  id: string;
  title: string;
  desc: string;
  badge: string;
  badgeType?: 'certified' | 'custom' | 'new';
  duration: string;
  output: string;
  outputIcon: string;
  category: 'yours' | 'library';
  sampleSteps?: string[];
  sampleOutput?: {
    title: string;
    preview: string;
  };
}

type TabType = 'yours' | 'library';

export default function PlaybooksSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('yours');
  const [previewPlaybook, setPreviewPlaybook] = useState<Playbook | null>(null);

  const playbooks: Playbook[] = [
    // Your Playbooks (personalized/assigned)
    {
      id: 'market-scan',
      title: 'Market Entry Engine',
      desc: 'Map an ecosystem, identify gaps, and size opportunities in one structured output.',
      badge: 'CERTIFIED',
      badgeType: 'certified',
      duration: '10 min',
      output: 'Heatmap + List',
      outputIcon: 'fa-chart-simple',
      category: 'yours',
      sampleSteps: [
        'Define target market and geography',
        'Identify key players and market segments',
        'Analyze competitive landscape',
        'Size total addressable market (TAM)',
        'Generate heatmap and company list'
      ],
      sampleOutput: {
        title: 'Nordic SaaS Market Heatmap',
        preview: 'Interactive visualization showing market opportunity scores across 12 segments with 45 identified companies ranked by fit.'
      }
    },
    {
      id: 'deep-dive',
      title: 'Intelligence Hub',
      desc: 'IC-ready snapshot across positioning, traction, risk flags, and comparables.',
      badge: 'CERTIFIED',
      badgeType: 'certified',
      duration: '8 min',
      output: 'Report',
      outputIcon: 'fa-file-lines',
      category: 'yours',
      sampleSteps: [
        'Company overview and positioning',
        'Financial metrics and traction analysis',
        'Competitive benchmarking',
        'Risk flag assessment',
        'Investment committee summary'
      ],
      sampleOutput: {
        title: 'Klarna Deep Dive Report',
        preview: '12-page comprehensive analysis covering business model, unit economics, competitive moat, and key risks with IC recommendation.'
      }
    },
    {
      id: 'nordic-rollup',
      title: 'Nordic Roll-up Scanner',
      desc: 'Custom playbook for Nordic tech consolidation opportunities and synergy mapping.',
      badge: 'CUSTOM',
      badgeType: 'custom',
      duration: '15 min',
      output: 'Deal Sheet',
      outputIcon: 'fa-table-columns',
      category: 'yours',
      sampleSteps: [
        'Scan Nordic tech landscape',
        'Filter by consolidation fit criteria',
        'Map synergy potential',
        'Score integration complexity',
        'Generate deal sheet with recommendations'
      ],
      sampleOutput: {
        title: 'Nordic Tech Roll-up Targets',
        preview: 'Ranked list of 23 potential acquisition targets with synergy scores, integration risk ratings, and preliminary valuations.'
      }
    },
    {
      id: 'pe-exit-tracker',
      title: 'PE Exit Radar',
      desc: 'Track PE portfolio companies approaching exit windows with deal probability scores.',
      badge: 'CUSTOM',
      badgeType: 'custom',
      duration: '12 min',
      output: 'Watchlist',
      outputIcon: 'fa-eye',
      category: 'yours',
      sampleSteps: [
        'Identify PE portfolios in scope',
        'Calculate holding period status',
        'Assess exit readiness signals',
        'Score deal probability',
        'Generate prioritized watchlist'
      ],
      sampleOutput: {
        title: 'Q1 2024 Exit Watchlist',
        preview: '47 companies flagged with exit probability scores, estimated timing windows, and likely transaction types.'
      }
    },
    // Library Playbooks (standard templates)
    {
      id: 'vendor-risk',
      title: 'Signal Detector',
      desc: 'Automated compliance, stability, cyber posture, and reputational screening.',
      badge: 'CERTIFIED',
      badgeType: 'certified',
      duration: '15 min',
      output: 'Risk Matrix',
      outputIcon: 'fa-chart-simple',
      category: 'library',
      sampleSteps: [
        'Financial stability assessment',
        'Compliance and regulatory check',
        'Cybersecurity posture scan',
        'Reputational risk analysis',
        'Generate risk scorecard'
      ],
      sampleOutput: {
        title: 'Vendor Risk Assessment',
        preview: 'Risk matrix with scores across 5 dimensions, flagged issues, and remediation recommendations for procurement review.'
      }
    },
    {
      id: 'scenario',
      title: 'Strategic Planner',
      desc: 'Test market shifts and competitor moves with explicit assumptions & outputs.',
      badge: 'CERTIFIED',
      badgeType: 'certified',
      duration: '12 min',
      output: 'Scorecard',
      outputIcon: 'fa-chart-simple',
      category: 'library',
      sampleSteps: [
        'Define scenario parameters',
        'Model competitor responses',
        'Assess market impact',
        'Calculate outcome probabilities',
        'Generate strategic scorecard'
      ],
      sampleOutput: {
        title: 'Market Entry Scenario Analysis',
        preview: 'Scenario comparison across 3 strategic options with probability-weighted outcomes and recommended action plan.'
      }
    },
    {
      id: 'competitive-intel',
      title: 'Competitive Landscape',
      desc: 'Real-time competitor tracking with positioning maps and strategic moves timeline.',
      badge: 'NEW',
      badgeType: 'new',
      duration: '10 min',
      output: 'Dashboard',
      outputIcon: 'fa-grip',
      category: 'library',
      sampleSteps: [
        'Define competitive set',
        'Gather positioning data',
        'Map feature/price matrix',
        'Track recent strategic moves',
        'Generate competitive dashboard'
      ],
      sampleOutput: {
        title: 'Fintech Competitive Map',
        preview: 'Interactive positioning map with 15 competitors, feature comparison matrix, and 90-day strategic moves timeline.'
      }
    },
    {
      id: 'market-sizing',
      title: 'TAM/SAM/SOM Calculator',
      desc: 'Bottom-up and top-down market sizing with methodology documentation.',
      badge: 'CERTIFIED',
      badgeType: 'certified',
      duration: '20 min',
      output: 'Model + Report',
      outputIcon: 'fa-calculator',
      category: 'library',
      sampleSteps: [
        'Define market boundaries',
        'Gather industry data sources',
        'Run top-down estimation',
        'Run bottom-up validation',
        'Reconcile and document methodology'
      ],
      sampleOutput: {
        title: 'European B2B SaaS Market Size',
        preview: 'Market sizing model with TAM ($42B), SAM ($8.5B), SOM ($1.2B) and full methodology documentation for IC presentation.'
      }
    },
    {
      id: 'esg-screening',
      title: 'ESG Quick Screen',
      desc: 'Rapid ESG assessment covering environmental, social, and governance factors.',
      badge: 'CERTIFIED',
      badgeType: 'certified',
      duration: '8 min',
      output: 'ESG Card',
      outputIcon: 'fa-leaf',
      category: 'library',
      sampleSteps: [
        'Environmental impact assessment',
        'Social responsibility check',
        'Governance structure review',
        'Flag material risks',
        'Generate ESG scorecard'
      ],
      sampleOutput: {
        title: 'Company ESG Assessment',
        preview: 'One-page ESG scorecard with ratings across 12 factors, material risk flags, and peer comparison benchmarks.'
      }
    },
    {
      id: 'regulatory-tracker',
      title: 'Regulatory Monitor',
      desc: 'Track regulatory changes and assess compliance impact across jurisdictions.',
      badge: 'NEW',
      badgeType: 'new',
      duration: '15 min',
      output: 'Briefing',
      outputIcon: 'fa-scale-balanced',
      category: 'library',
      sampleSteps: [
        'Define regulatory scope',
        'Scan recent regulatory changes',
        'Assess compliance impact',
        'Map timeline requirements',
        'Generate compliance briefing'
      ],
      sampleOutput: {
        title: 'EU AI Act Compliance Brief',
        preview: 'Regulatory briefing covering key requirements, compliance timeline, risk areas, and recommended action items.'
      }
    },
  ];

  const filteredPlaybooks = playbooks.filter(p => p.category === activeTab);
  const yourCount = playbooks.filter(p => p.category === 'yours').length;
  const libraryCount = playbooks.filter(p => p.category === 'library').length;

  const handlePreview = (e: React.MouseEvent, playbook: Playbook) => {
    e.stopPropagation();
    setPreviewPlaybook(playbook);
  };

  const closePreview = () => {
    setPreviewPlaybook(null);
  };

  const getBadgeClass = (badgeType?: string) => {
    switch (badgeType) {
      case 'custom': return 'playbook-badge-v2 badge-custom';
      case 'new': return 'playbook-badge-v2 badge-new';
      default: return 'playbook-badge-v2';
    }
  };

  return (
    <>
      <div className="playbooks-container">
        <div className="section-head">
          <h2>Playbooks</h2>
          <a className="link" href="#" onClick={(e) => { e.preventDefault(); navigate('/library/playbooks'); }}>
            Browse all
          </a>
        </div>

        {/* Tabs */}
        <div className="playbook-tabs">
          <button 
            className={`playbook-tab ${activeTab === 'yours' ? 'active' : ''}`}
            onClick={() => setActiveTab('yours')}
          >
            <Star size={14} />
            Your Playbooks
            <span className="tab-count">{yourCount}</span>
          </button>
          <button 
            className={`playbook-tab ${activeTab === 'library' ? 'active' : ''}`}
            onClick={() => setActiveTab('library')}
          >
            <BookOpen size={14} />
            Library
            <span className="tab-count">{libraryCount}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="playbook-list">
          {filteredPlaybooks.map((playbook) => (
            <div
              key={playbook.id}
              className="playbook-card-v2"
            >
              <div className="playbook-card-header-v2">
                <h3 className="playbook-title-v2">{playbook.title}</h3>
                <span className={getBadgeClass(playbook.badgeType)}>{playbook.badge}</span>
              </div>
              
              <p className="playbook-desc-v2">{playbook.desc}</p>
              
              <div className="playbook-footer-v2">
                <div className="playbook-meta-v2">
                  <span className="meta-item">
                    <i className="fa-regular fa-clock"></i>
                    {playbook.duration}
                  </span>
                  <span className="meta-item">
                    <i className={`fa-solid ${playbook.outputIcon}`}></i>
                    {playbook.output}
                  </span>
                </div>
                <div className="playbook-actions-v2">
                  <button className="action-sample" onClick={(e) => handlePreview(e, playbook)}>
                    SAMPLE
                  </button>
                  <button className="action-play-v2" onClick={(e) => { e.stopPropagation(); navigate(`/workflow/${playbook.id}`); }}>
                    <i className="fa-solid fa-play"></i>
                    Play
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Playbook Preview Modal */}
      {previewPlaybook && (
        <div className="playbook-modal-overlay" onClick={closePreview}>
          <div className="playbook-modal" onClick={(e) => e.stopPropagation()}>
            <div className="playbook-modal-header">
              <div className="playbook-modal-title">
                <span className={`playbook-modal-badge ${previewPlaybook.badgeType === 'custom' ? 'badge-custom' : previewPlaybook.badgeType === 'new' ? 'badge-new' : ''}`}>
                  {previewPlaybook.badge}
                </span>
                <h2>{previewPlaybook.title}</h2>
                <p>{previewPlaybook.desc}</p>
              </div>
              <button className="playbook-modal-close" onClick={closePreview} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className="playbook-modal-body">
              <div className="playbook-modal-section">
                <h3>
                  <Clock size={16} />
                  How it works
                </h3>
                <div className="playbook-steps">
                  {previewPlaybook.sampleSteps?.map((step, index) => (
                    <div key={index} className="playbook-step">
                      <span className="step-number">{index + 1}</span>
                      <span className="step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="playbook-modal-section">
                <h3>
                  <FileText size={16} />
                  Sample Output
                </h3>
                <div className="playbook-sample-output">
                  <div className="sample-output-header">
                    <i className={`fa-solid ${previewPlaybook.outputIcon}`}></i>
                    <span>{previewPlaybook.sampleOutput?.title}</span>
                  </div>
                  <p className="sample-output-desc">{previewPlaybook.sampleOutput?.preview}</p>
                </div>
              </div>

              <div className="playbook-modal-meta">
                <div className="modal-meta-item">
                  <Clock size={14} />
                  <span>{previewPlaybook.duration}</span>
                </div>
                <div className="modal-meta-item">
                  <i className={`fa-solid ${previewPlaybook.outputIcon}`}></i>
                  <span>{previewPlaybook.output}</span>
                </div>
              </div>
            </div>

            <div className="playbook-modal-footer">
              <button className="modal-btn-secondary" onClick={closePreview}>
                Close
              </button>
              <button 
                className="modal-btn-primary" 
                onClick={() => { closePreview(); navigate(`/workflow/${previewPlaybook.id}`); }}
              >
                <Play size={14} />
                Run Playbook
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
