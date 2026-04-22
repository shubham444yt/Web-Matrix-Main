"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Zap, Globe, ArrowRight, Code, Palette, Cpu, Rocket } from "lucide-react"

function Particle({ delay, size, left, top }: { delay: number; size: number; left: string; top: string }) {
  return (
    <div
      className="absolute rounded-full bg-purple-500/30 animate-particle"
      style={{
        width: size,
        height: size,
        left,
        top,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

function OrbitingIcon({ icon: Icon, delay, reverse }: { icon: React.ElementType; delay: number; reverse?: boolean }) {
  return (
    <div
      className={`absolute w-12 h-12 rounded-xl glass-card flex items-center justify-center ${reverse ? 'animate-orbit-reverse' : 'animate-orbit'}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <Icon className="w-5 h-5 text-purple-400" />
    </div>
  )
}

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen pt-28 pb-20 overflow-hidden flex items-center">
      <style jsx>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(2deg); }
        }
        @keyframes glow-intense {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.4)); transform: scale(1); }
          50% { filter: drop-shadow(0 0 50px rgba(168, 85, 247, 0.7)); transform: scale(1.02); }
        }
        .animate-float-gentle {
          animation: float-gentle 10s ease-in-out infinite;
        }
        .animate-glow-intense {
          animation: glow-intense 5s ease-in-out infinite;
        }
        .hero-image-glow::after {
          content: '';
          position: absolute;
          inset: -50px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%);
          z-index: -1;
          pointer-events: none;
        }
      `}</style>

      {/* Animated Background Effects */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0.05) 40%, transparent 70%)',
            transform: `translate(calc(-50% + ${mousePosition.x}px), ${mousePosition.y}px)`,
          }}
        />
        
        {/* Floating particles - Using deterministic positions */}
        {[
          { delay: 0, size: 4, left: "10%", top: "20%" },
          { delay: 0.5, size: 6, left: "85%", top: "15%" },
          { delay: 1, size: 3, left: "25%", top: "80%" },
          { delay: 1.5, size: 5, left: "70%", top: "75%" },
          { delay: 2, size: 4, left: "5%", top: "50%" },
          { delay: 2.5, size: 7, left: "95%", top: "45%" },
          { delay: 3, size: 3, left: "40%", top: "10%" },
          { delay: 3.5, size: 5, left: "60%", top: "90%" },
          { delay: 4, size: 4, left: "15%", top: "65%" },
          { delay: 4.5, size: 6, left: "80%", top: "30%" },
        ].map((particle, i) => (
          <Particle
            key={i}
            delay={particle.delay}
            size={particle.size}
            left={particle.left}
            top={particle.top}
          />
        ))}
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 z-10 pl-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2.5 mb-8 animate-slide-up border-white/10 glow-border">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_#22c55e]" />
              <span className="text-sm font-medium text-gray-300">Next-Gen Digital Solutions</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight text-left">
              <span className="block mb-1 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Building
              </span>
              <span 
                className="block text-gradient animate-text-glow animate-slide-up" 
                style={{ animationDelay: '0.2s' }}
              >
                Future-Ready
              </span>
              <span className="block animate-slide-up" style={{ animationDelay: '0.3s' }}>
                Web & Software Experiences
              </span>
            </h1>
            
            <p 
              className="text-gray-400 text-base md:text-lg max-w-xl text-left mb-8 leading-relaxed animate-slide-up"
              style={{ animationDelay: '0.4s' }}
            >
              We design, build, and scale innovative products with 
              leading-edge technology. Empower your business with the latest in 
              AI, cloud infrastructure, and human-centric design.
            </p>
            
            <div 
              className="flex flex-col sm:flex-row items-center justify-start gap-4 animate-slide-up mb-10"
              style={{ animationDelay: '0.5s' }}
            >
              <Link href="/contact">
                <Button className="relative group bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 overflow-hidden border-t border-white/20">
                  <span className="relative z-10 flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    Get Started
                  </span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" className="rounded-full px-8 py-6 text-lg font-semibold border-purple-500/30 text-white hover:bg-white/5 hover:border-purple-500/60 transition-all duration-300 hover:scale-105 glass-card-strong">
                  Our Portfolio
                </Button>
              </Link>
            </div>

            {/* Social Proof Benchmarks */}
            <div 
              className="flex flex-wrap items-center gap-6 animate-slide-up"
              style={{ animationDelay: '0.7s' }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#050510] bg-gray-800 flex items-center justify-center overflow-hidden">
                      <div className={`w-full h-full bg-gradient-to-br from-purple-${i*200} to-pink-${i*200}`} />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="text-white font-bold block">Trusted by 50+ clients</span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <Sparkles key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />)}
                  </div>
                </div>
              </div>
              <div className="h-10 w-px bg-white/10 hidden sm:block" />
              <div className="text-sm">
                <div className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-bold">Delivered 100+ projects</span>
                </div>
                <span className="text-gray-500">Across 12 industries</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Object Asset */}
          <div className={`relative flex items-center justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative w-full max-w-[600px] aspect-square">
              {/* Outer Glow Circles */}
              <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-[100px] animate-pulse-glow" />
              <div className="absolute inset-20 rounded-full bg-pink-500/5 blur-[80px] animate-float-delayed" />
              
              {/* Orbiting Elements */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[15%] right-[10%] animate-float" style={{ animationDelay: '1s' }}>
                  <OrbitingIcon icon={Cpu} delay={0} />
                </div>
                <div className="absolute bottom-[20%] left-[5%] animate-float-delayed" style={{ animationDelay: '0.5s' }}>
                  <OrbitingIcon icon={Code} delay={2} />
                </div>
                <div className="absolute top-[40%] left-[8%] animate-float-delayed-2" style={{ animationDelay: '0.2s' }}>
                  <OrbitingIcon icon={Palette} delay={4} />
                </div>
              </div>

              {/* Main bg Image */}
              <div className="relative z-10 w-full h-full hero-image-glow animate-float-gentle flex items-center justify-center p-6">
                <img 
                  src="/bgx.png" 
                  alt="Holographic Tech Display" 
                  className="w-full h-full object-contain animate-glow-intense rounded-2xl mb-2"
                />
                
                {/* Overlay Floating Interaction Label */}
                <div className="absolute bottom-[10%] right-[10%] glass-card rounded-2xl p-4 glow-border animate-slide-up pointer-events-auto hover-lift backdrop-blur-3xl border-purple-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center shadow-lg">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-white font-bold text-sm block">Ultra Efficient</span>
                      <span className="text-gray-400 text-xs">AI-Powered Systems</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
 <br/><br/><br/>
        {/* Hero Visual - 3D Orb with Orbiting Elements */}
        <div className="relative max-w-4xl mx-auto mt-20">
          {/* Central Beam Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-48">
            <div className="w-full h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent animate-pulse-glow" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
          </div>
          
          {/* Main Glowing Orb */}
          <div className="relative flex items-center justify-center py-20">
            {/* Outer ring */}
            <div className="absolute w-[400px] h-[400px] rounded-full border border-purple-500/20 animate-spin-slow" />
            <div className="absolute w-[350px] h-[350px] rounded-full border border-pink-500/10" style={{ animation: 'spin-slow 25s linear infinite reverse' }} />
            
            {/* Orbiting icons */}
            <div className="absolute w-[300px] h-[300px]">
              <OrbitingIcon icon={Code} delay={0} />
              <OrbitingIcon icon={Palette} delay={3.75} />
              <OrbitingIcon icon={Cpu} delay={7.5} />
              <OrbitingIcon icon={Rocket} delay={11.25} />
            </div>
            
            {/* Central orb */}
            <div className="relative w-48 h-48 animate-float-slow">
              {/* Glow layers */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 via-purple-500/30 to-pink-500/30 blur-2xl animate-pulse-glow" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-400/40 via-purple-500/40 to-pink-500/40 blur-xl" />
              
              {/* Main orb */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 animate-gradient" />
              <div className="absolute inset-2 rounded-full bg-[#050510]" />
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-cyan-400/80 via-purple-500/80 to-pink-500/80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
              </div>
              
              {/* Inner glow */}
              <div className="absolute inset-10 rounded-full bg-gradient-to-br from-cyan-300 to-purple-400 opacity-60 blur-sm" />
              
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full border border-cyan-400/50 animate-ripple" />
              <div className="absolute inset-0 rounded-full border border-purple-400/50 animate-ripple" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>

          {/* Feature Cards Around Orb */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Left Card */}
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 pointer-events-auto animate-float"
              style={{ animationDelay: '0s' }}
            >
              <div className="glass-card glow-border rounded-2xl p-5 max-w-[200px] hover-lift card-shine">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm">Web Development</span>
                </div>
                <p className="text-gray-400 text-xs">Modern, responsive websites built with cutting-edge technology</p>
              </div>
            </div>
            
            {/* Right Card */}
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-auto animate-float-delayed"
            >
              <div className="glass-card glow-border rounded-2xl p-5 max-w-[200px] hover-lift card-shine">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm">AI Solutions</span>
                </div>
                <p className="text-gray-400 text-xs">Intelligent automation and machine learning integration</p>
              </div>
            </div>
            
            {/* Bottom Card */}
            <div 
              className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 translate-y-1/4 pointer-events-auto animate-float-delayed-2"
            >
              <div className="glass-card glow-border rounded-2xl p-5 max-w-[220px] hover-lift card-shine">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm">UI/UX Design</span>
                </div>
                <p className="text-gray-400 text-xs">Beautiful, intuitive interfaces that users love</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-48 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "100+", label: "Projects Completed" },
            { value: "50+", label: "Happy Clients" },
            { value: "5+", label: "Years Experience" },
            { value: "24/7", label: "Support Available" },
          ].map((stat, i) => (
            <div 
              key={i}
              className="glass-card rounded-2xl p-6 text-center hover-lift card-shine animate-slide-up"
              style={{ animationDelay: `${0.6 + i * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

