import React, { useEffect, useState } from 'react';
import CheckIcon from './icons/CheckIcon';
import { User } from '../App';
import { supabase } from '../src/lib/supabase';

const StatCard: React.FC<{ label: string, value: string, trend?: string }> = ({ label, value, trend }) => (
  <div className="bg-surface border border-white/5 p-6 rounded-lg">
    <div className="text-[10px] font-bold text-text-disabled uppercase tracking-widest mb-1">{label}</div>
    <div className="flex items-baseline gap-3">
      <div className="text-3xl font-heading font-bold text-text-primary">{value}</div>
      {trend && <div className="text-[10px] text-accent font-bold">{trend}</div>}
    </div>
  </div>
);

const Dashboard: React.FC<{ onBackToHome: () => void, user: User | null }> = ({ onBackToHome, user }) => {
  const [profile, setProfile] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProgress, setUserProgress] = useState<any[]>([]);
  const [stats, setStats] = useState({
    completedLabs: 0,
    totalXP: 0,
    activeStreak: 0
  });
  const [skills, setSkills] = useState([
    { skill: 'Offensive', level: 0 },
    { skill: 'Networking', level: 0 },
    { skill: 'Forensics', level: 0 },
    { skill: 'Security Ops', level: 0 },
  ]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Dashboard - Current session:', session);

        if (!session) {
          console.log('No session found, redirecting...');
          onBackToHome();
          return;
        }

        setIsAuthenticated(true);

        // Add a small delay to ensure profile is created
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Fetch profile for the authenticated user
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        console.log('Dashboard - Profile data:', profile);
        console.log('Dashboard - Profile error:', error);

        if (error) {
          console.error('Error fetching profile:', error);
          // Try to create profile if it doesn't exist
          if (error.code === 'PGRST116') {
            console.log('Profile not found, creating new profile...');
            const userName = session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Operator';
            const { data: newProfile, error: createError } = await supabase
              .from("profiles")
              .insert({
                id: session.user.id,
                name: userName,
                role: "student"
              })
              .select()
              .single();
            
            if (!createError && newProfile) {
              console.log('New profile created:', newProfile);
              setProfile(newProfile);
            }
          }
        } else if (profile) {
          setProfile(profile);
        }

        // Fetch user progress
        const { data: progress, error: progressError } = await supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", session.user.id);

        console.log('User progress:', progress);
        console.log('Progress error:', progressError);

        if (progress) {
          setUserProgress(progress);
          
          // Calculate stats
          const completed = progress.filter(p => p.completed).length;
          const totalXP = progress.reduce((sum, p) => sum + (p.score || 0), 0);
          
          setStats({
            completedLabs: completed,
            totalXP: totalXP,
            activeStreak: 0
          });

          // Calculate skill levels based on progress
          // Example: map module_id to skill categories
          const skillProgress = {
            'Offensive': 0,
            'Networking': 0,
            'Forensics': 0,
            'Security Ops': 0
          };

          progress.forEach(p => {
            const moduleId = p.module_id?.toLowerCase() || '';
            if (moduleId.includes('offensive') || moduleId.includes('pentest')) {
              skillProgress['Offensive'] += p.completed ? 25 : 10;
            } else if (moduleId.includes('network')) {
              skillProgress['Networking'] += p.completed ? 25 : 10;
            } else if (moduleId.includes('forensic')) {
              skillProgress['Forensics'] += p.completed ? 25 : 10;
            } else if (moduleId.includes('soc') || moduleId.includes('security')) {
              skillProgress['Security Ops'] += p.completed ? 25 : 10;
            }
          });

          setSkills([
            { skill: 'Offensive', level: Math.min(skillProgress['Offensive'], 100) },
            { skill: 'Networking', level: Math.min(skillProgress['Networking'], 100) },
            { skill: 'Forensics', level: Math.min(skillProgress['Forensics'], 100) },
            { skill: 'Security Ops', level: Math.min(skillProgress['Security Ops'], 100) },
          ]);
        }

      } catch (error) {
        console.error('Auth check error:', error);
        onBackToHome();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [onBackToHome]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text-secondary">Verifying credentials...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-8 pb-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="font-heading text-3xl font-bold text-text-primary tracking-tight">
              Welcome back, {profile?.name || 'Loading...'}
            </h1>
            <p className="text-text-secondary text-sm mt-1">
              Role: <span className="text-accent">{profile?.role || 'student'}</span> | 
              Status: <span className="text-green-500 animate-pulse">ACTIVE</span>
            </p>
          </div>
          <button 
            onClick={onBackToHome}
            className="text-xs font-bold text-text-disabled hover:text-text-primary transition-colors flex items-center gap-2 py-2 px-4 border border-text-disabled/20 rounded uppercase tracking-widest"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Portal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            label="Completed Labs" 
            value={stats.completedLabs.toString()} 
            trend={stats.completedLabs > 0 ? `+${stats.completedLabs} completed` : "Start learning"} 
          />
          <StatCard 
            label="Current Rank" 
            value={stats.completedLabs > 0 ? `#${10000 - (stats.completedLabs * 100)}` : "Unranked"} 
            trend={stats.completedLabs > 0 ? "Top 15%" : "Complete labs to rank"} 
          />
          <StatCard 
            label="Skill Points" 
            value={stats.totalXP.toLocaleString()} 
            trend={stats.totalXP > 0 ? `+${stats.totalXP} XP` : undefined}
          />
          <StatCard 
            label="Active Streaks" 
            value={`${stats.activeStreak} Days`} 
            trend={stats.activeStreak > 0 ? "Keep it up!" : "Start today!"} 
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-heading text-xl font-bold text-text-primary tracking-tight">
                  {userProgress.length > 0 ? 'Continue Learning' : 'Start Your Journey'}
                </h2>
                <button className="text-[10px] font-bold text-accent uppercase tracking-widest hover:underline">View All</button>
              </div>
              
              {userProgress.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {userProgress.slice(0, 2).map((progress, i) => (
                    <div key={progress.id} className="bg-surface border border-white/5 rounded-lg overflow-hidden group hover:border-accent/30 transition-all">
                      <div className="h-32 bg-surface-soft relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60"></div>
                        <div className="absolute bottom-4 left-4">
                          <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest ${
                            progress.completed 
                              ? 'bg-green-500/20 border border-green-500/30 text-green-500' 
                              : 'bg-accent/20 border border-accent/30 text-accent'
                          }`}>
                            {progress.completed ? 'Completed' : 'In Progress'}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-text-primary mb-2">{progress.module_id}</h3>
                        <div className="w-full bg-background h-1.5 rounded-full mb-4">
                          <div className="bg-accent h-full rounded-full" style={{ width: progress.completed ? '100%' : '50%' }}></div>
                        </div>
                        <button className="w-full py-2 bg-surface-soft border border-text-disabled/20 rounded text-[11px] font-bold uppercase tracking-widest hover:bg-accent hover:text-background transition-all">
                          {progress.completed ? 'Review' : 'Resume'} Session
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-surface border border-white/5 rounded-lg p-8 text-center">
                  <p className="text-text-secondary mb-4">No labs started yet. Begin your cybersecurity journey!</p>
                  <button className="px-6 py-3 bg-accent text-background font-bold rounded text-xs uppercase tracking-widest">
                    Browse Labs
                  </button>
                </div>
              )}
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-text-primary tracking-tight mb-6">Recent Activity Log</h2>
              <div className="bg-surface border border-white/5 rounded-lg divide-y divide-white/5 font-mono text-[11px]">
                {userProgress.length > 0 ? (
                  userProgress.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="p-4 flex justify-between items-center text-text-secondary hover:bg-white/5 transition-colors">
                      <div className="flex gap-4">
                        <span className="text-accent/60">[{new Date(item.created_at).toLocaleDateString()}]</span>
                        <span>
                          {item.completed ? 'Completed' : 'Started'}: <span className="text-text-primary">{item.module_id}</span>
                        </span>
                      </div>
                      <div className="text-accent">+{item.score || 0} XP</div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-text-disabled text-xs">
                    No activity yet. Start a lab to see your progress here!
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-surface border border-white/5 rounded-lg p-6">
              <h2 className="font-heading text-lg font-bold text-text-primary mb-4">Skill Matrix</h2>
              {stats.completedLabs > 0 ? (
                <div className="space-y-4">
                  {skills.map((s) => (
                    <div key={s.skill}>
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
                        <span className="text-text-disabled">{s.skill}</span>
                        <span className="text-accent">{s.level}%</span>
                      </div>
                      <div className="w-full bg-background h-1 rounded-full overflow-hidden">
                        <div className="bg-accent h-full transition-all duration-500" style={{ width: `${s.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-xs text-text-disabled mb-2">No skills tracked yet</p>
                  <p className="text-[10px] text-text-disabled/60">Complete labs to build your skill matrix</p>
                </div>
              )}
            </section>

            <section className="bg-surface border border-white/5 rounded-lg p-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-accent/10 transition-colors"></div>
               <h2 className="font-heading text-lg font-bold text-text-primary mb-2">Upgrade to PRO</h2>
               <p className="text-xs text-text-secondary mb-4 leading-relaxed">Access 200+ exclusive labs and advanced career tracks.</p>
               <button className="w-full py-3 bg-accent text-background font-bold rounded text-xs uppercase tracking-widest shadow-lg shadow-accent/20">Go Pro Today</button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
