import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  ArrowRight,
  LayoutDashboard,
  SlidersHorizontal,
  StickyNote,
  ShieldCheck,
  BarChart3,
  Download,
  Moon,
  CheckCircle2,
} from 'lucide-react';

const features = [
  {
    icon: LayoutDashboard,
    title: 'Real-Time Overview',
    desc: 'A live pulse on every stage of your pipeline — from the moment a student applies to the day they\u2019re selected.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Search, Filter & Sort',
    desc: 'Find any candidate in seconds. Filter by role or status, search by name or email, sort by date — all instantly.',
  },
  {
    icon: StickyNote,
    title: 'Collaborative Notes',
    desc: 'Leave timestamped notes on any candidate so your whole team stays aligned during review calls.',
  },
  {
    icon: BarChart3,
    title: 'Built-In Analytics',
    desc: 'Visual trends on application volume and status distribution — no spreadsheets, no manual counting.',
  },
  {
    icon: Download,
    title: 'One-Click CSV Export',
    desc: 'Export filtered candidate lists for offline review, reporting, or sharing with faculty.',
  },
  {
    icon: ShieldCheck,
    title: 'Invite-Only Access',
    desc: 'JWT-secured, role-based admin accounts. Only people you personally invite can ever sign in.',
  },
];

const steps = [
  { step: '01', title: 'Candidates Apply', desc: 'Students submit their details, resume link, and portfolio through a simple public form.' },
  { step: '02', title: 'Admins Review', desc: 'Your team searches, filters, and reviews applications from one clean dashboard.' },
  { step: '03', title: 'Track & Decide', desc: 'Move candidates through statuses, leave notes, and export shortlists — all in one place.' },
];

const stats = [
  { value: '6', label: 'Status Stages Tracked' },
  { value: '100%', label: 'Data Stays in Your DB' },
  { value: '<1s', label: 'Search & Filter Speed' },
];

