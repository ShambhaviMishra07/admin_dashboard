// import { Bell, Moon, Sun, Menu } from 'lucide-react';
// import { useTheme } from '../../context/ThemeContext';

// const Topbar = ({ title, onMenuClick }) => {
//   const { isDark, toggleTheme } = useTheme();

//   return (
//     <header className="h-16 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-border-subtle dark:border-white/10">
//       <div className="flex items-center gap-3">
//         <button
//           onClick={onMenuClick}
//           className="lg:hidden h-9 w-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-surface-muted dark:hover:bg-white/5 transition-colors"
//           aria-label="Open menu"
//         >
//           <Menu className="h-5 w-5" />
//         </button>
//         <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h1>
//       </div>

//       <div className="flex items-center gap-2">
//         <button
//           onClick={toggleTheme}
//           className="h-9 w-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-surface-muted dark:hover:bg-white/5 transition-colors"
//           aria-label="Toggle dark mode"
//         >
//           {isDark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
//         </button>
//         <button className="h-9 w-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-surface-muted dark:hover:bg-white/5 transition-colors relative">
//           <Bell className="h-4.5 w-4.5" />
//           <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-status-rejected" />
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Topbar;

import { Bell, Moon, Sun, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Topbar = ({ onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname === '/dashboard') {
      return 'Overview';
    }

    if (location.pathname.startsWith('/dashboard/applications')) {
      return 'Applications';
    }

    if (location.pathname.startsWith('/dashboard/settings')) {
      return 'Settings';
    }

    return 'Dashboard';
  };

  const title = getTitle();

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white dark:bg-gray-900/95 dark:backdrop-blur-xl border-b border-border-subtle dark:border-white/10">

      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden h-9 w-9 flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-200 hover:bg-surface-muted dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="h-9 w-9 flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-100 hover:bg-surface-muted dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <Sun className="h-4.5 w-4.5" />
          ) : (
            <Moon className="h-4.5 w-4.5" />
          )}
        </button>

        <button
          className="h-9 w-9 flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-100 hover:bg-surface-muted dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="h-4.5 w-4.5" />

          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-status-rejected" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;