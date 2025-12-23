import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Rail.css';
import AbleLogo from './AbleLogo';

export default function Rail() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: 'fa-house', tooltip: 'Home' },
    { path: '/library/playbooks', icon: 'fa-book-open', tooltip: 'Library', hasDot: true },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="rail" aria-label="Primary">
      <div className="brand-icon">
        <AbleLogo size={24} color="#181818" />
      </div>

      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`rail-btn ${isActive(item.path) ? 'active' : ''} ${item.hasDot ? 'has-dot' : ''}`}
          data-tooltip={item.tooltip}
        >
          <i className={`fa-solid ${item.icon}`}></i>
        </Link>
      ))}

      <button 
        className="rail-btn add" 
        data-tooltip="New Research"
        onClick={() => navigate('/chat')}
      >
        <i className="fa-solid fa-plus"></i>
      </button>

      <div className="rail-user" title="Erez R.">
        ER
      </div>
    </nav>
  );
}