const Landing = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-violet-50">
      {/* Decorative gradient blobs */}
      <div className="absolute top-[-10%] left-[-10%] h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" />
      <div className="absolute top-[20%] right-[-10%] h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />
      <div className="absolute bottom-[10%] left-[20%] h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 h-20 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-gray-900 text-sm">MamRaj Nexus Academy</p>
            <p className="text-[11px] text-gray-400">Admin Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm font-medium text-white bg-brand-500 hover:bg-brand-600 rounded-lg shadow-lg shadow-brand-500/25 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-6 pt-16 sm:pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/60 text-xs font-medium text-brand-700 mb-6"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Built for MamRaj Nexus Academy Internship Program
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.08]"
        >
          Manage applications. Track candidates.
          <br />
          <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-violet-600 bg-clip-text text-transparent">
            Build your team.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          From the first application to the final offer, this dashboard gives your team a single,
          fast, and secure home for reviewing, discussing, and deciding on every candidate —
          replacing scattered spreadsheets and email threads for good.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            to="/signup"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold shadow-xl shadow-brand-500/30 transition-colors w-full sm:w-auto justify-center"
          >
            Create Admin Account
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl bg-white/70 backdrop-blur-md border border-white/60 text-gray-700 text-sm font-semibold hover:bg-white transition-colors w-full sm:w-auto text-center"
          >
            Sign In
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 text-xs text-gray-400"
        >
          Registration is invite-only — you'll need an invite code from an existing admin.
        </motion.p>
      </div >


    
{/* Product Preview Section */}
```jsx
<div className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-violet-50">

  {/* Dot grid texture so gradient areas don't look empty */}
  <div
    className="absolute inset-0 opacity-[0.4]"
    style={{
      backgroundImage:
        'radial-gradient(circle, #c7d2fe 1px, transparent 1px)',
      backgroundSize: '24px 24px',
    }}
  />

  {/* Decorative gradient blobs */}
  <div className="absolute top-[-15%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-brand-400/30 blur-[100px]" />

  <div className="absolute top-[15%] right-[-15%] h-[28rem] w-[28rem] rounded-full bg-violet-400/30 blur-[100px]" />

  <div className="absolute bottom-[5%] left-[15%] h-80 w-80 rounded-full bg-cyan-300/20 blur-[100px]" />

  {/* Product preview mockup */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
    className="relative z-10 max-w-4xl mx-auto px-6 pb-12"
  >

    {/* Fake browser chrome */}
    <div className="rounded-2xl overflow-hidden bg-white shadow-2xl shadow-gray-300/40 border border-white/70">

      {/* Browser top bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50/90 border-b border-gray-200">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-400" />

        <div className="ml-4 flex-1 max-w-md mx-auto h-7 rounded-md bg-white border border-gray-200 flex items-center justify-center">
          <span className="text-[10px] text-gray-400">
            mamraj-nexus.com/dashboard
          </span>
        </div>
      </div>

      {/* Fake dashboard content */}
      <div className="p-5 sm:p-7 bg-gray-50/60">

        {/* Dashboard heading */}
        <div className="mb-5">
          <p className="text-xs text-gray-400">
            Admin Dashboard
          </p>

          <h3 className="text-lg font-semibold text-gray-900">
            Application Overview
          </h3>
        </div>

        {/* Dashboard stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
            { label: 'Total', value: '128', color: '#4f6ef7' },
            { label: 'Pending', value: '42', color: '#f59e0b' },
            { label: 'Shortlisted', value: '18', color: '#8b5cf6' },
            { label: 'Selected', value: '9', color: '#10b981' },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
            >
              <div
                className="h-6 w-6 rounded mb-2"
                style={{
                  backgroundColor: `${s.color}22`,
                }}
              />

              <p className="text-xl font-bold text-gray-900">
                {s.value}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Recent applications */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">

          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800">
              Recent Applications
            </p>
          </div>

          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 border-b last:border-b-0 border-gray-100"
            >

              <div className="flex items-center gap-3">

                <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center">
                  <span className="text-xs font-medium text-brand-600">
                    {String.fromCharCode(64 + i)}
                  </span>
                </div>

                <div>
                  <div className="h-2.5 w-28 bg-gray-200 rounded mb-1.5" />
                  <div className="h-2 w-20 bg-gray-100 rounded" />
                </div>

              </div>

              <div className="h-6 w-16 rounded-full bg-brand-50" />

            </div>
          ))}

        </div>

      </div>
    </div>

  </motion.div>

  {/* Stats strip */}
  <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16">

    <div className="grid grid-cols-3 divide-x divide-gray-200/60 rounded-2xl bg-white/50 backdrop-blur-md border border-white/60 py-6">

      {stats.map((s) => (
        <div
          key={s.label}
          className="text-center px-2"
        >
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            {s.value}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            {s.label}
          </p>
        </div>
      ))}

    </div>

  </div>

</div>




      {/* Features */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Everything admins actually need</h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            No bloated CRM, no unnecessary complexity — just the tools your team needs to move candidates forward.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: 0.06 * i }}
              className="rounded-2xl p-5 bg-white/60 backdrop-blur-xl border border-white/60 shadow-lg shadow-gray-200/50 hover:-translate-y-1 hover:shadow-xl transition-all"
            >
              <span className="h-10 w-10 rounded-xl bg-brand-500/10 flex items-center justify-center mb-3">
                <Icon className="h-5 w-5 text-brand-600" />
              </span>
              <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">How it works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="relative"
            >
              <span className="text-5xl font-bold text-brand-100">{s.step}</span>
              <h3 className="text-sm font-semibold text-gray-900 mt-2 mb-1.5">{s.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust / dark mode callout */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
        <div className="rounded-2xl bg-gray-900 text-white p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] h-56 w-56 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Moon className="h-4 w-4 text-brand-400" />
                <span className="text-xs font-medium text-brand-400">Dark Mode Included</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Comfortable for late-night review sessions</h3>
              <p className="text-sm text-gray-400 max-w-md">
                Switch themes instantly from Settings. Your preference is remembered every time you sign in.
              </p>
            </div>
            <ul className="space-y-2 text-sm text-gray-300 shrink-0">
              {['JWT-secured sessions', 'Invite-only registration', 'Role-based permissions'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pb-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Ready to get started?</h2>
        <p className="text-gray-500 mb-6">Set up your admin account and start reviewing applications in minutes.</p>
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold shadow-xl shadow-brand-500/30 transition-colors"
        >
          Create Admin Account
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/60 py-8 text-center">
        <p className="text-xs text-gray-400">
          MamRaj Nexus Academy — An Initiative by MamRaj Web Studio
        </p>
        <p className="text-xs text-gray-300 mt-1">
          Built with React, Node.js, Express & MongoDB
        </p>
      </footer>
    </div>
  );
};

export default Landing;