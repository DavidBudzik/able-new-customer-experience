import { useNavigate } from 'react-router-dom';
import { FileText, Folder, Zap, Scale, ChevronDown, Eye, TrendingUp, MapPin } from 'lucide-react';
import './IntelligenceSection.css';

interface IntelligenceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  updateStatus: string;
  badge?: 'SIGNAL';
  filterIcon: React.ReactNode;
  filters: string;
  isLive?: boolean;
}

const items: IntelligenceItem[] = [
  {
    id: 'weekly-carveout',
    icon: <FileText size={20} />,
    title: 'Weekly Carve-out Briefing',
    description: 'Top signals, short rationales, and a ranked list of flagged entities.',
    updateStatus: 'UPDATED 2H AGO',
    badge: 'SIGNAL',
    filterIcon: <ChevronDown size={12} />,
    filters: 'Industrials • EU/US',
  },
  {
    id: 'pe-watchlist',
    icon: <Folder size={20} />,
    title: 'PE Portfolio Exits',
    description: 'Activity spikes, holding-period flags, and buyer pattern changes.',
    updateStatus: 'UPDATED 15M AGO',
    filterIcon: <Eye size={12} />,
    filters: 'Holding > 5y',
  },
  {
    id: 'genai-dealfeed',
    icon: <Zap size={20} />,
    title: 'GenAI Series B+ Deal Feed',
    description: 'New financings, valuation shifts, and notable strategic investors.',
    updateStatus: 'LIVE FEED',
    filterIcon: <TrendingUp size={12} />,
    filters: 'High Volatility',
    isLive: true,
  },
  {
    id: 'telehealth-reg',
    icon: <Scale size={20} />,
    title: 'Telehealth Regulation',
    description: 'Policy changes summarized with Impact notes and linked source citations.',
    updateStatus: 'DAILY',
    filterIcon: <MapPin size={12} />,
    filters: 'US State-level',
  },
];

export default function IntelligenceSection() {
  const navigate = useNavigate();

  const handleCardClick = (item: IntelligenceItem) => {
    navigate(`/library/intelligence?type=${item.id}`);
  };

  return (
    <div className="intelligence-section">
      <div className="section-head">
        <h2>Curated Intelligence</h2>
        <a className="link" href="#" onClick={(e) => { e.preventDefault(); navigate('/library/intelligence'); }}>
          View Library
        </a>
      </div>

      <div className="intel-grid">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="intel-card-home"
            onClick={() => handleCardClick(item)}
          >
            {/* Update status - top left */}
            <div className="intel-update-status">
              {item.updateStatus}
            </div>

            {/* Icon and badge container */}
            <div className="intel-icon-container">
              <div className="intel-icon">
                {item.icon}
              </div>
              {item.badge && (
                <span className="intel-badge">{item.badge}</span>
              )}
            </div>

            {/* Title */}
            <h3 className="intel-title">{item.title}</h3>

            {/* Description */}
            <p className="intel-description">{item.description}</p>

            {/* Filter tag - bottom */}
            <div className="intel-filter-tag">
              {item.filterIcon}
              <span>{item.filters}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
