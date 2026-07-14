import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

const linkClass = ({ isActive }) =>
  `px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'text-blue-900' : 'text-slate-600 hover:text-blue-900'
  }`;

const Header = () => (
  <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
    <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
      <NavLink to="/" className="text-lg font-semibold text-slate-900">
        Subas Kathayat
      </NavLink>
      <div className="flex items-center gap-1">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  </header>
);

export default Header;
