"use client"

import { useEffect, useRef, useState } from "react"
import { Target, Globe, Eye, Heart, Award, Users, Lightbulb, Sparkles, Zap, TrendingUp, Rocket, Shield, Clock, Coffee, CheckCircle2, ArrowRight } from "lucide-react"

export function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [animatedStats, setAnimatedStats] = useState({
    founded: 0,
    team: 0,
    countries: 0
  })
  const [particlePositions, setParticlePositions] = useState<Array<{ x: number; y: number; delay: number }>>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          generateParticles()
          startStatsAnimation()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const generateParticles = () => {
    const positions = []
    for (let i = 0; i < 50; i++) {
      positions.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5
      })
    }
    setParticlePositions(positions)
  }

  const startStatsAnimation = () => {
    const duration = 2000
    const startTime = Date.now()
    const targetStats = { founded: 2019, team: 50, countries: 15 }
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(1, elapsed / duration)
      
      setAnimatedStats({
        founded: Math.floor(2015 + progress * 4),
        team: Math.floor(10 + progress * 40),
        countries: Math.floor(5 + progress * 10)
      })
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setAnimatedStats(targetStats)
      }
    }
    
    requestAnimationFrame(animate)
  }

  // Auto-rotate through value cards for demo
  const [activeValueIndex, setActiveValueIndex] = useState(0)
  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setActiveValueIndex((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [isVisible])

  const values = [
    { icon: Target, title: "Mission", desc: "Empower businesses with innovative digital solutions", color: "from-purple-500 to-violet-500", longDesc: "We're on a mission to democratize access to cutting-edge digital technology." },
    { icon: Eye, title: "Vision", desc: "Lead the future of digital transformation globally", color: "from-pink-500 to-rose-500", longDesc: "Envisioning a world where every business can leverage technology for growth." },
    { icon: Heart, title: "Passion", desc: "Creating with love and dedication in every project", color: "from-cyan-500 to-blue-500", longDesc: "Every line of code, every design element is crafted with genuine care." },
    { icon: Lightbulb, title: "Innovation", desc: "Constantly evolving with emerging technologies", color: "from-orange-500 to-amber-500", longDesc: "Staying ahead of the curve with AI, IoT, and next-gen solutions." },
  ]

  const reasons = [
    { icon: Award, title: "Award Winning", desc: "Recognized excellence in digital innovation and design quality", metric: "12 Awards", gradient: "from-yellow-500 to-orange-500" },
    { icon: Users, title: "Client Focused", desc: "Your success is our priority with dedicated support and collaboration", metric: "98% Retention", gradient: "from-green-500 to-emerald-500" },
    { icon: Lightbulb, title: "Innovative Approach", desc: "Cutting-edge solutions that keep you ahead of the competition", metric: "50+ Projects", gradient: "from-blue-500 to-cyan-500" },
  ]

  return (
    <section ref={sectionRef} className="py-32 px-4 relative overflow-hidden">
      <style jsx>{`
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
          25% { transform: translate(12px, -18px) scale(1.2); opacity: 0.5; }
          50% { transform: translate(-8px, -28px) scale(0.8); opacity: 0.3; }
          75% { transform: translate(18px, -12px) scale(1.1); opacity: 0.4; }
        }
        @keyframes cardGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.15); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.3); }
        }
        @keyframes borderFlow {
          0% { border-color: rgba(139, 92, 246, 0.2); }
          50% { border-color: rgba(139, 92, 246, 0.6); }
          100% { border-color: rgba(139, 92, 246, 0.2); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card-strong {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.4);
        }
        .card-shine {
          position: relative;
          overflow: hidden;
        }
        .card-shine::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
          transition: left 0.6s ease;
        }
        .card-shine:hover::before {
          left: 100%;
        }
        .glow-border {
          position: relative;
          animation: cardGlow 3s ease-in-out infinite;
        }
        .glow-border::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.4), rgba(6, 182, 212, 0.4));
          border-radius: 1.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
       
        .text-gradient {
          background: linear-gradient(135deg, #a855f7, #ec4899, #06b6d4);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientShift 3s ease infinite;
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .stat-number {
          font-feature-settings: "tnum";
          font-variant-numeric: tabular-nums;
          animation: countUp 0.5s ease-out;
        }
        .rotate-animation {
          animation: rotateSlow 20s linear infinite;
        }
        .animate-border-flow {
          animation: borderFlow 2s ease-in-out infinite;
        }
        .shimmer-text {
          background: linear-gradient(90deg, #fff 0%, #a855f7 50%, #fff 100%);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: shimmer 2s linear infinite;
        }
        .value-card-active {
          animation: cardGlow 2s ease-in-out infinite;
          border-color: rgba(139, 92, 246, 0.5);
          transform: scale(1.02);
        }
      `}</style>

      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particlePositions.map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              animation: `floatParticle 5s ease-in-out ${pos.delay}s infinite`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-3xl rotate-animation" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-600/8 rounded-full blur-3xl rotate-animation" style={{ animationDirection: 'reverse' }} />
      <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, rgba(139, 92, 246, 0.2) 0px, rgba(139, 92, 246, 0.2) 1px, transparent 1px, transparent 30px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header with animations */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-6 group cursor-pointer animate-border-flow">
            <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />
            <span className="text-sm text-purple-400 font-medium">Who We Are</span>
            <Rocket className="w-3 h-3 text-pink-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-gradient">Web Matrix</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full animate-pulse" />
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed mt-6">
            We are a passionate team of innovators dedicated to transforming ideas into 
            exceptional digital experiences that drive business growth and user satisfaction.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Story with animated elements */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="glass-card-strong rounded-3xl p-8 md:p-10 glow-border relative overflow-hidden group">
              {/* Decorative animated elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl" />
              
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">Our Story</h3>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                Founded with a vision to bridge the gap between technology and creativity, 
                Web Matrix has evolved into a leading digital solutions provider. We believe 
                that every business deserves a powerful digital presence that reflects their 
                unique identity and values.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Our journey began with a simple idea: to create technology that makes a difference. 
                Today, we continue to push boundaries, embracing innovation while staying true to 
                our core values of excellence, integrity, and client satisfaction.
              </p>
              
              {/* Animated Stats inside card */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: animatedStats.founded + (animatedStats.founded > 2015 ? "" : "+"), label: "Founded", icon: Clock },
                  { value: animatedStats.team + "+", label: "Team Members", icon: Users },
                  { value: animatedStats.countries + "+", label: "Countries", icon: Globe },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 group/stat">
                    <div className="flex justify-center mb-2">
                      <stat.icon className="w-5 h-5 text-purple-400 group-hover/stat:scale-110 transition-transform" />
                    </div>
                    <div className="text-2xl font-bold text-gradient stat-number">{stat.value}</div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Values with interactive cards */}
          <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {values.map((item, i) => (
              <div 
                key={i}
                className={`glass-card rounded-2xl p-6 hover-lift card-shine group cursor-pointer transition-all duration-300 ${
                  activeValueIndex === i ? 'value-card-active' : ''
                }`}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                  {item.title}
                  {activeValueIndex === i && (
                    <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
                  )}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                
                {/* Expand on hover */}
                {(hoveredCard === i || activeValueIndex === i) && (
                  <div className="mt-3 pt-3 border-t border-white/10 animate-[slideUp_0.3s_ease-out]">
                    <p className="text-xs text-purple-400">{item.longDesc}</p>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-green-400">
                      <CheckCircle2 className="w-2 h-2" />
                      <span>Active initiative</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section with enhanced animations */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 mb-4">
              <Shield className="w-3 h-3 text-purple-400" />
              <span className="text-xs text-purple-400">Why Trust Us</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose <span className="text-gradient">Us?</span>
            </h3>
            <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {reasons.map((item, i) => (
              <div 
                key={i}
                className="glass-card rounded-2xl p-8 text-center hover-lift card-shine group relative overflow-hidden"
                style={{ animation: isVisible ? `slideUp 0.5s ease-out ${0.2 + i * 0.1}s forwards` : 'none', opacity: 0 }}
              >
                {/* Animated background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500" />
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-white font-semibold text-xl mb-2">{item.title}</h4>
                <p className="text-gray-400 leading-relaxed mb-4">{item.desc}</p>
                
                {/* Metric badge */}
                <div className="inline-flex items-center gap-1 glass-card rounded-full px-3 py-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400 font-medium">{item.metric}</span>
                </div>
                
                {/* Arrow indicator on hover */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA with stats bar */}
        <div className={`mt-16 flex flex-wrap justify-center gap-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="glass-card rounded-full px-8 py-3 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-gray-400">24/7 Support</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span className="text-xs text-gray-400">Fast Delivery</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3 text-purple-400" />
              <span className="text-xs text-gray-400">100% Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}