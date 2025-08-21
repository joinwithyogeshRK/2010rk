import { Link, useLocation } from 'react-router-dom';
import { Home, FolderOpen, BarChart2, Settings } from 'lucide-react';

export function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`bottom-nav-item ${path === '/' ? 'bottom-nav-item-active' : 'bottom-nav-item-inactive'}`}>
        <Home className="h-5 w-5" />
        <span>Home</span>
      </Link>
      <Link to="/categories" className={`bottom-nav-item ${path === '/categories' ? 'bottom-nav-item-active' : 'bottom-nav-item-inactive'}`}>
        <FolderOpen className="h-5 w-5" />
        <span>Categories</span>
      </Link>
      <Link to="/statistics" className={`bottom-nav-item ${path === '/statistics' ? 'bottom-nav-item-active' : 'bottom-nav-item-inactive'}`}>
        <BarChart2 className="h-5 w-5" />
        <span>Statistics</span>
      </Link>
      <Link to="/settings" className={`bottom-nav-item ${path === '/settings' ? 'bottom-nav-item-active' : 'bottom-nav-item-inactive'}`}>
        <Settings className="h-5 w-5" />
        <span>Settings</span>
      </Link>
    </nav>
  );
}
