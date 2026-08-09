import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const CustomTooltip = ({ active, payload, label, isDark }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className={`px-3 py-2 rounded-lg text-xs shadow-lg border ${
        isDark
          ? 'bg-gray-800 border-white/10 text-gray-100'
          : 'bg-white border-border-subtle text-gray-900'
      }`}
    >
      <p className="font-medium mb-0.5">{label}</p>
      <p className="text-brand-500">{payload[0].value} applications</p>
    </div>
  );
};

const ApplicationsTrendChart = ({ data }) => {
  const { isDark } = useTheme();
  const gridColor = isDark ? 'rgba(255,255,255,0.08)' : '#e6e9f0';
  const textColor = isDark ? '#9ca3af' : '#6b7280';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white dark:bg-gray-900 rounded-xl border border-border-subtle dark:border-white/10 p-5"
    >
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        Applications — Last 14 Days
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: textColor }}
            axisLine={{ stroke: gridColor }}
            tickLine={false}
            interval={1}
          />
          <YAxis
            tick={{ fontSize: 11, fill: textColor }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{ fill: isDark ? 'rgba(255,255,255,0.04)' : '#f6f8fb' }} />
          <Bar dataKey="applications" fill="#4f6ef7" radius={[6, 6, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ApplicationsTrendChart;