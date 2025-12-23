import { useNavigate } from 'react-router-dom';
import { Globe, Target, Shield, ChessKing } from 'lucide-react';
import './StandardWorkflowsSection.css';

interface Workflow {
  id: string;
  title: string;
  description: string;
  badge: 'CERTIFIED' | 'NEW';
  icon: React.ReactNode;
}

const workflows: Workflow[] = [
  {
    id: 'market-scan',
    title: 'Market Scan',
    description: 'Map an ecosystem, identify gaps, and size opportunities in one structured output.',
    badge: 'CERTIFIED',
    icon: <Globe size={20} />,
  },
  {
    id: 'company-deep-dive',
    title: 'Company Deep Dive',
    description: 'IC-ready snapshot across positioning, traction, risk flags, and comparables.',
    badge: 'CERTIFIED',
    icon: <Target size={20} />,
  },
  {
    id: 'vendor-risk-review',
    title: 'Vendor Risk Review',
    description: 'Automated compliance, stability, cyber posture, and reputational screening.',
    badge: 'CERTIFIED',
    icon: <Shield size={20} />,
  },
  {
    id: 'scenario-planning',
    title: 'Scenario Planning',
    description: 'Test market shifts and competitor moves with explicit assumptions.',
    badge: 'NEW',
    icon: <ChessKing size={20} />,
  },
];

export default function StandardWorkflowsSection() {
  const navigate = useNavigate();

  return (
    <div className="standard-workflows-section">
      <div className="section-head">
        <h2>Playbook</h2>
        <a className="link" href="#" onClick={(e) => { e.preventDefault(); navigate('/library/playbooks'); }}>
          All playbooks
        </a>
      </div>

      <div className="workflows-grid">
        {workflows.map((workflow) => (
          <div
            key={workflow.id}
            className="workflow-card"
            onClick={() => navigate(`/workflow/${workflow.id}`)}
          >
            <div className="workflow-icon-container">
              <div className="workflow-icon">
                {workflow.icon}
              </div>
              <span className={`workflow-badge ${workflow.badge === 'NEW' ? 'badge-new' : 'badge-certified'}`}>
                {workflow.badge}
              </span>
            </div>
            <h3 className="workflow-title">{workflow.title}</h3>
            <p className="workflow-description">{workflow.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

