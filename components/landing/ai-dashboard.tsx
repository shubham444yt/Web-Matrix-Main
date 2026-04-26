"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, CheckCircle2, Zap, MessageSquare, Globe, Send, Mic, Paperclip, MoreHorizontal, Bot, User, TrendingUp, Brain, Cpu, Loader2, Database, FileText } from "lucide-react"

export function AIDashboard() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<string>("chat")
  const [chatMessage, setChatMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [displayMessage, setDisplayMessage] = useState("")
  const [messageIndex, setMessageIndex] = useState(0)
  const [particlePositions, setParticlePositions] = useState<Array<{ x: number; y: number; delay: number }>>([])

  const fullMessage = "Web Matrix is a digital solutions company that helps businesses create 1000x more value than they put in. We specialize in web development, ui/ux design, software development, iot projects, and college projects. We are a team of passionate developers who are dedicated to providing our clients with the best possible solutions."

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          generateParticles()
          startTypingAnimation()
        }
      },
      { threshold: 0.01, rootMargin: '100px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const generateParticles = () => {
    const positions = []
    for (let i = 0; i < 30; i++) {
      positions.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5
      })
    }
    setParticlePositions(positions)
  }

  const startTypingAnimation = () => {
    setIsTyping(true)
    setMessageIndex(0)
    setDisplayMessage("")
  }

  useEffect(() => {
    if (!isTyping || messageIndex >= fullMessage.length) {
      if (messageIndex >= fullMessage.length) {
        setIsTyping(false)
      }
      return
    }

    const timeout = setTimeout(() => {
      setDisplayMessage(prev => prev + fullMessage[messageIndex])
      setMessageIndex(prev => prev + 1)
    }, 30)

    return () => clearTimeout(timeout)
  }, [messageIndex, isTyping, fullMessage])

  // Animate squares in sequence
  useEffect(() => {
    if (!isVisible) return
    const squares = document.querySelectorAll('.animated-square')
    squares.forEach((square, idx) => {
      const element = square as HTMLElement
      element.style.animation = `squarePulse 2s ease-in-out ${idx * 0.15}s infinite`
    })
  }, [isVisible])

  const squares = [
    { gradient: "from-purple-600 to-purple-500", label: "Market Analysis", icon: TrendingUp },
    { gradient: "from-purple-500 to-purple-400", label: "Trend Detection", icon: Zap },
    { gradient: "from-purple-400 to-purple-300", label: "Predictive AI", icon: Brain },
    { gradient: "from-pink-600 to-pink-500", label: "Data Mining", icon: Database },
    { gradient: "from-pink-500 to-pink-400", label: "NLP Processing", icon: MessageSquare },
    { gradient: "from-pink-400 to-pink-300", label: "Auto Reports", icon: FileText },
  ]

  return (
    <section ref={sectionRef} className="py-32 px-4 relative overflow-hidden">
      <style jsx>{`
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
          25% { transform: translate(15px, -20px) scale(1.2); opacity: 0.4; }
          50% { transform: translate(-10px, -35px) scale(0.8); opacity: 0.3; }
          75% { transform: translate(20px, -15px) scale(1.1); opacity: 0.5; }
        }
        @keyframes squarePulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.3); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 8px rgba(139, 92, 246, 0.1); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes borderFlow {
          0% { border-color: rgba(139, 92, 246, 0.2); }
          50% { border-color: rgba(139, 92, 246, 0.6); }
          100% { border-color: rgba(139, 92, 246, 0.2); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
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
        .glow-border-strong {
          position: relative;
        }
        .glow-border-strong::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.4), rgba(6, 182, 212, 0.4));
          border-radius: 1.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        .typing-cursor {
          display: inline-block;
          width: 2px;
          height: 14px;
          background-color: #a855f7;
          margin-left: 2px;
          animation: blink 1s infinite;
          vertical-align: middle;
        }
        .animated-square {
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }
        .animated-square:hover {
          transform: scale(1.15) rotate(2deg);
        }
        .chat-bubble {
          animation: slideInRight 0.3s ease-out;
        }
        .wave-animation {
          animation: wave 1s ease-in-out infinite;
        }
        .rotate-animation {
          animation: rotateSlow 20s linear infinite;
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
              animation: `floatParticle 4s ease-in-out ${pos.delay}s infinite`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Background Decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/8 rounded-full blur-3xl rotate-animation" />
      <div className="absolute top-20 right-20 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main Dashboard Card */}
          <div className="glass-card-strong rounded-3xl p-8 glow-border-strong relative overflow-hidden">
            {/* Animated decorative glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-40 bg-gradient-to-b from-purple-500/20 to-transparent blur-2xl animate-pulse" />
            
            {/* Tags Row with interactive hover */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="glass-card rounded-full px-5 py-2.5 flex items-center gap-2 group cursor-pointer hover:border-purple-500/50 transition-all duration-300">
                <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />
                <span className="text-white text-sm">Harnessing AI for market</span>
                <Brain className="w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="glass-card rounded-full px-5 py-2.5 flex items-center gap-2 group cursor-pointer hover:border-yellow-500/50 transition-all duration-300">
                <Zap className="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 text-sm">Data analysis & insights</span>
              </div>
              <div className="glass-card rounded-full px-5 py-2.5 flex items-center gap-2 group cursor-pointer hover:border-cyan-500/50 transition-all duration-300">
                <Cpu className="w-4 h-4 text-cyan-400 group-hover:animate-spin" style={{ animationDuration: '2s' }} />
                <span className="text-gray-300 text-sm">Real-time processing</span>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6 border-b border-white/10 pb-3">
              {["chat", "insights", "history"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-gray-400">AI Agent Active</span>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left - AI visualization with animated squares */}
              <div className="glass-card rounded-2xl p-6 bg-white/5">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                  <span className="text-white">How AI is revolutionizing</span>
                  <TrendingUp className="w-4 h-4 text-green-400 ml-auto" />
                </div>
                
                {/* Animated Color dots grid */}
                <div className="grid grid-cols-3 gap-4 justify-items-center py-4">
                  {squares.map((square, i) => (
                    <div 
                      key={i}
                      className={`animated-square w-16 h-16 rounded-2xl bg-gradient-to-br ${square.gradient} border-2 border-purple-500/30 shadow-lg shadow-purple-500/20 flex items-center justify-center transition-all duration-300`}
                      onMouseEnter={() => setHoveredSquare(i)}
                      onMouseLeave={() => setHoveredSquare(null)}
                    >
                      <square.icon className="w-7 h-7 text-white/90" />
                      {hoveredSquare === i && (
                        <span className="text-[10px] text-white font-medium text-center absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/50 px-2 py-0.5 rounded-full">
                          {square.label}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Live metrics */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Processing speed</span>
                    <span className="text-green-400">↑ 156%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-3">
                    <span>Data sources analyzed</span>
                    <span className="text-purple-400">1,247</span>
                  </div>
                </div>
              </div>

              {/* Right - Animated Chat interface */}
              <div className="glass-card rounded-2xl p-6 bg-white/5">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-white font-semibold">Web Matrix's AI</span>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-[10px] text-gray-400">Online</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <MoreHorizontal className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons with animations */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <button className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/30">
                    <Sparkles className="w-4 h-4" />
                    About Web Matrix
                  </button>
                </div>

                {/* Animated Chat message with typing effect */}
                <div className="glass-card rounded-xl p-4 mb-6 bg-white/5 chat-bubble">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {displayMessage}
                        {isTyping && <span className="typing-cursor" />}
                      </p>
                      {!isTyping && displayMessage && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-green-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Analysis complete • Start from today.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Input area with interactions */}
                <div className="glass-card rounded-xl p-3 flex items-center justify-between bg-white/5 group focus-within:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3 flex-1">
                    <MessageSquare className="w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Ask me anything about your research..."
                      className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110">
                      <Paperclip className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110">
                      <Mic className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110">
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Suggested prompts */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Market trends Q1", "Competitor analysis", "Growth strategies"].map((prompt, i) => (
                    <button
                      key={i}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300"
                      onClick={() => setChatMessage(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span>AI Processing</span>
                </div>
                <div className="flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Analyzing data streams</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span>Last updated: Just now</span>
                <div className="w-1 h-1 rounded-full bg-gray-600" />
                <span>v2.4.1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}