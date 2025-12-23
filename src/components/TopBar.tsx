import './TopBar.css';

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="crumb">Able Enterprise</div>
      <div className="top-actions">
        <div className="pill">
          <i className="fa-solid fa-circle-info"></i> Your workspace
        </div>
        <div className="pill">
          <i className="fa-solid fa-bell"></i> Notifications
        </div>
      </div>
    </div>
  );
}

