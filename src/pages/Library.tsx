import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Library.css';
import AbleLogo from '../components/AbleLogo';

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

interface IntelligenceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  updateFrequency: string;
  lastUpdated: string;
  filters: string[];
  category: string;
  isLive?: boolean;
  alertCount?: number;
}

const tabs = [
  { id: 'all', label: 'All', icon: 'fa-layer-group' },
  { id: 'playbooks', label: 'Playbooks', icon: 'fa-wand-magic-sparkles' },
  { id: 'intelligence', label: 'Curated Intelligence', icon: 'fa-lightbulb' },
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

const curatedIntelligence: IntelligenceItem[] = [
  {
    id: 'weekly-carveout',
    icon: 'fa-scissors',
    title: 'Weekly Carve-Out Briefing',
    description: 'Top signals, short rationales, and a ranked list of flagged entities for potential divestitures.',
    updateFrequency: 'WEEKLY',
    lastUpdated: '2h ago',
    filters: ['CapEx > $50M', 'Industrials', 'EU/US'],
    category: 'deal',
  },
  {
    id: 'pe-watchlist',
    icon: 'fa-eye',
    title: 'PE Portfolio Exits — Watchlist',
    description: 'Activity spikes, holding-period flags, and buyer pattern changes across tracked PE portfolios.',
    updateFrequency: 'REAL-TIME',
    lastUpdated: '15m ago',
    filters: ['Holding > 5y', 'EU-focused funds'],
    category: 'deal',
    isLive: true,
  },
  {
    id: 'genai-dealfeed',
    icon: 'fa-microchip',
    title: 'GenAI Series B+ — Deal Feed',
    description: 'New financings, valuation shifts, and notable strategic investors in the generative AI space.',
    updateFrequency: 'LIVE',
    lastUpdated: 'Live',
    filters: ['Alert: valuation > 2× median in 30d'],
    category: 'market',
    isLive: true,
  },
  {
    id: 'telehealth-reg',
    icon: 'fa-scale-balanced',
    title: 'Telehealth Regulation Tracker',
    description: 'Policy changes summarized with impact notes and linked source citations for compliance.',
    updateFrequency: 'DAILY',
    lastUpdated: '4h ago',
    filters: ['US', 'State-level changes'],
    category: 'diligence',
    alertCount: 2,
  },
  {
    id: 'industrial-ma',
    icon: 'fa-industry',
    title: 'Industrial M&A Weekly',
    description: 'Curated summary of notable transactions, deal multiples, and strategic rationale analysis.',
    updateFrequency: 'WEEKLY',
    lastUpdated: '1d ago',
    filters: ['Manufacturing', 'EV > $100M'],
    category: 'deal',
  },
  {
    id: 'cyber-risk',
    icon: 'fa-shield-halved',
    title: 'Cyber Risk Monitor',
    description: 'Track security incidents, breach disclosures, and vulnerability reports across your watchlist.',
    updateFrequency: 'REAL-TIME',
    lastUpdated: '8m ago',
    filters: ['Critical vendors', 'Portfolio cos'],
    category: 'diligence',
    isLive: true,
    alertCount: 1,
  },
];

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: IntelligenceItem | null;
}

