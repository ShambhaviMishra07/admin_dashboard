import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  GraduationCap,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/applications', label: 'Applications', icon: Users },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
];

const SidebarContent = ({ onNavigate }) => {
  const { admin, logout } = useAuth();

  return (
    <>
      <div className="flex items-center gap-2.5 px-6 h-16 border-b border-border-subtle dark:border-white/10">
        <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center">
          <GraduationCap className="h-4.5 w-4.5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">
            MamRaj Nexus
          </p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-tight">
            Admin Dashboard
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            onClick={onNavigate}
           
      // className={({ isActive }) =>
      //   `relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      //     isActive
      //       ? 'text-brand-700 bg-brand-50 dark:text-brand-300 dark:bg-brand-500/15'
      //       : 'text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-surface-muted dark:hover:bg-white/10'
      //   }`
      // }

   className={({ isActive }) =>
  `relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? 'text-white bg-brand-500/30 dark:text-white dark:bg-brand-500/30'
      : 'text-gray-500 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-surface-muted dark:hover:bg-white/10'
  }`
}

          >
            {({ isActive }) => (
              <>
               {isActive && (
  <motion.span
    layoutId="sidebar-active"
    className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-brand-400"
  />
)}
                <Icon className="h-4.5 w-4.5" />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-border-subtle dark:border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="h-8 w-8 rounded-full bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-400 text-xs font-semibold flex items-center justify-center">
            {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {admin?.name}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{admin?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-status-rejected hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-4.5 w-4.5" />
          Logout
        </button>
      </div>
    </>
  );
};

const Sidebar = ({ mobileOpen, closeMobile }) => {
  return (
    <>
     {/* Desktop sidebar */} <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-white dark:bg-gray-900/95 dark:backdrop-blur-xl border-r border-border-subtle dark:border-white/10"> 
     <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              className="fixed top-0 left-0 h-screen w-72 flex flex-col bg-white dark:bg-gray-900 border-r border-border-subtle dark:border-white/10 z-50 lg:hidden"
            >
              <button
                onClick={closeMobile}
                className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-surface-muted dark:hover:bg-white/5"
              >
                <X className="h-4.5 w-4.5" />
              </button>
              <SidebarContent onNavigate={closeMobile} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;