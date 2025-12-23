import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FolderOpen, ArrowRight, X, Target, Box } from 'lucide-react';
import './ProjectsSection.css';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'paused' | 'completed';
  progress: number;
  targets?: number;
  artifacts: number;
  lastUpdated: string;
}

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Nordic Tech Roll-up',
    description: 'Due diligence phase — evaluating strategic fit and synergies',
    status: 'active',
    progress: 65,
    targets: 12,
    artifacts: 8,
    lastUpdated: '2 hours ago',
  },
  {
    id: '2',
    title: 'Carve-out Assessment',
    description: 'Operational readiness and separation planning',
    status: 'active',
    progress: 40,
    artifacts: 5,
    lastUpdated: '4 hours ago',
  },
  {
    id: '3',
    title: 'Logistics Sector Deep-dive',
    description: 'Market analysis across 8 sources',
    status: 'active',
    progress: 85,
    artifacts: 12,
    lastUpdated: 'Yesterday',
  },
  {
    id: '4',
    title: 'EU Regulatory Impact',
    description: 'Policy briefing and compliance assessment',
    status: 'paused',
    progress: 20,
    artifacts: 2,
    lastUpdated: 'Yesterday',
  },
];

export default function ProjectsSection() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  const handleProjectClick = (project: Project) => {
    navigate(`/workspace?source=project&id=${project.id}`);
  };

  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;

    const newProject: Project = {
      id: Date.now().toString(),
      title: newProjectName.trim(),
      description: newProjectDescription.trim() || 'New project',
      status: 'active',
      progress: 0,
      artifacts: 0,
      lastUpdated: 'Just now',
    };

    setProjects([newProject, ...projects]);
    setNewProjectName('');
    setNewProjectDescription('');
    setShowNewProjectModal(false);
  };

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowNewProjectModal(false);
    }
  };

  return (
    <>
      <section className="projects-section" aria-label="Recent Activity">
        <div className="projects-header">
          <div className="projects-header-left">
            <h2 className="projects-title">Recent Activity</h2>
            <span className="projects-count">{projects.length}</span>
          </div>
        </div>

        <div className="projects-grid">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => handleProjectClick(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleProjectClick(project)}
              >
                <div className="card-icon" aria-hidden="true">
                  <FolderOpen size={16} />
                </div>
                
                <div className="card-content">
                  <div className="card-body">
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-description">{project.description}</p>
                  </div>

                  <div className="card-meta">
                    {project.targets && (
                      <span className="meta-item">
                        <Target size={12} />
                        {project.targets} targets
                      </span>
                    )}
                    <span className="meta-item">
                      <Box size={12} />
                      {project.artifacts} artifacts
                    </span>
                  </div>

                  <div className="card-footer">
                    <div className="card-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="progress-label">{project.progress}%</span>
                    </div>
                    <span className="card-timestamp">{project.lastUpdated}</span>
                  </div>
                </div>

                <div className="card-arrow" aria-hidden="true">
                  <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
      </section>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div 
          className="modal-overlay" 
          onClick={() => setShowNewProjectModal(false)}
          onKeyDown={handleModalKeyDown}
        >
          <div 
            className="modal-content project-modal" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="new-project-title"
          >
            <div className="modal-header">
              <h2 id="new-project-title">Create new project</h2>
              <button 
                className="modal-close" 
                onClick={() => setShowNewProjectModal(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="project-name">Project name</label>
                <input 
                  id="project-name"
                  type="text" 
                  placeholder="e.g., Series B Due Diligence"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="project-description">Description (optional)</label>
                <textarea 
                  id="project-description"
                  placeholder="What is this project about?"
                  rows={3}
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary" 
                onClick={() => setShowNewProjectModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={handleCreateProject}
                disabled={!newProjectName.trim()}
              >
                Create project
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
