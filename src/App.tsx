import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Rail from './components/Rail';
import Home from './pages/Home';
import PlaybooksLibrary from './pages/PlaybooksLibrary';
import IntelligenceLibrary from './pages/IntelligenceLibrary';
import Workspace from './pages/Workspace';
import Workflow from './pages/Workflow';
import Chat from './pages/Chat';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Rail />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/library/playbooks" element={<PlaybooksLibrary />} />
          <Route path="/library/intelligence" element={<IntelligenceLibrary />} />
          <Route path="/projects" element={<Workspace />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/workflow/:id" element={<Workflow />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
