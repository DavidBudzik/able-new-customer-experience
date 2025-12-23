import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Filter, ArrowUpDown, ArrowLeft } from 'lucide-react';
import './IntelligenceLibrary.css';
import AbleLogo from '../components/AbleLogo';

interface Company {
  id: string;
  name: string;
  description: string;
  probability: number;
  timeframe: string;
  status?: 'exited';
  sponsors: string;
  yearsHeld: number;
  location: string;
}

const tabs = [
  { id: 'all', label: 'All Reports', icon: 'fa-layer-group' },
  { id: 'high-probability', label: 'High Probability', icon: 'fa-chart-line' },
  { id: 'exited', label: 'Recent Exits', icon: 'fa-check-circle' },
  { id: 'location', label: 'By Location', icon: 'fa-map-marker-alt' },
  { id: 'sponsor', label: 'By Sponsor', icon: 'fa-building' },
];

const companies: Company[] = [
  {
    id: 'drive-medical',
    name: 'Drive Medical',
    description: 'Supplies durable medical equipment.',
    probability: 100,
    timeframe: '0-3 m',
    sponsors: 'Clayton, Dubilier & Rice (CD&R)',
    yearsHeld: 9,
    location: 'New York, United States',
  },
  {
    id: 'swat',
    name: 'SWAT Specialty Welding and Turnarounds (SWAT)',
    description: 'Delivers specialty welding and turnaround services.',
    probability: 100,
    timeframe: '48-72 m',
    sponsors: 'ORIX Capital Partners',
    yearsHeld: 6,
    location: 'Louisiana, United States',
  },
  {
    id: 'partner-pet-food',
    name: 'Partner in Pet Food',
    description: 'Manufactures and supplies private label pet food.',
    probability: 95,
    timeframe: '6-12 m',
    sponsors: 'CVC Capital Partners IX (majority), Cinven (minority)',
    yearsHeld: 7,
    location: 'Pest, Hungary',
  },
  {
    id: 'engelmann-sensor',
    name: 'Engelmann Sensor',
    description: 'Designs, manufactures, and distributes electronic heat meters.',
    probability: 0,
    timeframe: '',
    status: 'exited',
    sponsors: '',
    yearsHeld: 0,
    location: 'Baden-Württemberg, Germany',
  },
  {
    id: 'framery',
    name: 'Framery',
    description: 'Engineers and manufactures soundproof pods.',
    probability: 93,
    timeframe: '0-9 m',
    sponsors: 'Vaaka Partners',
    yearsHeld: 8,
    location: 'Other, Finland',
  },
  {
    id: 'oxxynova',
    name: 'Oxxynova',
    description: 'Produces and markets liquid dimethylterephthalate (DMT).',
    probability: 90,
    timeframe: '6-12 m',
    sponsors: 'Speyside Equity',
    yearsHeld: 10,
    location: 'Niedersachsen, Germany',
  },
  {
    id: 'kinly',
    name: 'Kinly',
    description: 'Presents seamless and reliable collaboration solutions.',
    probability: 90,
    timeframe: '3-6 m',
    sponsors: 'One Equity Partners',
    yearsHeld: 8,
    location: 'Noord-Holland, The Netherlands',
  },
  {
    id: 'aa-ireland',
    name: 'AA Ireland',
    description: 'Offers car, travel, and home insurance services.',
    probability: 90,
    timeframe: '1-3 m',
    sponsors: 'Further Global Capital Management',
    yearsHeld: 5,
    location: 'Dublin, Ireland',
  },
  {
    id: 'mec3',
    name: 'Mec3',
    description: 'Manufactures ingredients for artisanal gelato and pastry businesses.',
    probability: 90,
    timeframe: '4-8 m',
    sponsors: 'Terlos LLP-led investor consortium',
    yearsHeld: 9,
    location: 'Emilia-Romagna, Italy',
  },
  {
    id: 'orion-breweries',
    name: 'Orion Breweries',
    description: 'Supplies beer and beer-like beverages.',
    probability: 90,
    timeframe: '1-3 m',
    sponsors: 'The Carlyle Group and Nomura Capital Partners',
    yearsHeld: 6,
    location: 'Okinawa, Japan',
  },
  {
    id: 'molycop',
    name: 'Molycop',
    description: 'Supplies mining consumables and related services.',
    probability: 90,
    timeframe: '0-4 m',
    sponsors: 'American Industrial Partners (AIP)',
    yearsHeld: 9,
    location: 'New South Wales, Australia',
  },
  {
    id: 'cobham',
    name: 'Cobham',
    description: 'Manufactures air-to-air refueling systems, environmental systems, and actuation.',
    probability: 90,
    timeframe: '6-12 m',
    sponsors: 'Advent International',
    yearsHeld: 6,
    location: 'Dorset, United Kingdom',
  },
];

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
}

