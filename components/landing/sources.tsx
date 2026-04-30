"use client"

import { useEffect, useRef, useState } from "react"
import { Search, Globe, FileText, Sparkles, Upload, ExternalLink, TrendingUp, CheckCircle2, Clock, ArrowRight, Zap, BookOpen, Database, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Sources() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [fetchingStatus, setFetchingStatus] = useState("idle") // idle, fetching, complete
  const [activeSource, setActiveSource] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Start progress animation when section becomes visible
          startProgressAnimation()
        }
      },
      { threshold: 0.01, rootMargin: '100px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const startProgressAnimation = () => {
    setFetchingStatus("fetching")
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15
      if (currentProgress >= 100) {
        currentProgress = 100
        clearInterval(interval)
        setFetchingStatus("complete")
        // Reset after 3 seconds and start again for demo
        setTimeout(() => {
          setProgress(0)
          setFetchingStatus("idle")
          setTimeout(startProgressAnimation, 2000)
        }, 3000)
      }
      setProgress(currentProgress)
    }, 200)
    return () => clearInterval(interval)
  }

  // Animated floating elements
  useEffect(() => {
    if (!isVisible) return

    const floatingElements = document.querySelectorAll('.floating-source')
    floatingElements.forEach((el, index) => {
      const element = el as HTMLElement
      const duration = 4 + index * 0.5
      const delay = index * 0.2
      element.style.animation = `floatSource ${duration}s ease-in-out ${delay}s infinite`
    })
  }, [isVisible])

  const sources = [
    { title: "E-commerce Solutions", type: "Web Dev", source: "Next.js/React", date: "Latest", relevance: 100 },
    { title: "Custom ERP Software", type: "Software", source: "Node.js/Python", date: "Stable", relevance: 98 },
    { title: "IoT Smart Monitoring", type: "IoT", source: "Arduino/ESP32", date: "Advanced", relevance: 95 },
    { title: "Student Project Hub", type: "Education", source: "All Stacks", date: "24/7", relevance: 100 },
  ]

  return (
    <section ref={sectionRef} className="py-16 md:py-32 px-4 relative overflow-hidden">
      <style jsx>{`
        @keyframes floatSource {
          0%, 100% { transform: translateY(0px) rotate(0deg) translateZ(0); }
          50% { transform: translateY(-15px) rotate(1deg) translateZ(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1) translateZ(0); }
          50% { opacity: 0.8; transform: scale(1.05) translateZ(0); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) translateZ(0); }
          100% { transform: translateX(100%) translateZ(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg) translateZ(0); }
          to { transform: rotate(360deg) translateZ(0); }
        }
        @keyframes borderPulse {
          0%, 100% { border-color: rgba(139, 92, 246, 0.2); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
          50% { border-color: rgba(139, 92, 246, 0.6); box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px) translateZ(0); }
          to { opacity: 1; transform: translateX(0) translateZ(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) translateZ(0); }
          to { opacity: 1; transform: translateY(0) translateZ(0); }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to { width: var(--target-width); }
        }
        .glass-card-strong {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, border-color 0.3s ease, background 0.3s ease;
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .glow-border {
          position: relative;
          transform: translateZ(0);
        }
        .glow-border::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3), rgba(6, 182, 212, 0.3));
          border-radius: 1.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
          transform: translateZ(0);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #a855f7, #ec4899, #06b6d4);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientShift 3s ease infinite;
          transform: translateZ(0);
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .border-animate {
          animation: borderPulse 2s ease-in-out infinite;
        }
        .source-card {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease, box-shadow 0.3s ease;
          transform: translateZ(0);
          will-change: transform;
        }
        .source-card:hover {
          transform: translateY(-4px) scale(1.02) translateZ(0);
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.1));
        }
        .progress-fill {
          animation: progressFill 1s ease-out forwards;
        }
        .floating-source {
          will-change: transform;
        }
      `}</style>

      {/* Animated Background Decorations */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl floating-source" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-3xl floating-source" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-3xl animate-spin-slow" />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.4) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content with animated text */}
          <div 
            className={`transition-[opacity,transform] duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} text-center lg:text-left`}
            style={{ transform: isVisible ? 'translateX(0) translateZ(0)' : 'translateX(-40px) translateZ(0)' }}
          >
            {/* Animated badge */}
            <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 mb-6 border-animate">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-purple-400 text-sm font-medium">Digital Excellence</span>
              <Zap className="w-3 h-3 text-yellow-500" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight">
              Innovative
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight">
              <span className="text-gradient">Solutions for Your</span>
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Digital Growth
            </h2>
            
            {/* Animated stats row */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white leading-none">500+</div>
                  <div className="text-[10px] sm:text-xs text-gray-400 mt-1 uppercase tracking-wider">Projects</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white leading-none">98%</div>
                  <div className="text-[10px] sm:text-xs text-gray-400 mt-1 uppercase tracking-wider">Happy Clients</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white leading-none">24/7</div>
                  <div className="text-[10px] sm:text-xs text-gray-400 mt-1 uppercase tracking-wider">Support</div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Empowering startups, businesses, and students with custom web apps, professional UI/UX, and innovative IoT solutions.
            </p>
            
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full px-10 py-6 text-lg font-semibold shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 group">
                Get started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right - Interactive Visual Dashboard */}
          <div 
            className={`transition-[opacity,transform] duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            style={{ transform: isVisible ? 'translateX(0) translateZ(0)' : 'translateX(40px) translateZ(0)' }}
          >
            <div className="relative">
              {/* Animated floating badges */}
              <div className="absolute -top-4 -left-4 z-10 floating-source" style={{ animationDelay: '0.3s' }}>
                <Link href="/services">
                <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2 shadow-lg hover:scale-105 transition-transform cursor-pointer">
                  <Database className="w-4 h-4 text-purple-400" />
                  <span className="text-white text-sm font-medium">50+ Tech Stacks</span>
                </div>
                </Link>
              </div>
              
              <div className="absolute -top-4 right-4 z-10 floating-source" style={{ animationDelay: '0.6s' }}>
                <Link href="/projects">
                <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2 shadow-lg hover:scale-105 transition-transform cursor-pointer">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span className="text-white text-sm font-medium">View Portfolio</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </div>
                </Link>
              </div>

              {/* Main Card */}
              <div className="glass-card-strong rounded-3xl p-6 glow-border relative">
                {/* Search Bar with animated typing effect */}
                <div className="glass-card rounded-2xl p-4 mb-6 flex items-center justify-between group cursor-pointer hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                    <span className="text-white">
                      {fetchingStatus === "fetching" ? (
                        <span className="flex items-center gap-1">
                          Drafting Project Plan
                          <span className="animate-pulse">.</span>
                          <span className="animate-pulse delay-100">.</span>
                          <span className="animate-pulse delay-200">.</span>
                        </span>
                      ) : (
                        "Describe your project idea..."
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-400 text-sm">Send Brief</span>
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Building your project roadmap...</span>
                    <span className="text-purple-400">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-pink-500 rounded-full transition-all duration-200 relative overflow-hidden"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </div>
                  </div>
                  {fetchingStatus === "complete" && (
                    <div className="text-xs text-green-400 mt-1 animate-pulse flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Roadmap Ready! Let's start building.
                    </div>
                  )}
                </div>

                {/* From the web with animated icon */}
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-4 h-4 text-gray-400 animate-spin-slow" style={{ animationDuration: '10s' }} />
                  <span className="text-gray-400 text-sm">Our Expertise</span>
                  <span className="text-xs text-purple-400 ml-auto">
                    {fetchingStatus === "complete" ? "Ready to launch" : "Live consultation"}
                  </span>
                </div>

                {/* Interactive Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {sources.map((source, i) => (
                    <div 
                      key={i}
                      className={`glass-card rounded-xl p-4 transition-all duration-300 cursor-pointer source-card ${hoveredCard === i ? 'shadow-lg shadow-purple-500/20' : ''}`}
                      onMouseEnter={() => setHoveredCard(i)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={() => setActiveSource(source.title)}
                      style={{
                        animation: isVisible ? `fadeInUp 0.4s ease-out ${0.2 + i * 0.1}s forwards` : 'none',
                        opacity: 0
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                        <span className="text-[10px] text-gray-500">{source.date}</span>
                      </div>
                      <div className="h-2 bg-purple-500/30 rounded w-3/4 mb-2" />
                      <div className="h-2 bg-purple-500/20 rounded w-1/2 mb-3" />
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-500">{source.source}</span>
                        <span className="text-[10px] text-green-400">{source.relevance}% match</span>
                      </div>
                      {hoveredCard === i && (
                        <div className="mt-2 text-[10px] text-purple-400 flex items-center gap-1 animate-pulse">
                          <LinkIcon className="w-2 h-2" />
                          Explore service
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Interactive Tags */}
                <div className="flex flex-wrap gap-2">
                  {["Web Development", "UI/UX Design", "Software Dev", "IoT Projects"].map((tag, i) => (
                    <div 
                      key={i}
                      className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-purple-500/20"
                      style={{
                        animation: isVisible ? `fadeInUp 0.3s ease-out ${0.6 + i * 0.1}s forwards` : 'none',
                        opacity: 0
                      }}
                    >
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      <span className="text-purple-400 text-xs">{tag}</span>
                    </div>
                  ))}
                </div>

                {/* Live indicator */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] text-gray-500">Active Solution Partner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}