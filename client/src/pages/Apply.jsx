// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { GraduationCap, CheckCircle2, Loader2 } from 'lucide-react';
// import api from '../services/api';

// const ROLES = [
//   'Frontend Developer Intern',
//   'Backend Developer Intern',
//   'Full Stack Developer Intern',
//   'UI/UX Design Intern',
//   'Data Analyst Intern',
// ];

// const Apply = () => {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     college: '',
//     course: '',
//     internshipRole: ROLES[0],
//     skills: '',
//     resumeUrl: '',
//     portfolioUrl: '',
//     coverLetter: '',
//   });
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSubmitting(true);
//     try {
//       await api.post('/applications', {
//         ...form,
//         skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
//       });
//       setSuccess(true);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Submission failed. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const inputClass =
//     'w-full px-3.5 py-2.5 rounded-lg border border-border-subtle bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition';

//   if (success) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-violet-50 px-4">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="max-w-md text-center bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-8 shadow-xl"
//         >
//           <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">Application Submitted!</h2>
//           <p className="text-sm text-gray-500">
//             Thank you for applying to MamRaj Nexus Academy. Our team will review your application
//             and get back to you soon.
//           </p>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-violet-50 py-12 px-4">
//       <div className="max-w-2xl mx-auto">
//         <div className="text-center mb-8">
//           <div className="h-12 w-12 rounded-xl bg-brand-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-500/30">
//             <GraduationCap className="h-6 w-6 text-white" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900">Apply for an Internship</h1>
//           <p className="text-sm text-gray-500 mt-1">MamRaj Nexus Academy</p>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4"
//         >
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <input required placeholder="Full Name" value={form.name} onChange={handleChange('name')} className={inputClass} />
//             <input required type="email" placeholder="Email" value={form.email} onChange={handleChange('email')} className={inputClass} />
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <input required placeholder="Phone" value={form.phone} onChange={handleChange('phone')} className={inputClass} />
//             <select value={form.internshipRole} onChange={handleChange('internshipRole')} className={inputClass}>
//               {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
//             </select>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <input required placeholder="College" value={form.college} onChange={handleChange('college')} className={inputClass} />
//             <input required placeholder="Course (e.g. B.Tech CSE)" value={form.course} onChange={handleChange('course')} className={inputClass} />
//           </div>
//           <input placeholder="Skills (comma separated)" value={form.skills} onChange={handleChange('skills')} className={inputClass} />
//           <input
//             required
//             placeholder="Resume Link (Google Drive, Dropbox, etc.)"
//             value={form.resumeUrl}
//             onChange={handleChange('resumeUrl')}
//             className={inputClass}
//           />
//           <input placeholder="Portfolio Link (optional)" value={form.portfolioUrl} onChange={handleChange('portfolioUrl')} className={inputClass} />
//           <textarea
//             placeholder="Cover Letter (optional)"
//             rows={4}
//             value={form.coverLetter}
//             onChange={handleChange('coverLetter')}
//             className={inputClass}
//           />

//           {error && <p className="text-sm text-status-rejected bg-red-50 rounded-lg px-3 py-2">{error}</p>}

//           <button
//             type="submit"
//             disabled={submitting}
//             className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold py-3 rounded-lg shadow-lg shadow-brand-500/25 transition disabled:opacity-60"
//           >
//             {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
//             {submitting ? 'Submitting...' : 'Submit Application'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Apply;