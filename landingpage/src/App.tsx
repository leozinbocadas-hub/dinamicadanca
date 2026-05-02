import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import {
  CheckCircle2,
  Star,
  Gift,
  ShieldCheck,
  ChevronDown,
  Zap,
  Heart,
  Smile,
  Sparkles,
  ArrowRight,
  HelpCircle,
  X,
  Play,
  Check,
  MousePointer2,
  Trophy,
  Music2,
  Library,
  Smartphone,
  Printer,
  GraduationCap,
  Users,
  School,
  BookOpen,
  Lightbulb,
  AlertCircle
} from 'lucide-react';

const COLORS = {
  pink: '#F116CB',
  purple: '#AD06FD',
  yellow: '#FFBF00',
  white: '#FFFFFF',
};

// --- Atomic Components ---

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${className}`}>
    {children}
  </span>
);

const SectionHeading = ({ title, subtitle, centered = true }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-brand-pink font-bold uppercase tracking-widest text-sm mb-4"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-2xl md:text-4xl font-black italic tracking-tight px-4"
      style={{ color: COLORS.purple }}
    >
      {title}
    </motion.h2>
  </div>
);

const Decoration = ({ className = "", delay = 0, size = 10 }: { className?: string, delay?: number, size?: number }) => (
  <motion.div
    animate={{
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute pointer-events-none ${className}`}
  >
    <div className={`w-${size} h-${size} rounded-xl bg-white shadow-lg flex items-center justify-center -rotate-12 border-2 border-yellow-200`}>
      <Sparkles className="text-brand-yellow" size={size * 1.5} />
    </div>
  </motion.div>
);

const VSLPlayer = React.memo(() => (
  <div 
    className="absolute inset-0 z-10"
    dangerouslySetInnerHTML={{ __html: `
      <div id="ifr_69f57959429b5d0eef514412_wrapper" style="margin: 0 auto; width: 100%; height: 100%;"> 
        <div style="position: relative; padding: 178.107% 0 0 0; height: 100%;" id="ifr_69f57959429b5d0eef514412_aspect"> 
          <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_69f57959429b5d0eef514412" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 2.5rem;" referrerpolicy="origin" onload="this.onload=null, this.src='https://scripts.converteai.net/ab14c621-69de-4bc7-ad1a-73b273a93155/players/69f57959429b5d0eef514412/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> 
        </div> 
      </div>
    `}}
  />
));

// --- Main App ---

