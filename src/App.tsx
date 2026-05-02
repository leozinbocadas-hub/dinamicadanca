/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LogIn,
  LayoutDashboard,
  BookOpen,
  Trophy,
  Gift,
  LogOut,
  Search,
  CheckCircle2,
  Lock,
  Star,
  Music,
  Heart,
  ChevronRight,
  Download,
  Printer,
  X,
  Menu
} from "lucide-react";
import certBg from './certificado.png';
import profilePhoto from './favicon.png';
import { cn } from "@/src/lib/utils";
import { Dynamic, User, CourseProgress } from "./types";
import { MOCK_DYNAMICS, MOCK_BONUSES, APP_NAME } from "./constants";
import confetti from "canvas-confetti";
import { supabase } from "./supabaseClient";

// --- Components ---

const Sparkles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full bg-yellow-400 opacity-60"
        initial={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          scale: 0
        }}
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 0.6, 0]
        }}
        transition={{
          duration: 2 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 2
        }}
      />
    ))}
  </div>
);

const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode, icon?: any }) => (
  <div className="flex items-center gap-3 mb-6 md:mb-8">
    {Icon && (
      <div className="p-2.5 md:p-3 bg-rosa-primary/10 rounded-xl md:rounded-2xl text-rosa-primary">
        <Icon size={20} className="md:w-6 md:h-6" />
      </div>
    )}
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 title-sparkle">{children}</h2>
  </div>
);

// --- Pages ---

const LoginScreen = ({ onLogin }: { onLogin: (user: User) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tentando login com:", email);
    setLoading(true);
    setError("");
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error("Erro Auth:", authError);
        throw authError;
      }

      console.log("Auth sucesso, buscando perfil...");

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError) {
        console.error("Erro Perfil:", profileError);
        throw profileError;
      }

      console.log("Perfil encontrado:", profile);

      onLogin({
        id: profile.id,
        name: profile.full_name,
        email: profile.email,
        role: profile.role,
        plan: profile.plan
      });
    } catch (err: any) {
      console.error("Erro Geral:", err);
      setError(err.message || "Erro ao entrar. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-50 relative overflow-hidden">
      <Sparkles />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-6 md:p-8 glass-card relative z-10 mx-4"
      >
        <div className="flex justify-center mb-12">
          <img
            src="https://i.ibb.co/zHhtk1h3/image.png"
            alt="Logo"
            className="h-44 md:h-56 object-contain"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2 ml-4 uppercase tracking-wider">Usuário</label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-3 md:py-4 rounded-full border-2 border-pink-100 focus:border-rosa-primary outline-none transition-all"
              placeholder="Seu nome de usuário"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2 ml-4 uppercase tracking-wider">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-3 md:py-4 rounded-full border-2 border-pink-100 focus:border-rosa-primary outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          {error && (
            <div className="bg-red-50 text-red-500 text-xs p-3 rounded-xl border border-red-100 text-center animate-pulse">
              {error}
            </div>
          )}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary py-3 md:py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Entrando..." : "Entrar no Mundo"} <LogIn size={20} />
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-400">
          Esqueceu sua senha mágica?
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -left-20 w-64 h-64 bg-rosa-primary/10 rounded-full blur-3xl opacity-50"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -right-20 w-80 h-80 bg-roxo-primary/10 rounded-full blur-3xl opacity-50"
      />
    </div>
  );
};

