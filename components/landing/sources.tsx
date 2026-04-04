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
      { threshold: 0.1 }
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
    { title: "Product-Led Growth Report 2024", type: "Research Paper", source: "Gartner", date: "2 days ago", relevance: 98 },
    { title: "The Future of AI in SaaS", type: "Industry Report", source: "McKinsey", date: "1 week ago", relevance: 95 },
    { title: "User Behavior Analytics", type: "Case Study", source: "Harvard BR", date: "3 days ago", relevance: 92 },
    { title: "Market Trends Q1 2024", type: "Market Analysis", source: "Forrester", date: "5 days ago", relevance: 89 },
  ]

  return (
    <section ref={sectionRef} className="py-32 px-4 relative overflow-hidden">
      <style jsx>{`
        @keyframes floatSource {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes borderPulse {
          0%, 100% { border-color: rgba(139, 92, 246, 0.2); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
          50% { border-color: rgba(139, 92, 246, 0.6); box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to { width: var(--target-width); }
        }
        .glass-card-strong {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glow-border {
          position: relative;
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
        }
        .glow-border:hover::before {
          opacity: 1;
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
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .source-card:hover {
          transform: translateY(-4px) scale(1.02);
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.1));
        }
        .progress-fill {
          animation: progressFill 1s ease-out forwards;
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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content with animated text */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Animated badge */}
            <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 mb-6 border-animate">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-purple-400 text-sm font-medium">AI-Powered Discovery</span>
              <Zap className="w-3 h-3 text-yellow-500" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
              Get the best
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
              <span className="text-gradient">sources for your</span>
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              reports
            </h2>
            
            {/* Animated stats row */}
            <div className="flex gap-8 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">10k+</div>
                  <div className="text-xs text-gray-400">Sources indexed</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">99%</div>
                  <div className="text-xs text-gray-400">Accuracy rate</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">&lt;2s</div>
                  <div className="text-xs text-gray-400">Response time</div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-lg">
              An LLM agent that understands what your research is about and finds you the most relevant content.
            </p>
            
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full px-10 py-6 text-lg font-semibold shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 group">
                Get started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right - Interactive Visual Dashboard */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Animated floating badges */}
              <div className="absolute -top-4 -left-4 z-10 floating-source" style={{ animationDelay: '0.3s' }}>
                <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2 shadow-lg hover:scale-105 transition-transform cursor-pointer">
                  <Database className="w-4 h-4 text-purple-400" />
                  <span className="text-white text-sm font-medium">500+ sources</span>
                </div>
              </div>
              
              <div className="absolute -top-4 right-4 z-10 floating-source" style={{ animationDelay: '0.6s' }}>
                <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2 shadow-lg hover:scale-105 transition-transform cursor-pointer">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span className="text-white text-sm font-medium">Find similar content</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </div>
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
                          Searching
                          <span className="animate-pulse">.</span>
                          <span className="animate-pulse delay-100">.</span>
                          <span className="animate-pulse delay-200">.</span>
                        </span>
                      ) : (
                        "Upload content or enter query..."
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-400 text-sm">Upward fetch</span>
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Analyzing content sources...</span>
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
                      Analysis complete! Found 24 relevant sources
                    </div>
                  )}
                </div>

                {/* From the web with animated icon */}
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-4 h-4 text-gray-400 animate-spin-slow" style={{ animationDuration: '10s' }} />
                  <span className="text-gray-400 text-sm">From the web</span>
                  <span className="text-xs text-purple-400 ml-auto">
                    {fetchingStatus === "complete" ? "Updated just now" : "Live feed"}
                  </span>
                </div>

                {/* Interactive Content Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
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
                          View source
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Interactive Tags */}
                <div className="flex flex-wrap gap-2">
                  {["Product led growth", "Market Research", "AI Analytics", "User Insights"].map((tag, i) => (
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
                  <span className="text-[10px] text-gray-500">Live AI Agent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}