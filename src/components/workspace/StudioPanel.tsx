import { useNavigate } from 'react-router-dom';
import './StudioPanel.css';

interface StudioPanelProps {
  selectedSources: string[];
}

export default function StudioPanel({ selectedSources }: StudioPanelProps) {
  const navigate = useNavigate();

  const playbooks = [
    {
      id: 'deep-dive',
      icon: '🔍',
      name: 'Deep Dive',
      desc: '360° analysis on selected companies',
      meta: '⏱ 8 min • 📄 Report',
    },
    {
      id: 'buyer-mapping',
      icon: '💰',
      name: 'Buyer Mapping',
      desc: 'Find buyers for these companies',
      meta: '⏱ 10 min • 📋 List',
    },
    {
      id: 'vendor-risk',
      icon: '⚠️',
      name: 'Vendor Risk',
      desc: 'Risk assessment on vendors',
      meta: '⏱ 15 min • 📊 Matrix',
    },
  ];

  const outputs = [
    { icon: '📄', name: 'Acme_DeepDive.pdf' },
    { icon: '📊', name: 'Comparison_Matrix.xlsx' },
  ];

  return (
    <div className="studio-panel">
      <div className="studio-header">
        <div className="studio-title">Studio</div>
        <div className="studio-subtitle">Run playbooks on your sources</div>
      </div>

      <div className="studio-section">
        <div className="studio-label">Run a Playbook</div>
        {playbooks.map((playbook) => (
          <div
            key={playbook.id}
            className="playbook-card"
            onClick={() => navigate(`/workflow/${playbook.id}`)}
          >
            <div className="playbook-header">
              <div className="playbook-icon">{playbook.icon}</div>
              <div>
                <div className="playbook-name">{playbook.name}</div>
                <span className="badge-certified">CERTIFIED</span>
              </div>
            </div>
            <div className="playbook-desc">{playbook.desc}</div>
            <div className="playbook-meta">{playbook.meta}</div>
          </div>
        ))}
      </div>

      <div className="studio-section">
        <div className="studio-label">Generated Outputs</div>
        {outputs.map((output, idx) => (
          <div key={idx} className="output-card">
            <div className="output-header">
              <span className="output-icon">{output.icon}</span>
              <span className="output-name">{output.name}</span>
              <span className="output-action">↓</span>
            </div>
          </div>
        ))}
      </div>

      <div className="studio-footer">
        <button
          className="run-btn"
          onClick={() => navigate('/workflow/deep-dive')}
          disabled={selectedSources.length === 0}
        >
          Run Deep Dive →
        </button>
      </div>
    </div>
  );
}

