import { motion } from 'framer-motion';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const STATUS_COLORS = {
  Pending: '#f59e0b',
  'Under Review': '#3b82f6',
  Shortlisted: '#8b5cf6',
  'Interview Scheduled': '#06b6d4',
  Selected: '#10b981',
  Rejected: '#ef4444',
};

const CustomTooltip = ({ active, payload, isDark }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div
      className={`px-3 py-2 rounded-lg text-xs shadow-lg border ${
        isDark
          ? 'bg-gray-800 border-white/10 text-gray-100'
          : 'bg-white border-border-subtle text-gray-900'
      }`}
    >
      <p className="font-medium">{name}</p>
      <p style={{ color: STATUS_COLORS[name] }}>{value} candidates</p>
    </div>
  );
};

const StatusDistributionChart = ({ stats }) => {
  const { isDark } = useTheme();

  const data = Object.keys(STATUS_COLORS)
    .map((status) => ({ name: status, value: stats?.[status] || 0 }))
    .filter((d) => d.value > 0);

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-xl border border-border-subtle dark:border-white/10 p-5 flex items-center justify-center h-[296px]"
      >
        <p className="text-sm text-gray-400 dark:text-gray-500">No data yet</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="bg-white dark:bg-gray-900 rounded-xl border border-border-subtle dark:border-white/10 p-5"
    >
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        Status Distribution
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip isDark={isDark} />} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span className={isDark ? 'text-gray-300 text-xs' : 'text-gray-600 text-xs'}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default StatusDistributionChart;