function ReportModal({ isOpen, onClose, company }: ReportModalProps) {
  if (!isOpen || !company) return null;

  return (
    <div className="report-modal-overlay" onClick={onClose}>
      <div className="report-modal" onClick={(e) => e.stopPropagation()}>
        <div className="report-header">
          <div className="report-header-left">
            <div className="report-logo">
              <AbleLogo size={32} color="var(--text)" />
            </div>
            <div className="report-title-block">
              <h2>Exit Analysis: {company.name}</h2>
              <span className="report-date">30/07/2025 | {company.location}</span>
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

        <div className="report-content">
          <section className="report-section">
            <h3 className="report-section-title">Deal Vitals & Sponsor Profile</h3>
            <div className="report-vitals-grid">
              <div className="vitals-main">
                <h4>Asset: {company.name}</h4>
                <p>{company.description}</p>
                <div className="vitals-divider"></div>
                <h4>Sponsor: {company.sponsors || 'N/A'}</h4>
                <p>Holding period: {company.yearsHeld} years. {company.description}</p>
              </div>
              <div className="vitals-sidebar">
                <h4>Exit Probability: <span className="text-success">High</span></h4>
                <div className="probability-row">
                  <span className="probability-value">{company.probability}%</span>
                  <div className="probability-bar">
                    <div className="probability-fill" style={{ width: `${company.probability}%` }}></div>
                  </div>
                </div>
                <p className="vitals-meta"><strong>Timeline:</strong> {company.timeframe || 'N/A'}</p>
                <p className="vitals-meta"><strong>Holding Period:</strong> {company.yearsHeld} years</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function IntelligenceLibrary() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [sponsorFilter, setSponsorFilter] = useState('Sponsors');
  const [companyFilter, setCompanyFilter] = useState('All Companies');

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesTab = true;
    if (activeTab === 'high-probability') {
      matchesTab = company.probability >= 90 && company.status !== 'exited';
    } else if (activeTab === 'exited') {
      matchesTab = company.status === 'exited';
    } else if (activeTab === 'location') {
      matchesTab = true; // Location filtering can be handled by the location filter dropdown
    } else if (activeTab === 'sponsor') {
      matchesTab = true; // Sponsor filtering can be handled by the sponsor filter dropdown
    }
    
    return matchesSearch && matchesTab;
  });

  const handleSeeReport = (company: Company, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCompany(company);
    setIsReportModalOpen(true);
  };

  return (
    <main className="intelligence-library-main">
      <div className="intelligence-library-container">
        {/* Sticky header section */}
        <div className="intelligence-sticky-header">
          {/* Header with title and search */}
          <header className="intelligence-header">
            <div className="intelligence-title-area">
              <div className="intelligence-title-row">
                <button className="intelligence-back-btn" onClick={() => navigate('/')}>
                  <ArrowLeft size={16} />
                </button>
                <div>
                  <h1>Exit Analysis Reports</h1>
                  <p className="intelligence-subtitle">Explore companies with high probability to be acquired</p>
                </div>
              </div>
            </div>
            <div className="intelligence-search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </header>

          {/* Tab navigation */}
          <nav className="intelligence-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`intelligence-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {'icon' in tab && tab.icon && <i className={`fa-solid ${tab.icon}`}></i>}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Filters */}
        <div className="intelligence-controls">
          <div className="intelligence-filters">
            <select 
              className="filter-select"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option>All Locations</option>
            </select>
            <select 
              className="filter-select"
              value={sponsorFilter}
              onChange={(e) => setSponsorFilter(e.target.value)}
            >
              <option>Sponsors</option>
            </select>
            <select 
              className="filter-select"
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
            >
              <option>All Companies</option>
            </select>
            <button className="filter-btn-more">
              <Filter size={14} />
              More Filters
            </button>
            <button className="filter-btn-sort">
              <ArrowUpDown size={14} />
              Sort By
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="intelligence-results-count">
          Showing 1 - {filteredCompanies.length} of {filteredCompanies.length} companies
        </div>

        {/* Company Cards Grid */}
        <div className="companies-grid">
          {filteredCompanies.map((company) => (
            <div 
              key={company.id} 
              className="company-card"
            >
              {/* Company Icon/Logo placeholder */}
              <div className="company-icon">
                <div className="company-icon-placeholder">
                  {company.name.charAt(0)}
                </div>
              </div>

              {/* Company Name */}
              <h3 className="company-name">{company.name}</h3>

              {/* Probability Badge */}
              {company.status === 'exited' ? (
                <div className="company-badge exited">EXITED</div>
              ) : (
                <div className="company-badge probability">
                  {company.probability}% in <strong>{company.timeframe}</strong>
                </div>
              )}

              {/* Sponsors */}
              {company.sponsors && (
                <div className="company-info-row">
                  <span className="info-label">Sponsors:</span>
                  <span className="info-value">{company.sponsors}</span>
                </div>
              )}

              {/* Years Held */}
              {company.yearsHeld > 0 && (
                <div className="company-info-row">
                  <span className="info-label">Years Held:</span>
                  <span className="info-value">{company.yearsHeld}</span>
                </div>
              )}

              {/* Location */}
              <div className="company-info-row">
                <span className="info-label">Location:</span>
                <span className="info-value">{company.location}</span>
              </div>

              {/* Description */}
              <p className="company-description">{company.description}</p>

              {/* See Report Button */}
              {company.status !== 'exited' && (
                <button 
                  className="company-see-report-btn"
                  onClick={(e) => handleSeeReport(company, e)}
                >
                  See Report
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        company={selectedCompany}
      />
    </main>
  );
}
