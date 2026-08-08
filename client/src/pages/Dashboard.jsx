import { useEffect, useState } from 'react';
import {
  Users,
  Clock,
  Search,
  Star,
  CalendarCheck,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { getStats } from '../services/applicationService';
import StatCard from '../components/dashboard/StatCard';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (err) {
        setError('Failed to load dashboard stats.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = stats
    ? [
        { label: 'Total Applications', value: stats.total, icon: Users, accent: '#4f6ef7' },
        { label: 'Pending', value: stats.Pending, icon: Clock, accent: '#f59e0b' },
        { label: 'Under Review', value: stats['Under Review'], icon: Search, accent: '#3b82f6' },
        { label: 'Shortlisted', value: stats.Shortlisted, icon: Star, accent: '#8b5cf6' },
        {
          label: 'Interview Scheduled',
          value: stats['Interview Scheduled'],
          icon: CalendarCheck,
          accent: '#06b6d4',
        },
        { label: 'Selected', value: stats.Selected, icon: CheckCircle2, accent: '#10b981' },
        { label: 'Rejected', value: stats.Rejected, icon: XCircle, accent: '#ef4444' },
      ]
    : [];

 if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-xl bg-white dark:bg-gray-900 border border-border-subtle dark:border-white/10 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-status-rejected">{error}</p>;
  }

return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <StatCard key={card.label} {...card} delay={i * 0.04} />
        ))}
      </div>
    </div>
  );
};
export default Dashboard;