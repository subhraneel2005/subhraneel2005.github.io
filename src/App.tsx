import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { profile, stats, projects, socials, experience, skills } from './data';
import { 
  Github, 
  Linkedin, 
  Share2, 
  Grid3X3, 
  Clapperboard, 
  Play, 
  Home,
  ExternalLink,
  Briefcase,
  UserPlus
} from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = React.useState<'feed' | 'links'>('feed');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: profile.name,
          text: profile.bio,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      alert('Link copied to clipboard!');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-black lg:bg-neutral-900 lg:py-6 font-sans selection:bg-pink-500/30">
      {/* Container Shell */}
      <div className="mobile-container overflow-hidden lg:max-w-[1000px] lg:rounded-[2.5rem] lg:border lg:border-neutral-800 lg:h-[85vh] lg:my-auto">
        
        {/* SIDEBAR FOR DESKTOP / TOP FOR MOBILE */}
        <div className="w-full lg:w-[380px] lg:h-full lg:overflow-y-auto lg:border-r lg:border-neutral-900 bg-black flex flex-col shrink-0">
          {/* Header Area */}
          <header className="px-5 pt-8 pb-4 sticky top-0 lg:static z-50 bg-black">
            <div className="flex justify-between items-center mb-6">
              <span className="font-extrabold text-xl tracking-tight">{profile.username}</span>
              <div className="flex gap-4">
                <Share2 className="w-6 h-6 cursor-pointer hover:text-white/60 transition-colors" onClick={handleShare} />
              </div>
            </div>

            <div className="flex gap-8 lg:flex-col lg:items-start lg:gap-4 items-center mb-6">
              <div className="gradient-avatar">
                <div className="w-[86px] h-[86px] lg:w-24 lg:h-24 rounded-full border-[3px] border-black overflow-hidden bg-neutral-900">
                  <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              
              <div className="flex-1 flex justify-between px-2 lg:px-0 lg:w-full lg:justify-start lg:gap-8 lg:mt-2">
                {stats.map(stat => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <p className="font-extrabold text-lg lg:text-xl">{stat.value}</p>
                    <p className="text-[11px] font-medium text-neutral-400 capitalize">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="font-bold text-sm tracking-tight lg:text-base">{profile.name}</p>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-900 rounded-md mt-1 border border-white/5">
                  <Briefcase className="w-3 h-3 text-blue-400" />
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{profile.title}</span>
                </div>
                <p className="text-sm mt-2 font-medium text-white/80 leading-relaxed max-w-[90%]">
                  {profile.bio}
                </p>
              </div>

              {/* TikTok Style Buttons */}
              <div className="flex gap-2 pt-2 lg:pt-4">
                <a 
                  href={`mailto:${profile.email}`}
                  className="flex-1 h-9 bg-neutral-800 hover:bg-neutral-700 active:scale-95 transition-all text-sm font-bold rounded-lg flex items-center justify-center gap-2"
                >
                  Hire Me
                </a>
                <a 
                  href={socials.find(s => s.name === 'GitHub')?.url}
                  target="_blank"
                  className="flex-1 h-9 bg-white text-black active:scale-95 transition-all text-sm font-bold rounded-lg flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Follow
                </a>
              </div>
            </div>
          </header>

          {/* Highlights Section */}
          <section className="px-5 py-4 overflow-x-auto spotify-scroll flex lg:grid lg:grid-cols-2 gap-4 bg-black lg:mt-auto lg:pb-8">
            {socials.map(social => (
              <a 
                key={social.name} 
                href={social.url} 
                target="_blank" 
                className="flex flex-col items-center lg:flex-row lg:bg-neutral-900 lg:p-3 lg:rounded-xl lg:border lg:border-white/5 gap-1.5 lg:gap-3 shrink-0 group transition-all hover:bg-neutral-800"
              >
                <div className="w-16 h-16 lg:w-8 lg:h-8 rounded-full border-[1.5px] border-neutral-800 lg:border-0 p-1 lg:p-0 flex items-center justify-center group-hover:border-neutral-400 transition-colors">
                  <div className="w-full h-full lg:w-auto lg:h-auto bg-neutral-900 lg:bg-transparent rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                    <social.icon className="w-6 h-6 lg:w-4 lg:h-4 text-white/80" />
                  </div>
                </div>
                <span className="text-[10px] lg:text-xs font-bold text-neutral-500 group-hover:text-white transition-colors">{social.name}</span>
              </a>
            ))}
          </section>
        </div>

        {/* FEED / CONTENT AREA */}
        <div className="flex-1 flex flex-col min-h-0 bg-black">
          {/* Tab Selection */}
          <div className="flex border-b border-neutral-900 bg-black sticky top-[160px] lg:top-0 z-40">
            <button 
              onClick={() => setActiveTab('feed')}
              className={cn(
                "flex-1 flex justify-center py-3 border-b-2 transition-colors",
                activeTab === 'feed' ? "border-white text-white" : "border-transparent text-neutral-500"
              )}
            >
              <Grid3X3 className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setActiveTab('links')}
              className={cn(
                "flex-1 flex justify-center py-3 border-b-2 transition-colors",
                activeTab === 'links' ? "border-white text-white" : "border-transparent text-neutral-500"
              )}
            >
              <Clapperboard className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto spotify-scroll" ref={scrollRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="p-4 md:p-8 space-y-6 pb-24"
              >
                {activeTab === 'feed' ? (
                  <>
                    <div className="flex items-center justify-between px-1 mb-2">
                      <h2 className="text-xl font-black tracking-tighter">Featured Projects</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {projects.map((project, i) => (
                        <motion.a
                          key={project.id}
                          href={project.github}
                          target="_blank"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="group block relative bg-[#121212] rounded-2xl border border-white/5 overflow-hidden hover:border-white/20 transition-all shadow-xl"
                        >
                          <div className="aspect-video w-full bg-neutral-900 relative">
                             <img 
                               src={project.image} 
                               alt={project.title} 
                               className="w-full h-full object-contain"
                               referrerPolicy="no-referrer"
                             />
                             <div className="absolute inset-0 bg-black/5" />
                             <div className="absolute bottom-4 right-4 w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                               <Play className="w-5 h-5 text-black" fill="black" />
                             </div>
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-extrabold text-lg tracking-tight group-hover:text-[#1DB954] transition-colors">{project.title}</h3>
                              <ExternalLink className="w-4 h-4 opacity-40" />
                            </div>
                            <p className="text-white/60 text-sm font-medium leading-relaxed mb-4">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                               {project.tags.map(t => (
                                 <span key={t} className="text-[10px] font-black uppercase text-white/30 tracking-tight border border-white/5 px-2 py-0.5 rounded">#{t}</span>
                               ))}
                            </div>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                       <h2 className="text-xl font-black tracking-tighter px-1">Experience</h2>
                       {experience.map((exp, i) => (
                         <div key={i} className="bg-neutral-900/50 p-4 rounded-xl border border-white/5">
                           <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-sm tracking-tight capitalize">{exp.role}</h3>
                              <span className="text-[9px] text-white/20 font-bold uppercase tracking-widest">{exp.period}</span>
                           </div>
                           <p className="text-blue-400 font-bold text-[11px] mb-2">@ {exp.company}</p>
                           <p className="text-[11px] text-white/50 leading-relaxed">{exp.description}</p>
                         </div>
                       ))}
                     </div>

                     <div className="space-y-6">
                       <h2 className="text-xl font-black tracking-tighter px-1">Technical Arsenal</h2>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                         {skills.map((skill, i) => (
                           <div key={skill} className="bg-neutral-900 border border-white/5 px-3 py-2.5 rounded-lg flex items-center gap-2 active:scale-95 transition-transform hover:bg-neutral-800">
                             <div className="w-1 h-1 rounded-full bg-[#1DB954]" />
                             <span className="font-bold text-[10px] tracking-tight truncate">{skill}</span>
                           </div>
                         ))}
                       </div>
                     </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* BOTTOM NAV FOR MOBILE ONLY */}
        <nav className="lg:hidden h-[80px] bg-black/95 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-8 shrink-0">
          <button 
            onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center gap-1 group"
          >
            <Home className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-bold">Home</span>
          </button>
          
          <a href="https://github.com/subhraneel2005" target="_blank" className="flex flex-col items-center gap-1 group text-white/50 hover:text-white transition-colors">
            <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-bold">Code</span>
          </a>

          <a href="https://linkedin.com/in/subhraneel" target="_blank" className="flex flex-col items-center gap-1 group text-white/50 hover:text-white transition-colors">
            <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-bold">Connect</span>
          </a>

          <a href={`mailto:${profile.email}`} className="flex flex-col items-center gap-1 group text-white/50 hover:text-white transition-colors">
             <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white transition-colors group-hover:scale-110">
                <img src={profile.avatar} className="w-full h-full object-cover" />
             </div>
             <span className="text-[9px] font-bold tracking-tight">Contact</span>
          </a>
        </nav>

      </div>
    </div>
  );
}
