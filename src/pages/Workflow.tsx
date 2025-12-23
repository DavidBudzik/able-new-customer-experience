import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Download, FileBarChart, Map } from 'lucide-react';
import TopBar from '../components/TopBar';
import './Workflow.css';

export default function Workflow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [domain, setDomain] = useState('');
  const [selectedOfferings, setSelectedOfferings] = useState<string[]>([]);

  const offerings = [
    'Demand Forecasting',
    'Route Optimization',
    'Warehouse Robotics',
    'Supplier Risk Mgmt',
    'Automated Procurement',
    'Last Mile Drones',
    'Digital Twins',
  ];

  const toggleOffering = (offering: string) => {
    if (selectedOfferings.includes(offering)) {
      setSelectedOfferings(selectedOfferings.filter((o) => o !== offering));
    } else {
      setSelectedOfferings([...selectedOfferings, offering]);
    }
  };

  return (
    <main className="main">
      <div className="wrap">
        <TopBar />
        <div className="workflow-container">
          <div className="workflow-header">
            <button className="back-btn" onClick={() => navigate('/')}>
              <ArrowLeft size={16} /> Back
            </button>
            <div>
              <h1><Map size={24} /> Domain Mapper</h1>
              <p className="workflow-meta">Running • Started 2 min ago</p>
            </div>
            <span className="badge-cert">CERTIFIED</span>
          </div>

          <div className="workflow-content">
            {step === 1 && (
              <div className="workflow-step">
                <div className="step-message">
                  <strong>Let's map your market.</strong>
                  <br />
                  <br />
                  What domain or industry would you like to analyze?
                </div>
                <div className="step-input">
                  <input
                    type="text"
                    placeholder="e.g., 'AI in Healthcare in Israel'"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                  />
                  <button
                    onClick={() => setStep(2)}
                    disabled={!domain.trim()}
                    className="continue-btn"
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="workflow-step">
                <div className="step-message">
                  Found <strong>142 active companies</strong> in this domain.
                  <br />
                  <br />
                  Select the offering areas you want to include:
                </div>
                <div className="offerings-grid">
                  {offerings.map((offering) => (
                    <button
                      key={offering}
                      className={`offering-chip ${selectedOfferings.includes(offering) ? 'selected' : ''}`}
                      onClick={() => toggleOffering(offering)}
                    >
                      {selectedOfferings.includes(offering) && <Check size={14} />}
                      {offering}
                    </button>
                  ))}
                </div>
                <div className="step-actions">
                  <button onClick={() => setStep(1)} className="back-btn"><ArrowLeft size={16} /> Back</button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={selectedOfferings.length === 0}
                    className="continue-btn"
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="workflow-step">
                <div className="step-message">
                  <strong>Analysis complete!</strong> Here's your Market Opportunity Heatmap:
                </div>
                <div className="workflow-output">
                  <div className="output-header">
                    <span><FileBarChart size={16} /> Supply_Chain_AI_Heatmap.pdf</span>
                    <button><Download size={14} /> Download</button>
                  </div>
                  <div className="output-preview">
                    [Heatmap Visualization Preview]
                  </div>
                </div>
                <div className="step-actions">
                  <button onClick={() => navigate('/')} className="back-btn"><ArrowLeft size={16} /> Back to Home</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

