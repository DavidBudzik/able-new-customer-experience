import './SourcesPanel.css';

interface SourcesPanelProps {
  selectedSources: string[];
  onSelectionChange: (sources: string[]) => void;
}

export default function SourcesPanel({ selectedSources, onSelectionChange }: SourcesPanelProps) {
  const sources = [
    { id: 'acme', name: 'Acme Corp', type: 'Company', icon: '🏢', added: '2d ago' },
    { id: 'techflow', name: 'TechFlow Inc', type: 'Company', icon: '🏢', added: '2d ago' },
    { id: 'report', name: 'Q3 Market Report.pdf', type: 'Document', icon: '📄', size: '2.4 MB' },
    { id: 'dataset', name: 'Europe Energy Dataset', type: 'Dataset', icon: '📊', entities: '4,200 entities' },
    { id: 'crunchbase', name: 'Crunchbase Export', type: 'Integration', icon: '🔗', status: 'Synced' },
  ];

  const toggleSource = (id: string) => {
    if (selectedSources.includes(id)) {
      onSelectionChange(selectedSources.filter((s) => s !== id));
    } else {
      onSelectionChange([...selectedSources, id]);
    }
  };

  return (
    <div className="sources-panel">
      <div className="sources-header">
        <div className="sources-title">Sources</div>
        <button className="add-btn">+ Add</button>
      </div>

      <div className="sources-list">
        {sources.map((source) => (
          <div
            key={source.id}
            className={`source-item ${selectedSources.includes(source.id) ? 'selected' : ''}`}
            onClick={() => toggleSource(source.id)}
          >
            <div className="source-icon">{source.icon}</div>
            <div className="source-info">
              <div className="source-name">{source.name}</div>
              <div className="source-meta">
                {source.type} • {source.added || source.size || source.entities || source.status}
              </div>
            </div>
            <div className={`source-check ${selectedSources.includes(source.id) ? 'checked' : ''}`}>
              {selectedSources.includes(source.id) ? '✓' : ''}
            </div>
          </div>
        ))}
      </div>

      <div className="sources-footer">
        <div className="source-count">
          {selectedSources.length} of {sources.length} sources selected
        </div>
        <button className="select-all-btn">Select All</button>
      </div>
    </div>
  );
}

