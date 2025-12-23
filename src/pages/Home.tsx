import TopBar from '../components/TopBar';
import Hero from '../components/Hero';
import StandardWorkflowsSection from '../components/StandardWorkflowsSection';
import IntelligenceSection from '../components/IntelligenceSection';
import ProjectsSection from '../components/ProjectsSection';
import './Home.css';

export default function Home() {
  return (
    <main className="main">
      <div className="wrap">
        <TopBar />
        <Hero />
        <div className="content-grid">
          <div className="content-left">
            <StandardWorkflowsSection />
            <IntelligenceSection />
          </div>
          <div className="content-right">
            <ProjectsSection />
          </div>
        </div>
      </div>
    </main>
  );
}