function ReportModal({ isOpen, onClose, item }: ReportModalProps) {
  if (!isOpen || !item) return null;

  return (
    <div className="report-modal-overlay" onClick={onClose}>
      <div className="report-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="report-header">
          <div className="report-header-left">
            <div className="report-logo">
              <AbleLogo size={32} color="var(--text)" />
            </div>
            <div className="report-title-block">
              <h2>Exit Analysis: CSL Group</h2>
              <span className="report-date">30/07/2025 | Critical IoT Connectivity & Infrastructure</span>
            </div>
          </div>
          <div className="report-header-actions">
            <button className="report-export-btn">
              <i className="fa-solid fa-download"></i>
              Export
            </button>
            <button className="report-close-btn" onClick={onClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="report-content">
          {/* Deal Vitals Section */}
          <section className="report-section">
            <h3 className="report-section-title">Deal Vitals & Sponsor Profile</h3>
            <div className="report-vitals-grid">
              <div className="vitals-main">
                <h4>Asset: CSL Group</h4>
                <p>Market leader in critical IoT connectivity across security, telecare, and infrastructure. Provides secure M2M connectivity services across regulated industries with high recurring revenue from mission-critical applications.</p>
                <div className="vitals-divider"></div>
                <h4>Sponsor: ECI Partners</h4>
                <p>Acquired CSL in August 2020 as part of Fund XI strategy ($927M). The fund is reaching the end of its investment cycle with active harvesting. CSL's exclusion from the 2024 continuation vehicle strongly signals planned divestment.</p>
              </div>
              <div className="vitals-sidebar">
                <h4>Exit Probability: <span className="text-success">High</span></h4>
                <div className="probability-row">
                  <span className="probability-value">80%</span>
                  <div className="probability-bar">
                    <div className="probability-fill" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <p className="vitals-meta"><strong>Timeline:</strong> 12-24 Months</p>
                <p className="vitals-meta"><strong>Holding Period:</strong> Entering 5th year, prime for PE exit.</p>
              </div>
            </div>
          </section>

          {/* Investment Narrative */}
          <section className="report-section">
            <h3 className="report-section-title">Investment Narrative</h3>
            <div className="narrative-block">
              <p>CSL Group represents a prime exit opportunity in the rapidly consolidating IoT connectivity sector. ECI's strategic acquisitions of Caburn Telecom (2022) and EdgeConnect (2025) have successfully expanded CSL's product suite and international presence. The combination of exceptional financial performance, expanding global footprint, and strong fund cycle indicators makes this one of ECI's prime candidates for divestment within the next 12-24 months.</p>
            </div>
          </section>

          {/* Financial Performance */}
          <section className="report-section">
            <h3 className="report-section-title">Financial Performance & Strategic KPIs</h3>
            <div className="kpi-grid">
              <div className="kpi-card">
                <i className="fa-solid fa-chart-line"></i>
                <span className="kpi-value">$14.8B</span>
                <span className="kpi-label">FY2024 Revenue <span className="text-success">+11.2%</span></span>
              </div>
              <div className="kpi-card">
                <i className="fa-solid fa-dollar-sign"></i>
                <span className="kpi-value">$2.91B</span>
                <span className="kpi-label">Net Profit <span className="text-success">+11%</span></span>
              </div>
              <div className="kpi-card">
                <i className="fa-solid fa-arrow-trend-up"></i>
                <span className="kpi-value">$4.75B</span>
                <span className="kpi-label">EBITDA 2024</span>
              </div>
              <div className="kpi-card">
                <i className="fa-solid fa-gem"></i>
                <span className="kpi-value">16%</span>
                <span className="kpi-label">Dividend Growth</span>
              </div>
            </div>
            <p className="report-benchmark">Benchmark: CSL's growth outpaces industry norms and supports a premium exit multiple. FY2025 guidance of 5-7% growth with NPATA guidance of $3.2-3.3B demonstrates continued momentum.</p>
          </section>

          {/* Sector Relevance */}
          <section className="report-section">
            <h3 className="report-section-title">Sector Relevance & Strategic Positioning</h3>
            <div className="positioning-grid">
              <div className="positioning-col">
                <h4 className="text-success">Strategic Appeal</h4>
                <ul>
                  <li>✓ High-demand niche driven by smart infrastructure and compliance requirements</li>
                  <li>✓ Recurring revenue model from mission-critical applications</li>
                  <li>✓ Strong M&A footprint: Caburn Telecom (2022), EdgeConnect (2025)</li>
                  <li>✓ Operates across security, telecare, and infrastructure verticals</li>
                </ul>
              </div>
              <div className="positioning-col">
                <h4 className="text-danger">Market Drivers</h4>
                <ul>
                  <li>→ Compliance requirements driving secure connectivity adoption</li>
                  <li>→ Smart infrastructure rollout accelerating globally</li>
                  <li>→ Cybersecurity focus increasing demand for secure M2M services</li>
                  <li>→ Consolidation trend in global security and IoT markets</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Potential Acquirers */}
          <section className="report-section">
            <h3 className="report-section-title">Potential Acquirer Universe</h3>
            <h4 className="subsection-title">Financial Buyers</h4>
            <div className="acquirer-grid">
              <div className="acquirer-card">
                <h5>Thoma Bravo</h5>
                <p>Focus: Technology, cybersecurity, connectivity<br/>AUM: $184B; acquired Darktrace in 2024 for $5.3B<br/>Fit: CSL's secure connectivity stack aligns perfectly with Thoma Bravo's network security investment thesis and portfolio synergies.</p>
              </div>
              <div className="acquirer-card">
                <h5>GTCR</h5>
                <p>Focus: Security, infrastructure technology<br/>Capital: Strategic Growth Fund II closed at $3.6B (2025); $15.4B dry powder<br/>Fit: GTCR's acquisition of ADT's commercial business in 2024 demonstrates strong sector conviction and strategic alignment.</p>
              </div>
              <div className="acquirer-card">
                <h5>Arlington Capital Partners</h5>
                <p>Focus: Secure communications, defense technology<br/>Recent: Acquired Exostar in 2023; AUM $1-10B<br/>Fit: Strong alignment with secure connectivity applications and defense sector exposure.</p>
              </div>
            </div>

            <h4 className="subsection-title">Strategic Buyers</h4>
            <div className="acquirer-grid">
              <div className="acquirer-card">
                <h5>Johnson Controls</h5>
                <p>Relevance: Global leader in smart buildings and integrated security systems<br/>Recent Activity: Investments in automation technology; Qolsys acquisition in 2020<br/>Strategic Fit: CSL would enhance their IoT connectivity capabilities across building management systems.</p>
              </div>
              <div className="acquirer-card">
                <h5>Honeywell</h5>
                <p>Relevance: Industrial automation and IoT platform leader<br/>Recent Activity: Launched Advance Control for Buildings (2024)<br/>Strategic Fit: Vertical integration opportunity for secure connectivity across industrial IoT applications.</p>
              </div>
              <div className="acquirer-card">
                <h5>Carlisle Companies</h5>
                <p>Relevance: Building envelope and connected infrastructure systems<br/>Recent Activity: Multiple acquisitions including Plasti-Fab and Bonded Logic<br/>Strategic Fit: CSL's connectivity solutions would complement their building systems portfolio.</p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="report-section report-footer-section">
            <h4>Conclusion & Final Assessment</h4>
            <p>CSL Group presents a compelling exit opportunity driven by strong financial performance, strategic market positioning, and favorable fund cycle dynamics. The combination of ECI's active harvesting strategy, CSL's proven growth trajectory, and robust buyer interest from both strategic and financial acquirers supports our high-conviction assessment.</p>
            <p className="assessment-highlight">Assessment: High-Probability Exit Target (80% within 12-24 months).</p>
            
            <div className="disclaimer">
              <h5>Disclaimer & Sources</h5>
              <p>This document is for informational purposes only. It does not constitute investment advice, a recommendation, or a solicitation to engage in any transaction. All data is sourced from publicly available sources as of July 2025.</p>
              <p className="sources">Sources: <a href="#">ECI Partners</a>, <a href="#">CSL Group</a>, <a href="#">Thoma Bravo</a>, <a href="#">PitchBook.com</a>, <a href="#">Chicago Business</a>, and other public filings.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

interface LibraryProps {
  onRemix?: (playbook: Playbook) => void;
  customPlaybooks?: CustomPlaybook[];
}

export default function Library({ onRemix, customPlaybooks = [] }: LibraryProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIntelItem, setSelectedIntelItem] = useState<IntelligenceItem | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Determine what content to show based on active tab
  const showPlaybooks = activeTab === 'all' || activeTab === 'playbooks' || ['market', 'deal', 'diligence'].includes(activeTab);
  const showIntelligence = activeTab === 'all' || activeTab === 'intelligence' || ['market', 'deal', 'diligence'].includes(activeTab);
  const showCustomPlaybooks = activeTab !== 'intelligence';

  const filteredPlaybooks = activeTab === 'intelligence' ? [] : standardPlaybooks.filter((playbook) => {
    const matchesTab = activeTab === 'all' || activeTab === 'playbooks' || playbook.category === activeTab;
    const matchesSearch = playbook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playbook.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const filteredIntelligence = activeTab === 'playbooks' ? [] : curatedIntelligence.filter((item) => {
    const matchesTab = activeTab === 'all' || activeTab === 'intelligence' || item.category === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
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

  const handleViewIntelligence = (itemId: string) => {
    navigate(`/workspace?source=intel&id=${itemId}`);
  };

  const handleSeeReport = (item: IntelligenceItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIntelItem(item);
    setIsReportModalOpen(true);
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
              <h1>Library</h1>
              <p className="library-subtitle">Explore playbooks and curated intelligence feeds</p>
            </div>
            <div className="library-search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search playbooks & intelligence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </header>

          {/* Tab navigation */}
          <nav className="library-tabs">
            {tabs.map((tab) => (
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
        {showCustomPlaybooks && (
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
        )}

        {/* Curated Intelligence section */}
        {showIntelligence && filteredIntelligence.length > 0 && (
          <section className="library-section">
            <div className="section-header">
              <h2>
                <i className="fa-solid fa-lightbulb section-icon"></i>
                Curated Intelligence
              </h2>
              <span className="intel-count">{filteredIntelligence.length} feeds</span>
            </div>

            <div className="intelligence-grid">
              {filteredIntelligence.map((item) => (
                <div 
                  key={item.id} 
                  className="intel-card"
                  onClick={() => handleViewIntelligence(item.id)}
                >
                  {/* Status badge */}
                  <div className={`intel-status-badge ${item.isLive ? 'live' : ''}`}>
                    {item.isLive ? (
                      <>
                        <span className="status-dot"></span>
                        LIVE
                      </>
                    ) : (
                      <>{item.updateFrequency}</>
                    )}
                  </div>

                  {/* Header with title */}
                  <div className="intel-header">
                    <h3 className="intel-title">{item.title}</h3>
                  </div>

                  {/* Metadata rows */}
                  <div className="intel-meta-list">
                    <div className="intel-meta-row">
                      <i className="fa-solid fa-filter"></i>
                      <span>Filters: {item.filters.join(' · ')}</span>
                    </div>
                    <div className="intel-meta-row">
                      <i className="fa-regular fa-clock"></i>
                      <span>Updated: {item.lastUpdated}</span>
                    </div>
                    {item.alertCount && (
                      <div className="intel-meta-row alert">
                        <i className="fa-solid fa-bell"></i>
                        <span>{item.alertCount} new {item.alertCount === 1 ? 'alert' : 'alerts'}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="intel-description">{item.description}</p>

                  {/* Action button */}
                  <button 
                    className="intel-action-btn"
                    onClick={(e) => handleSeeReport(item, e)}
                  >
                    See Report
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Standard Playbooks section */}
        {showPlaybooks && filteredPlaybooks.length > 0 && (
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

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        item={selectedIntelItem}
      />
    </main>
  );
}