const PDFViewer = ({ dynamic, onClose, onComplete, isMobile }: { dynamic: Dynamic, onClose: () => void, onComplete: () => void, isMobile: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay p-4 md:p-0"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="modal-content w-full h-[90vh] md:h-[88vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 md:p-6 flex items-center justify-between bg-white border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rosa-primary/10 rounded-lg text-rosa-primary hidden sm:block">
              <BookOpen size={20} />
            </div>
            <h3 className="text-sm md:text-xl font-bold text-gray-800 truncate max-w-[150px] md:max-w-md">
              {dynamic.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            {!isMobile && (
              <button
                onClick={() => {
                  const iframe = document.getElementById('pdf-iframe') as HTMLIFrameElement;
                  if (iframe && iframe.contentWindow) {
                    iframe.contentWindow.focus();
                    iframe.contentWindow.print();
                  }
                }}
                className="p-2 md:px-4 md:py-2 text-gray-500 hover:text-rosa-primary transition-colors flex items-center gap-2 font-bold"
              >
                <Printer size={20} /> <span className="hidden md:inline">Imprimir</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 bg-gray-100 hover:bg-rosa-primary hover:text-white rounded-full transition-all"
            >
              <X size={20} md:size={24} />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white relative overflow-hidden no-scrollbar flex flex-col items-center justify-center">
          {isMobile ? (
            <div className="text-center p-6 flex flex-col items-center gap-6">
              <div className="p-8 bg-rosa-primary/10 rounded-full text-rosa-primary">
                <BookOpen size={48} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Pronto para ler!</h4>
                <p className="text-gray-500 mb-6">Em dispositivos móveis, o material deve ser aberto em uma nova aba para melhor visualização.</p>
              </div>
              <a 
                href={dynamic.pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary w-full px-12 py-4 flex items-center justify-center gap-2"
              >
                Abrir Material <ChevronRight size={20} />
              </a>
            </div>
          ) : (
            <iframe
              id="pdf-iframe"
              src={`${dynamic.pdfUrl}#toolbar=0&navpanes=0&view=FitH&scrollbar=0`}
              className="absolute inset-[-2px] w-[calc(100%+24px)] h-[calc(100%+4px)] border-none no-scrollbar pr-[20px]"
              title={dynamic.title}
              style={{ border: 'none', outline: 'none' }}
            />
          )}
        </div>

        <div className="p-4 md:p-8 bg-white border-t border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="hidden md:block">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Status da Dinâmica</p>
            <p className="text-sm font-medium text-gray-600">Complete para ganhar estrelas! ⭐</p>
          </div>
          <button
            onClick={() => {
              onComplete();
              onClose();
            }}
            className="btn-accent w-full md:w-auto px-12 py-3 md:py-4 text-sm md:text-base"
          >
            Concluir Dinâmica <CheckCircle2 size={18} md:size={20} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Certificate = ({ userName, completionDate }: { userName: string, completionDate: string }) => {
  const currentDate = new Date().toLocaleDateString('pt-BR');

  return (
    <div className="w-full max-w-5xl p-4 no-print">
      <div
        id="printable-certificate"
        className="relative w-full aspect-[1.414/1] bg-white shadow-2xl overflow-hidden rounded-lg"
      >
        {/* Background Image */}
        <img
          src={certBg}
          alt="Certificado Background"
          className="absolute inset-0 w-full h-full object-contain"
        />

        {/* Dynamic Text Overlays */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* User Name */}
          <div className="absolute top-[56%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[60%] text-center">
            <span className="text-xl sm:text-3xl md:text-4xl font-black text-roxo-primary font-serif italic tracking-tight">
              {userName}
            </span>
          </div>

          {/* Date */}
          <div className="absolute bottom-[16.5%] left-[34%] -translate-x-1/2 w-[20%] text-center">
            <span className="text-sm sm:text-xl font-bold text-gray-700">
              {completionDate}
            </span>
          </div>

          {/* Assinatura (Simulated) */}
          <div className="absolute bottom-[16.5%] left-[72%] -translate-x-1/2 w-[20%] text-center">
            <span className="text-sm sm:text-xl font-handwriting italic text-rosa-primary opacity-80">
              Coordenação +250
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={() => window.print()}
          className="btn-primary px-8 sm:px-12 py-4 sm:py-5 text-sm sm:text-base md:text-xl shadow-2xl hover:scale-105 transition-all"
        >
          <Printer size={28} /> Imprimir Certificado Personalizado
        </button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        .font-handwriting { font-family: 'Dancing Script', cursive; }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media print {
          @page { size: landscape; margin: 0; }
          .no-print { display: none !important; }
          body * { visibility: hidden; }
          #printable-certificate, #printable-certificate * { visibility: visible; }
          #printable-certificate { 
            position: fixed; 
            left: 0; top: 0; width: 100vw; height: 100vh;
            border: none;
            padding: 0;
            margin: 0;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}} />
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'dynamics' | 'certificate' | 'bonus'>('dashboard');
  const [dynamics, setDynamics] = useState<Dynamic[]>([]);
  const [loading, setLoading] = useState(true);
  const [completionDate, setCompletionDate] = useState<string>("");
  const [selectedDynamic, setSelectedDynamic] = useState<Dynamic | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    // Check session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchProfile(session.user.id);
      } else {
        setUser(null);
        setDynamics([]);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      setUser({
        id: profile.id,
        name: profile.full_name,
        email: profile.email,
        role: profile.role,
        plan: profile.plan
      });

      fetchData(userId);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setLoading(false);
    }
  };

  const fetchData = async (userId: string) => {
    try {
      // Fetch dynamics
      const { data: dynamicsData, error: dynamicsError } = await supabase
        .from('dynamics')
        .select('*')
        .order('created_at', { ascending: true });

      if (dynamicsError) throw dynamicsError;

      // Fetch progress
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('dynamic_id, completed_at')
        .eq('user_id', userId);

      if (progressError) throw progressError;

      const completedMap = new Map(progressData.map(p => [p.dynamic_id, p.completed_at]));
      
      const mappedDynamics = dynamicsData.map(d => ({
        id: d.id,
        title: d.title,
        description: d.description,
        category: d.category,
        pdfUrl: d.pdfUrl || d.pdf_url,
        thumbnailUrl: d.thumbnailUrl || d.thumbnail_url,
        completed: completedMap.has(d.id)
      }));

      setDynamics(mappedDynamics);

      // Set completion date if all are done
      if (mappedDynamics.length > 0 && mappedDynamics.every(d => d.completed)) {
        const lastDate = progressData.reduce((latest, current) => {
          return new Date(current.completed_at) > new Date(latest) ? current.completed_at : latest;
        }, progressData[0]?.completed_at);
        setCompletionDate(new Date(lastDate).toLocaleDateString('pt-BR'));
      }

    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const completedCount = dynamics.filter(d => d.completed).length;
  const progressPercent = dynamics.length > 0 ? Math.round((completedCount / dynamics.length) * 100) : 0;

  const handleComplete = async (id: string) => {
    if (!user) return;

    // Check if already completed to avoid duplicate inserts
    const isAlreadyCompleted = dynamics.find(d => d.id === id)?.completed;
    if (isAlreadyCompleted) return;

    try {
      const { error } = await supabase
        .from('user_progress')
        .insert({ user_id: user.id, dynamic_id: id });

      if (error) throw error;

      const updatedDynamics = dynamics.map(d => d.id === id ? { ...d, completed: true } : d);
      setDynamics(updatedDynamics);
      
      const allCompleted = updatedDynamics.every(d => d.completed);
      if (allCompleted) {
        setCompletionDate(new Date().toLocaleDateString('pt-BR'));
      }

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff00bf', '#aa00ff', '#ffbf00']
      });
    } catch (err) {
      console.error("Error marking completion:", err);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-rosa-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen bg-pink-50/50 flex flex-col md:flex-row relative">
      {/* Mobile Header */}
      <div className="md:hidden p-4 bg-white border-b border-pink-100 flex items-center justify-between sticky top-0 z-40">
        <img
          src="https://i.ibb.co/zHhtk1h3/image.png"
          alt="Logo"
          className="h-28 object-contain"
        />
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 bg-pink-50 text-rosa-primary rounded-lg"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isSidebarOpen || !isMobile ? 0 : -320,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={cn(
          "w-72 bg-white border-r border-pink-100 flex flex-col fixed md:sticky top-0 h-screen z-[60] md:translate-x-0 overflow-y-auto"
        )}
      >
        <div className="p-4 flex items-center justify-center">
          <img
            src="https://i.ibb.co/zHhtk1h3/image.png"
            alt="Logo"
            className="w-full h-auto object-contain"
          />
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-400 p-2 hover:bg-pink-50 rounded-full transition-colors"
            aria-label="Fecar menu"
          >
            <X size={28} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavItem
            icon={LayoutDashboard}
            label="Início"
            active={activeTab === 'dashboard'}
            onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
          />
          <NavItem
            icon={BookOpen}
            label="Dinâmicas"
            active={activeTab === 'dynamics'}
            onClick={() => { setActiveTab('dynamics'); setIsSidebarOpen(false); }}
          />
          <NavItem
            icon={Trophy}
            label="Meu Certificado"
            disabled={user.plan === 'basic' || progressPercent < 100}
            isLocked={user.plan === 'basic'}
            active={activeTab === 'certificate'}
            onClick={() => { setActiveTab('certificate'); setIsSidebarOpen(false); }}
          />
          <NavItem
            icon={Gift}
            label="Bônus Exclusivos"
            disabled={user.plan === 'basic'}
            isLocked={user.plan === 'basic'}
            active={activeTab === 'bonus'}
            onClick={() => { setActiveTab('bonus'); setIsSidebarOpen(false); }}
          />
        </nav>

        <div className="p-6">
          <div className="bg-white rounded-[32px] p-1 mb-6 shadow-xl shadow-rosa-primary/10 border border-pink-100 group">
            <div className="bg-gradient-to-br from-rosa-primary via-roxo-primary to-rosa-primary rounded-[30px] p-6 text-white relative overflow-hidden">
              <div className="flex justify-between items-end mb-4 relative z-10">
                <div>
                  <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em] block mb-1">Seu Brilho</span>
                  <span className="text-3xl font-black text-white drop-shadow-md">{progressPercent}%</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-white/60 uppercase">Estrelas</p>
                  <div className="flex items-center gap-1 text-amarelo-primary drop-shadow-md">
                    <Star size={16} className="fill-amarelo-primary" />
                    <span className="text-base font-black text-white">{completedCount}</span>
                  </div>
                </div>
              </div>

              <div className="relative h-5 bg-white/20 backdrop-blur-sm rounded-full p-1 shadow-inner overflow-hidden border border-white/30 z-10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="h-full rounded-full bg-amarelo-primary relative overflow-hidden shadow-lg shadow-amarelo-primary/30"
                >
                  <motion.div
                    animate={{ x: ['0%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg]"
                  />
                </motion.div>
              </div>

              {/* Goal Star Icon */}
              <motion.div
                className="absolute top-[64px] pointer-events-none z-20"
                animate={{ left: `calc(${progressPercent}% + 8px)` }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
              >
                <div className="relative">
                  <Star size={24} className="text-amarelo-primary fill-amarelo-primary filter drop-shadow-lg animate-bounce" />
                </div>
              </motion.div>

              {/* Background patterns */}
              <div className="absolute -right-6 -bottom-6 opacity-20 pointer-events-none group-hover:scale-110 transition-transform">
                <Music size={100} />
              </div>
              <div className="absolute -left-10 -top-10 opacity-10 pointer-events-none">
                <Star size={120} className="fill-white" />
              </div>
            </div>

            <p className="text-[10px] text-gray-500 py-3 text-center font-bold italic">
              {dynamics.length - completedCount === 0 ? "Você concluiu todas as dinâmicas! 🎉" : "Falta apenas 1 passo para o sucesso! 🩰"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-rosa-primary transition-colors hover:bg-pink-50 rounded-xl"
          >
            <LogOut size={20} /> <span className="font-medium">Sair</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 md:mb-12">
          <div>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Bem-vinda de volta!</h2>
            <p className="text-xl md:text-2xl font-bold text-gray-800 italic">Olá, {user.name}! ✨</p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none group">
              <div className="absolute inset-0 bg-gradient-to-r from-rosa-primary/10 to-roxo-primary/10 rounded-full blur-md opacity-20 group-focus-within:opacity-100 transition-opacity" />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-rosa-primary transition-colors z-10" size={18} />
              <input
                type="text"
                placeholder="Buscar dinâmica..."
                className="relative pl-12 pr-6 py-2.5 rounded-full bg-white border-2 border-pink-100 outline-none focus:border-rosa-primary w-full sm:w-72 transition-all shadow-sm focus:shadow-lg focus:shadow-rosa-primary/10 text-sm font-semibold text-gray-700 placeholder:text-gray-400"
              />
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-rosa-primary/20 overflow-hidden bg-rosa-primary/10 flex items-center justify-center shrink-0">
              <img src={profilePhoto} alt="Foto de Perfil" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8 md:space-y-12"
            >
              {/* Highlight Banner */}
              <div className="min-h-[220px] md:h-64 rounded-[32px] md:rounded-[40px] bg-gradient-to-r from-rosa-primary to-roxo-primary p-8 md:p-12 text-white relative overflow-hidden flex items-center">
                <div className="relative z-10 max-w-lg">
                  <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">Comece sua jornada criativa hoje!</h3>
                  <p className="text-white/80 mb-6 font-medium text-sm md:text-base">Explore as melhores dinâmicas para encantar suas turmas.</p>
                  <button
                    onClick={() => setActiveTab('dynamics')}
                    className="bg-white text-rosa-primary font-bold px-8 py-3 rounded-full shadow-xl hover:scale-105 transition-transform text-sm md:text-base"
                  >
                    Ver Tudo
                  </button>
                </div>

              </div>

              {/* Stats/Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                <DashboardStat
                  icon={BookOpen}
                  label="Dinâmica"
                  value={dynamics.filter(d => d.category === 'Principal').length.toString()}
                  color="bg-rosa-primary"
                />
                <DashboardStat
                  icon={Star}
                  label="Concluidas"
                  value={completedCount.toString()}
                  color="bg-roxo-primary"
                />
                <DashboardStat
                  icon={Gift}
                  label="Bônus"
                  value={user.plan === 'premium' ? dynamics.filter(d => d.category === 'Bônus').length.toString() : "0"}
                  color="bg-amarelo-primary"
                />
              </div>

              {/* Recently Added */}
              <div>
                <SectionTitle icon={Heart}>Destaques</SectionTitle>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                  {dynamics
                    .filter(d => user.plan === 'premium' || d.category === 'Principal')
                    .slice(0, 2)
                    .map((dynamic) => (
                      <div key={dynamic.id}>
                        <DynamicCard
                          dynamic={dynamic}
                          onClick={() => setSelectedDynamic(dynamic)}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'dynamics' && (
            <motion.div
              key="dynamics"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SectionTitle icon={BookOpen}>Biblioteca</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {dynamics
                  .filter(d => user.plan === 'premium' || d.category === 'Principal')
                  .map((dynamic) => (
                    <div key={dynamic.id}>
                      <DynamicCard
                        dynamic={dynamic}
                        onClick={() => setSelectedDynamic(dynamic)}
                      />
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'certificate' && (
            <motion.div
              key="certificate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <Certificate userName={user.name} completionDate={completionDate || new Date().toLocaleDateString('pt-BR')} />
            </motion.div>
          )}

          {activeTab === 'bonus' && (
            <motion.div
              key="bonus"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SectionTitle icon={Gift}>Seus Bônus</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {dynamics.filter(d => d.category === 'Bônus').map((bonus) => (
                  <div key={bonus.id}>
                    <DynamicCard
                      dynamic={bonus}
                      onClick={() => setSelectedDynamic(bonus)}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* PDF Modal */}
      <AnimatePresence>
        {selectedDynamic && (
          <PDFViewer
            dynamic={selectedDynamic}
            isMobile={isMobile}
            onClose={() => setSelectedDynamic(null)}
            onComplete={() => handleComplete(selectedDynamic.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Sub-components ---

const NavItem = ({ icon: Icon, label, active, disabled, isLocked, onClick }: { icon: any, label: string, active: boolean, disabled?: boolean, isLocked?: boolean, onClick: () => void }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-4 px-6 py-3.5 rounded-2xl font-bold transition-all",
      active
        ? "bg-rosa-primary text-white shadow-lg shadow-rosa-primary/30"
        : "text-gray-400 hover:bg-pink-50 hover:text-rosa-primary",
      disabled && "opacity-40 cursor-not-allowed saturate-0"
    )}
  >
    <Icon size={20} />
    <span className="text-sm md:text-base">{label}</span>
    {isLocked && <Lock size={16} className="ml-auto text-rosa-primary" />}
    {!isLocked && disabled && <Lock size={16} className="ml-auto opacity-50" />}
    {!disabled && active && <ChevronRight size={16} className="ml-auto" />}
  </button>
);

const DashboardStat = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
  <div className="glass-card p-5 md:p-6 flex items-center gap-4 md:gap-6 group hover:translate-y-[-4px] transition-all">
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className={cn("p-3 md:p-4 rounded-2xl md:rounded-3xl text-white transform group-hover:rotate-12 transition-transform", color)}
    >
      <Icon size={24} className="md:w-7 md:h-7" />
    </motion.div>
    <div>
      <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-wider">{label}</p>
      <p className="text-2xl md:text-3xl font-black text-gray-800">{value}</p>
    </div>
  </div>
);

const DynamicCard = ({ dynamic, onClick }: { dynamic: Dynamic, onClick: () => void }) => (
  <motion.div
    whileHover={{ y: -8 }}
    className="glass-card overflow-hidden group cursor-pointer border-2 border-transparent hover:border-rosa-primary/30 transition-all flex flex-col h-full"
    onClick={onClick}
  >
    <div className="h-40 md:h-48 overflow-hidden relative">
      <img
        src={dynamic.thumbnailUrl}
        alt={dynamic.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-3 left-3">
        <span className="px-2 py-0.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-bold text-roxo-primary uppercase tracking-wider">
          {dynamic.category}
        </span>
      </div>
      {dynamic.completed && (
        <div className="absolute top-3 right-3 bg-green-500 text-white p-1 rounded-full shadow-lg">
          <CheckCircle2 size={16} />
        </div>
      )}
    </div>
    <div className="p-5 md:p-6 flex-1 flex flex-col">
      <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2 truncate group-hover:text-rosa-primary transition-colors">{dynamic.title}</h4>
      <p className="text-gray-500 text-xs md:text-sm line-clamp-2 leading-relaxed mb-4 flex-1">{dynamic.description}</p>
      <div className="flex items-center gap-2 text-rosa-primary font-bold text-xs md:text-sm mt-auto">
        <motion.div
          animate={{ x: [0, 2, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Download size={14} />
        </motion.div>
        <span className="underline">Acessar Material</span>
      </div>
    </div>
  </motion.div>
);

const BonusCard = ({ title, description, icon: Icon }: { title: string, description: string, icon: any }) => (
  <div className="glass-card p-6 md:p-8 group hover:bg-gradient-to-br hover:from-white hover:to-amarelo-primary/5 transition-all">
    <motion.div
      animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="p-3 bg-amarelo-primary/10 rounded-xl text-amarelo-primary w-fit mb-5 group-hover:scale-110 transition-transform"
    >
      <Icon size={24} className="md:w-8 md:h-8" />
    </motion.div>
    <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{title}</h4>
    <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-5">{description}</p>
    <button className="flex items-center gap-2 text-amarelo-primary font-bold text-sm">
      Acessar <ChevronRight size={16} />
    </button>
  </div>
);
