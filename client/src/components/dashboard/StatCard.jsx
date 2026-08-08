import { motion } from 'framer-motion';

const StatCard = ({ label, value, icon: Icon, accent, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="bg-white dark:bg-gray-900 rounded-xl border border-border-subtle dark:border-white/10 p-4 sm:p-5 hover:shadow-sm dark:hover:shadow-none dark:hover:border-white/20 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className="h-9 w-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${accent}1A` }}
        >
          <Icon className="h-4.5 w-4.5" style={{ color: accent }} />
        </span>
      </div>
      <p className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 tabular-nums">
        {value}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
    </motion.div>
  );
};

export default StatCard;