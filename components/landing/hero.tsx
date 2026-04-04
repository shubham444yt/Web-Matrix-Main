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
    <section ref={heroRef} className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0.05) 40%, transparent 70%)',
            transform: `translate(calc(-50% + ${mousePosition.x}px), ${mousePosition.y}px)`,
          }}
        />
        <div 
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 60%)',
          }}
        />
        <div 
          className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full animate-float-delayed"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 60%)',
          }}
        />
        
        {/* Floating particles - using deterministic positions */}
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
          { delay: 5, size: 3, left: "50%", top: "5%" },
          { delay: 5.5, size: 5, left: "30%", top: "40%" },
          { delay: 6, size: 4, left: "75%", top: "60%" },
          { delay: 6.5, size: 6, left: "20%", top: "35%" },
          { delay: 7, size: 3, left: "90%", top: "85%" },
          { delay: 7.5, size: 5, left: "45%", top: "55%" },
          { delay: 8, size: 4, left: "65%", top: "25%" },
          { delay: 8.5, size: 6, left: "35%", top: "95%" },
          { delay: 9, size: 3, left: "55%", top: "70%" },
          { delay: 9.5, size: 5, left: "8%", top: "88%" },
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
      
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Hero Content */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2.5 mb-8 animate-slide-up">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-gray-300">Next-Gen Digital Solutions</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
            <span className="block animate-slide-up" style={{ animationDelay: '0.1s' }}>
              The Future of
            </span>
            <span 
              className="block text-gradient animate-text-glow animate-slide-up" 
              style={{ animationDelay: '0.2s' }}
            >
              Web & Software
            </span>
            <span className="block animate-slide-up" style={{ animationDelay: '0.3s' }}>
              Innovation
            </span>
          </h1>
          
          <p 
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            We craft cutting-edge digital experiences through innovative Web Development, 
            stunning UI/UX Design, robust Software Solutions, and transformative IoT Projects.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
            style={{ animationDelay: '0.5s' }}
          >
            <Link href="/contact">
              <Button className="relative group bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white rounded-full px-10 py-7 text-lg font-semibold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 animate-shimmer" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" className="rounded-full px-10 py-7 text-lg font-semibold border-purple-500/30 text-white hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
<br/> <br/> <br/> <br/>
        {/* Hero Visual - 3D Orb with Orbiting Elements */}
        <div className="relative max-w-4xl mx-auto">
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
            
            <br/>
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
<br/><br/><br/>
        {/* Stats */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-6">
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