export default function App() {
  const [showUpsell, setShowUpsell] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(659); // 10:59 in seconds
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const scrollToPlans = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBasicSelect = () => setShowUpsell(true);

  const handleCheckout = (planName: string) => {
    alert(`Redirecionando para o seguro checkout do plano ${planName}!`);
    setShowUpsell(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-brand-pink z-[100] origin-left" style={{ scaleX }} />

      {/* 1. Urgency Banner (Fixed) */}
      <div className="fixed top-0 left-0 right-0 bg-brand-pink text-white py-2.5 md:py-3 px-4 font-black text-[10.5px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.3em] z-[100] text-center overflow-hidden shadow-lg leading-tight">
        <motion.div
          animate={{ x: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center justify-center gap-4"
        >
          <Zap size={14} fill="currentColor" className="animate-pulse" />
          <span>Oferta exclusiva termina em {formatTime(timeLeft)} minutos</span>
          <Zap size={14} fill="currentColor" className="animate-pulse" />
        </motion.div>
      </div>

      {/* Floating Header */}
      <nav className="fixed top-14 md:top-16 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-4xl z-50">
        <div className="glass rounded-2xl px-4 md:px-5 py-2 md:py-2.5 flex justify-between items-center shadow-xl border-2 border-white/50">
          <img src="https://i.ibb.co/Wv2LjQz6/image.png" alt="Logo" className="h-12 w-auto scale-[2.2] origin-left ml-6" />
          <div className="hidden md:flex items-center gap-6 font-bold text-slate-600 text-[13px]">
            <a href="#oq-receber" className="hover:text-brand-purple transition-colors">Conteúdo</a>
            <a href="#planos" className="hover:text-brand-purple transition-colors">Planos</a>
            <a href="#faq" className="hover:text-brand-purple transition-colors">Dúvidas</a>
          </div>
          <button
            onClick={scrollToPlans}
            className="bg-brand-yellow hover:bg-brand-yellow/90 text-slate-900 font-bold px-5 py-2 rounded-xl shadow-md active:scale-95 transition-all text-xs flex items-center gap-1.5 group"
          >
            COMEÇAR <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-36 pb-8 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="absolute top-20 left-[10%] w-64 h-64 bg-brand-pink/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col items-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center relative z-10 w-full"
          >
            <Badge className="bg-brand-pink/10 text-brand-pink mb-6">
              <Sparkles size={12} /> 100% Pedagógico
            </Badge>
            <h1 className="text-[28px] sm:text-3xl md:text-[40px] lg:text-[46px] font-black text-brand-purple italic leading-[1.1] tracking-tighter mb-6 md:mb-8 w-full px-4">
              <span className="block sm:inline">+250 Dinâmicas de </span>
              <span className="block sm:inline">Dança Infantil </span>
              <br className="hidden sm:block" />
              <span className="relative inline-block mt-1 md:mt-2">
                <span className="block sm:inline text-brand-pink">Atividades Prontas </span>
                <span className="block sm:inline">Para suas Aulas</span>
                <div className="absolute -bottom-1 left-0 w-full h-2 md:h-3 bg-brand-yellow -z-10 rounded-full opacity-70" />
              </span>
            </h1>
            <p className="text-slate-500 font-bold text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-6 px-4">
              Dê adeus às aulas repetitivas. Tenha em mãos o maior acervo de atividades lúdicas que estimulam a coordenação, o ritmo e a criatividade das crianças de forma leve e apaixonante.
            </p>

          </motion.div>
        </div>
      </section>

      {/* 2.5 VSL Section */}
      <section className="pt-0 pb-12 px-6 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="relative group cursor-pointer">
            {/* Phone Frame Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-72 sm:w-80 aspect-[9/16] bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_0_50px_-12px_rgba(241,22,203,0.3)] border-[6px] md:border-8 border-slate-900 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-brand-pink/20 mix-blend-overlay" />

              {/* VSL Embed */}
              <VSLPlayer />
            </motion.div>

            {/* Decorations */}
            <Decoration className="-top-6 -left-6" delay={0.1} size={8} />
            <Decoration className="top-1/2 -right-8" delay={0.4} size={6} />
            <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-2 bg-brand-yellow text-slate-900 px-2 py-0.5 md:px-3 md:py-1 rounded-lg font-black text-[9px] md:text-[10px] shadow-lg transform rotate-6 animate-bounce">
              PLAY AGORA!
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-8 text-center max-w-sm px-4"
          >
            <p className="text-slate-400 font-normal italic text-sm leading-relaxed max-w-sm mx-auto">
              "Ensinar dança para crianças vai muito além de passos… é sobre criar momentos que elas nunca vão esquecer. Esse material foi feito para transformar suas aulas em experiências leves, divertidas e cheias de energia."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToPlans}
              className="bg-brand-purple text-white px-8 py-3.5 md:py-5 rounded-2xl font-black text-lg shadow-brand hover:translate-y-[-2px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-2"
            >
              QUERO MINHAS DINÂMICAS AGORA <Play size={18} fill="currentColor" />
            </motion.button>
            <div className="flex items-center gap-1.5 text-slate-400 font-bold text-sm">
              <ShieldCheck size={16} /> Acesso Vitalício
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. O que a pessoa vai receber (Dynamic Grid) */}
      <section id="oq-receber" className="py-20 px-6 bg-slate-50 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            title="O que preparamos para vocês"
            subtitle="Explore o conteúdo"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: "Criatividade & Magia",
                desc: "Dinâmicas que despertam a imaginação através de desafios lúdicos.",
                color: "bg-brand-pink",
                icon: Sparkles
              },
              {
                title: "Ritmo & Energia",
                desc: "Atividades focadas no desenvolvimento motor e rítmico contagiante.",
                color: "bg-brand-purple",
                icon: Zap
              },
              {
                title: "União & Socialização",
                desc: "Ferramentas para fortalecer os laços através do movimento.",
                color: "bg-brand-yellow",
                icon: Smile
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-all flex flex-col"
              >
                <div className={`h-1.5 w-full ${item.color}`} />
                <div className="p-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-slate-100 transition-colors">
                    <item.icon size={20} className="text-slate-400 group-hover:text-brand-purple transition-colors" />
                  </div>
                  
                  <h3 className="text-base font-black text-brand-purple mb-2 tracking-tight italic">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-500 font-bold text-[13px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Para quem é & Solução */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          {/* Parte 1: Para quem é? */}
          <div className="mb-24">
            <SectionHeading
              title="PARA QUEM É?"
              subtitle="Este material foi feito para você se..."
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Mockup Restored */}
              <div className="relative p-6 order-2 lg:order-1">
                <div className="blob w-full aspect-square bg-gradient-to-br from-brand-yellow/20 to-brand-pink/10 absolute -z-10 scale-110" />
                <div className="bg-white p-3 rounded-[48px] shadow-2xl border-4 border-brand-yellow rotate-2 overflow-hidden max-w-[400px] mx-auto">
                  <div className="aspect-square rounded-[36px] overflow-hidden bg-slate-100">
                    <img src="https://i.ibb.co/Z61tncG1/image.png" alt="Educação Lúdica" className="w-full h-full object-cover" />
                  </div>
                </div>
                <Decoration className="top-4 left-4" delay={0.2} size={8} />
                <Decoration className="bottom-14 right-4" delay={0.5} size={10} />
              </div>

              {/* Targets with Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 order-1 lg:order-2">
                {[
                  { icon: <Users size={20} />, title: "Professores", desc: "Aulas dinâmicas e crianças engajadas." },
                  { icon: <Heart size={20} />, title: "Pais", desc: "Ritmo e diversão em casa." },
                  { icon: <School size={20} />, title: "Escolas", desc: "Atividades prontas para turmas." },
                  { icon: <BookOpen size={20} />, title: "Educadores", desc: "Desenvolvimento infantil criativo." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-[32px] bg-slate-50 border border-slate-100 flex flex-col group hover:bg-white hover:shadow-xl transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-pink text-white flex items-center justify-center mb-4 shadow-lg shadow-brand-pink/20">
                      {item.icon}
                    </div>
                    <h4 className="text-lg font-black text-brand-purple mb-2 leading-tight">{item.title}</h4>
                    <p className="text-slate-500 font-bold text-[13px] leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Parte 2 & 3: Dor vs Solução */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Dor */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-brand-purple p-10 md:p-14 rounded-[56px] text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <h3 className="text-2xl font-black mb-8 italic flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <AlertCircle size={20} className="text-brand-yellow" />
                </div>
                <span className="text-brand-yellow">Você já passou por isso?</span>
              </h3>
              <p className="text-white/70 text-sm font-bold mb-10 leading-relaxed">
                Se você respondeu “sim” para alguma dessas situações, fica tranquilo(a)… isso é mais comum do que parece:
              </p>
              <ul className="space-y-6">
                {[
                  "Sua aula começa e em poucos minutos as crianças já estão dispersas?",
                  "Você passa mais tempo tentando organizar do que realmente ensinando?",
                  "Fica sem ideias e acaba repetindo sempre as mesmas atividades?",
                  "Sente que suas aulas poderiam ser mais divertidas e envolventes?",
                  "Já pensou em desistir por falta de organização ou resultado?"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start text-sm font-bold group">
                    <span className="text-brand-yellow text-xl shrink-0 leading-none font-black italic">✗</span>
                    <span className="text-white/90 leading-tight group-hover:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Solução */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-2"
            >
              <h3 className="text-2xl md:text-3xl font-black mb-8 italic text-brand-purple leading-tight flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-pink text-white flex items-center justify-center shrink-0 shadow-lg shadow-brand-pink/20">
                  <Lightbulb size={24} />
                </div>
                <span className="text-brand-pink">Agora você tem uma solução simples</span>
              </h3>
              <p className="text-slate-500 text-base font-bold mb-12 leading-relaxed">
                O +250 Dinâmicas Interativas de Dança Infantil foi criado exatamente para resolver isso de forma prática, rápida e eficiente.
              </p>
              <ul className="space-y-7">
                {[
                  "Mais de 250 dinâmicas prontas — sem precisar criar nada do zero",
                  "Aulas estruturadas que prendem a atenção das crianças do início ao fim",
                  "Atividades pensadas para desenvolver coordenação, ritmo e criatividade",
                  "Material simples, visual e fácil de aplicar",
                  "Resultados visíveis já nas primeiras aulas"
                ].map((item, i) => (
                  <li key={i} className="flex gap-5 items-start font-bold">
                    <div className="w-7 h-7 rounded-full bg-[#E8FBF2] flex items-center justify-center shrink-0 shadow-sm border border-green-100">
                      <Check size={16} className="text-brand-purple stroke-[4]" />
                    </div>
                    <span className="text-slate-800 text-lg leading-tight tracking-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. O Que Você Vai Receber? */}
      <section className="py-24 px-6 bg-slate-50/50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="bg-brand-pink/10 text-brand-pink mb-4">Conteúdo Completo</Badge>
            <h2 className="text-3xl md:text-5xl font-black text-brand-purple italic mb-6 leading-tight">
              O Que Você Vai <span className="text-brand-pink underline decoration-brand-yellow/30 underline-offset-8">Receber?</span>
            </h2>
            <p className="max-w-2xl mx-auto text-slate-500 font-bold text-sm md:text-base leading-relaxed uppercase tracking-wide">
              Tudo que você precisa para transformar suas aulas de dança infantil em momentos inesquecíveis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[
              { icon: <Music2 size={28} />, title: '+250 Dinâmicas Interativas', desc: 'Atividades prontas para aplicar imediatamente nas suas aulas.' },
              { icon: <Gift size={28} />, title: 'Bônus Exclusivos', desc: 'Brincadeiras musicais, planner de aulas e pack de músicas sem custo adicional.' },
              { icon: <Library size={28} />, title: 'Área de Membros', desc: 'Todo o conteúdo organizado de forma simples e prática para você acessar quando quiser.' },
              { icon: <Smartphone size={28} />, title: 'Acesso Digital', desc: 'Use pelo celular, tablet ou computador, a qualquer hora e em qualquer lugar.' },
              { icon: <Printer size={28} />, title: 'Pronto para Imprimir', desc: 'Leve suas dinâmicas para a aula de forma prática, sem depender de internet.' },
              { icon: <GraduationCap size={28} />, title: 'Metodologia Educativa', desc: 'Atividades pensadas para desenvolver coordenação, ritmo e criatividade nas crianças.' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center transition-all group"
              >
                <div className="w-16 h-16 rounded-[22px] bg-brand-pink text-white flex items-center justify-center mb-8 shadow-xl shadow-brand-pink/25 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item.icon}
                </div>
                <h4 className="text-xl font-black text-brand-purple mb-4 leading-tight tracking-tight italic">{item.title}</h4>
                <p className="text-slate-500 text-sm font-bold leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Bônus (Cards) */}
      <section className="py-20 px-6 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Bônus Irresistíveis" subtitle="Presentes exclusivos" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Certificado Oficial",
                image: "https://i.ibb.co/SXK62NyQ/image.png",
                desc: "Um certificado exclusivo para celebrar o progresso e dedicação das crianças em cada etapa."
              },
              {
                title: "50 Brincadeiras Musicais",
                image: "https://i.ibb.co/zVD7gJny/image.png",
                desc: "Guia rápido para iniciar as aulas com energia. Inclui dinâmicas de aquecimento, jogos rítmicos e coordenação."
              },
              {
                title: "Planner de Aulas Pronto",
                image: "https://i.ibb.co/kVd5YPrM/image.png",
                desc: "Material organizado para facilitar o dia a dia. Modelos semanais e mensais com estrutura completa."
              },
              {
                title: "Pack de Músicas Infantis",
                image: "https://i.ibb.co/TBmy2yLw/image.png",
                desc: "Curadoria pronta para você não perder tempo procurando. Playlists divididas por faixa etária."
              }
            ].map((bonus, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 md:p-10 rounded-[40px] shadow-2xl border-3 border-dashed border-slate-100 relative flex flex-col items-center text-center"
              >
                <div className="absolute -top-4 -right-4 bg-brand-yellow text-slate-800 px-5 py-1.5 rounded-full font-black text-xs shadow-lg uppercase z-10">
                  GRÁTIS HOJE
                </div>

                {bonus.image && (
                  <div className="mb-8 rounded-[32px] overflow-hidden border-4 border-slate-50 w-full shadow-inner bg-slate-50 aspect-[16/10]">
                    <img src={bonus.image} alt={bonus.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <h3 className="text-xl md:text-2xl font-black text-brand-purple mb-4 leading-tight">{bonus.title}</h3>
                <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">{bonus.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Planos (High Conversion) */}
      <section id="planos" className="py-24 px-6 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[400px] bg-brand-purple -rotate-2 -z-10 translate-y-[-50%]" />

        <div className="max-w-5xl mx-auto">
          {/* Scarcity Timer */}
          <div className="flex flex-col items-center mb-16">
            <p className="text-brand-pink font-black uppercase tracking-[0.4em] text-[11px] mb-8 animate-bounce">
              🚀 APROVEITE ENQUANTO HÁ TEMPO:
            </p>
            <div className="flex gap-3 sm:gap-5 items-center">
              {[
                { label: 'Horas', value: '00' },
                { label: 'Minutos', value: Math.floor(timeLeft / 60).toString().padStart(2, '0') },
                { label: 'Segundos', value: (timeLeft % 60).toString().padStart(2, '0') }
              ].map((unit, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center">
                    <div className="bg-white w-20 h-20 sm:w-24 sm:h-24 rounded-[32px] shadow-2xl flex items-center justify-center border-4 border-slate-100 relative overflow-hidden">
                      <span className="text-4xl sm:text-5xl font-black text-brand-pink italic tracking-tighter relative z-10">
                        {unit.value}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-black text-slate-400 mt-4 tracking-widest">
                      {unit.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className="text-3xl font-black text-brand-purple/20 pb-8">:</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <SectionHeading title="Acesso Imediato" subtitle="Investimento" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Plano Básico */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] shadow-xl border border-slate-100 flex flex-col items-center text-center relative"
            >
              <h3 className="text-lg font-black text-slate-400 mb-6 uppercase tracking-widest">Plano Básico</h3>
              <div className="mb-6">
                <span className="text-sm font-bold text-slate-300 block mb-1">Pagamento Único</span>
                <div className="flex items-center justify-center text-slate-700">
                  <span className="text-xl font-bold self-start mt-2">R$</span>
                  <span className="text-6xl md:text-7xl font-black italic">10</span>
                  <div className="flex flex-col text-left ml-1.5">
                    <span className="text-2xl font-bold">,00</span>
                  </div>
                </div>
              </div>
              <ul className="text-left space-y-3.5 mb-10 w-full max-w-xs mx-auto font-bold text-slate-900 text-sm">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-pink" size={16} /> +250 Dinâmicas Interativas</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-pink" size={16} /> Suporte Especializado</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-pink" size={16} /> Acesso Vitalício</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-pink" size={16} /> Metodologia Comprovada</li>
              </ul>
              
              <div className="mb-8 w-full max-w-[320px]">
                <img src="https://i.ibb.co/jvCqYgPj/image.png" alt="Selo de Qualidade" className="w-full h-auto object-contain" />
              </div>
              <button
                onClick={handleBasicSelect}
                className="w-full py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-lg transition-all"
              >
                ESCOLHER BÁSICO
              </button>
            </motion.div>

            {/* Plano Premium */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-white p-6 md:p-10 rounded-[36px] md:rounded-[48px] shadow-[0_30px_70px_-15px_rgba(173,6,253,0.2)] border-4 border-brand-yellow flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 py-1.5 bg-brand-yellow text-brand-purple font-black text-[9px] uppercase tracking-[0.25em]">
                O Plano Favorito dos Pais
              </div>

              <h3 className="text-xl font-black text-brand-purple mb-6 uppercase mt-6 tracking-widest">Plano Premium</h3>
              <div className="mb-6">
                <span className="text-sm font-bold text-brand-pink block line-through opacity-40 mb-1">De R$ 97,00 por</span>
                <div className="flex items-center justify-center text-brand-purple">
                  <span className="text-xl font-bold self-start mt-2">R$</span>
                  <span className="text-7xl md:text-8xl font-black italic">27</span>
                  <div className="flex flex-col text-left ml-2">
                    <span className="text-2xl font-bold">,90</span>
                    <span className="text-[10px] font-black uppercase text-brand-pink animate-pulse">HOJE!</span>
                  </div>
                </div>
              </div>

              <div className="mb-8 w-full max-w-[300px]">
                <img src="https://i.ibb.co/jk6HZG69/image.png" alt="Formas de Pagamento" className="w-full h-auto object-contain" />
              </div>
              <ul className="text-left space-y-3.5 mb-10 w-full max-w-xs mx-auto font-bold text-slate-900 text-sm">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-purple" size={16} /> +250 Dinâmicas Interativas</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-purple" size={16} /> Atualizações Mensais</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-purple" size={16} /> Suporte VIP Prioritário</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-purple" size={16} /> Acesso Vitalício</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-purple" size={16} /> Metodologia Comprovada</li>
                <li className="flex items-center gap-3"><Gift className="text-brand-pink" size={16} /> Certificado com seu nome</li>
                <li className="flex items-center gap-3"><Gift className="text-brand-pink" size={16} /> 50 Brincadeiras Musicais</li>
                <li className="flex items-center gap-3"><Gift className="text-brand-pink" size={16} /> Planner de Aulas Pronto</li>
                <li className="flex items-center gap-3"><Gift className="text-brand-pink" size={16} /> Pack de Músicas Infantis</li>
              </ul>
              
              <div className="mb-8 w-full max-w-[320px]">
                <img src="https://i.ibb.co/jvCqYgPj/image.png" alt="Selo de Qualidade" className="w-full h-auto object-contain" />
              </div>
              <button
                onClick={() => handleCheckout("Premium")}
                className="w-full py-5 rounded-2xl bg-brand-purple text-white font-black text-xl shadow-brand hover:translate-y-[-3px] active:translate-y-[2px] transition-all flex items-center justify-center gap-2.5"
              >
                QUERO O PREMIUM <MousePointer2 size={20} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. Garantia (Professional seal) */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto rounded-[48px] bg-white p-10 md:p-14 text-center relative border-4 border-slate-50 shadow-[0_32px_64px_-12px_rgba(173,6,253,0.1)]">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 group">
            <img src="https://i.ibb.co/wNdnK8RK/image.png" alt="Garantia 7 Dias" className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform" />
          </div>

          <div className="mt-20">
            <SectionHeading title="Sua Satisfação é Prioridade" centered subtitle="Garantia Incondicional" />
          </div>

          <div className="flex flex-col items-center justify-center gap-8 max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed text-center">
              Se em até 7 dias você ou seu filho não amarem a experiência, <span className="text-brand-purple font-bold underline decoration-brand-yellow decoration-4 underline-offset-4">devolvemos 100% do seu dinheiro.</span> Sem perguntas, sem burocracia.
            </p>
          </div>


        </div>
      </section>

      {/* 9. FAQ (Polished) */}
      <section id="faq" className="py-20 px-6 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <SectionHeading title="Perguntas Frequentes" subtitle="Dúvidas comuns" />
          <div className="space-y-3">
            {[
              { q: "O acesso é imediato?", a: "Sim! Logo após a confirmação do pagamento, você recebe um link exclusivo no seu e-mail e WhatsApp para baixar e começar." },
              { q: "Quais as formas de pagamento?", a: "Aceitamos Cartão de Crédito, Pix" },
              { q: "Serve para qual idade?", a: "O material é focado no desenvolvimento de crianças entre 3 e 12 anos de idade." },
              { q: "Posso acessar de qualquer lugar?", a: "Com certeza. No celular, tablet ou computador, a diversão acontece onde você estiver." }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm transition-all hover:border-brand-purple/20"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-5 text-left flex justify-between items-center bg-white transition-colors"
                >
                  <span className="font-bold text-base text-brand-purple">{item.q}</span>
                  <div className={`p-1.5 rounded-full bg-slate-50 transition-transform ${activeFaq === i ? 'rotate-180 bg-brand-purple/10 text-brand-purple' : ''}`}>
                    <ChevronDown size={14} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 text-slate-500 font-medium text-sm leading-relaxed"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final Call to Action */}
      <section className="py-24 px-6 text-center">
        <h3 className="text-3xl md:text-5xl font-black text-brand-purple italic mb-8">
          Preparado para <span className="text-brand-pink">começar?</span>
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToPlans}
          className="bg-brand-yellow text-slate-900 px-8 py-5 rounded-2xl font-black text-2xl shadow-lg hover:shadow-xl transition-all"
        >
          ESCOLHER MEU PLANO
        </motion.button>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-brand-pink text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative flex flex-col items-center">
          <img src="https://i.ibb.co/Wv2LjQz6/image.png" alt="Logo" className="h-20 w-auto mb-6 scale-[2.2]" />
          <div className="flex gap-6 mb-4 text-slate-800 font-bold uppercase text-[10px] tracking-widest">
            <button key="privacidade" className="hover:text-brand-purple transition-colors cursor-pointer">Privacidade</button>
            <button key="termos" className="hover:text-brand-purple transition-colors cursor-pointer">Termos</button>
            <button key="suporte" className="hover:text-brand-purple transition-colors cursor-pointer">Suporte</button>
          </div>
          <p className="text-slate-700 text-[11px] font-medium tracking-wide italic text-center">
            © {new Date().getFullYear()} +250 Dinâmicas Interativas. Todos os direitos reservados.
          </p>
        </div>
        {/* Decorative background element */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-purple/10 rounded-full blur-3xl" />
      </footer>

      {/* Upsell Modal */}
      <AnimatePresence>
        {showUpsell && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/10 backdrop-blur-[5px]"
              onClick={() => setShowUpsell(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative z-10 overflow-hidden border-4 border-brand-yellow"
            >
              <div className="bg-brand-yellow p-5 text-center">
                <Badge className="bg-white text-brand-purple mb-1">🎁 Oferta Relâmpago</Badge>
                <h3 className="text-2xl font-black text-brand-purple uppercase italic tracking-tighter leading-none">ESPERE! NÃO VÁ AINDA!</h3>
              </div>

              <div className="p-8 text-center">
                <div className="mb-6">
                  <p className="text-slate-500 font-bold mb-3 text-sm">Vimos que você escolheu o básico, mas...</p>
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-slate-300 line-through text-lg font-black italic">DE R$ 27,00</span>
                    <div className="bg-emerald-50 text-emerald-600 px-5 py-3 rounded-2xl border-2 border-emerald-100 w-full max-w-xs">
                      <span className="text-[10px] font-black uppercase block mb-1">PREMIUM POR APENAS</span>
                      <span className="text-5xl font-black italic leading-none">R$ 17,90</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => handleCheckout("Premium Upsell")}
                    className="w-full py-5 rounded-2xl bg-brand-pink text-white font-black text-xl shadow-lg hover:translate-y-[-2px] active:translate-y-[2px] transition-all"
                    style={{ boxShadow: `0 6px 0 0 #be185d` }}
                  >
                    QUERO O PREMIUM AGORA
                  </button>
                  <button
                    onClick={() => handleCheckout("Basic")}
                    className="text-slate-400 font-bold text-xs underline hover:text-slate-600 transition-colors"
                  >
                    Quero manter o básico por R$ 10,00
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 p-4 flex items-center justify-center gap-2 text-slate-400 font-bold text-[10px]">
                <ShieldCheck size={14} /> COMPRA 100% SEGURA
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Floating Support Button */}
      <motion.a
        href="https://wa.me/5537991831171?text=Ol%C3%A1%21+Gostaria+de+tirar+uma+d%C3%BAvida+sobre+as+Din%C3%A2micas."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[80] cursor-pointer"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <img 
          src="https://i.ibb.co/HDSXGxcz/11.png" 
          alt="Suporte WhatsApp" 
          className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.2)]" 
        />
      </motion.a>
    </div>
  );
}
