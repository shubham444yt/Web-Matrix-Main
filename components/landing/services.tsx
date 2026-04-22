"use client"

import { useEffect, useRef, useState } from "react"
import { 
  Globe, 
  Clipboard, 
  Palette, 
  Code2, 
  Cpu, 
  GraduationCap, 
  Smartphone,
  ArrowRight,
  Check,
  Sparkles,
  Zap,
  TrendingUp,
  Rocket,
  Shield,
  Clock,
  Star
} from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom websites and web applications built with cutting-edge technologies for optimal performance and user experience.",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Secure & Scalable"],
    gradient: "from-purple-500 to-violet-500",
    bgGradient: "from-purple-500/10 to-violet-500/10",
    metric: "150+ Projects",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that delight users and drive engagement through thoughtful design principles.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-500/10 to-rose-500/10",
    metric: "98% Satisfaction",
  },
  {
    icon: Code2,
    title: "Software Development",
    description: "Robust software solutions tailored to your business needs, from enterprise applications to startup MVPs.",
    features: ["Custom Solutions", "API Development", "Cloud Integration", "Maintenance"],
    gradient: "from-cyan-500 to-blue-500",
    bgGradient: "from-cyan-500/10 to-blue-500/10",
    metric: "99% Uptime",
  },
  {
    icon: Cpu,
    title: "IoT Projects",
    description: "Connected devices and smart systems that bridge the physical and digital worlds for automation and efficiency.",
    features: ["Hardware Integration", "Real-time Data", "Remote Control", "Analytics"],
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    metric: "10k+ Devices",
  },
  {
    icon: GraduationCap,
    title: "College Projects",
    description: "Expert assistance for students on academic projects, from simple assignments to complex research implementations.",
    features: ["Technical Guidance", "Code Review", "Documentation", "Presentation Help"],
    gradient: "from-orange-500 to-amber-500",
    bgGradient: "from-orange-500/10 to-amber-500/10",
    metric: "500+ Students",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications that deliver exceptional experiences on iOS and Android.",
    features: ["Native & Hybrid", "App Store Ready", "Push Notifications", "Offline Support"],
    gradient: "from-violet-500 to-purple-500",
    bgGradient: "from-violet-500/10 to-purple-500/10",
    metric: "1M+ Downloads",
  },
]

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [particlePositions, setParticlePositions] = useState<Array<{ x: number; y: number; delay: number }>>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          generateParticles()
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
    for (let i = 0; i < 50; i++) {
      positions.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5
      })
    }
    setParticlePositions(positions)
  }

  // Auto-rotate through process steps
  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === null ? 0 : (prev + 1) % 4))
    }, 3000)
    return () => clearInterval(interval)
  }, [isVisible])

  const processSteps = [
    { step: "01", title: "Discovery", desc: "Understanding your vision and requirements", icon: Rocket, longDesc: "We dive deep into your business goals, target audience, and technical requirements." },
    { step: "02", title: "Planning", desc: "Creating detailed roadmap and strategy", icon: Clipboard, longDesc: "We develop a comprehensive project plan with timelines, milestones, and resource allocation." },
    { step: "03", title: "Development", desc: "Building with best practices and care", icon: Code2, longDesc: "Our team crafts high-quality code with regular updates and transparent communication." },
    { step: "04", title: "Delivery", desc: "Launch, support, and continuous improvement", icon: Rocket, longDesc: "We ensure smooth deployment, provide training, and offer ongoing maintenance." },
  ]

  return (
    <section ref={sectionRef} className="py-8 px-4 relative overflow-hidden">
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
        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 0; }
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
        .rotate-animation {
          animation: rotateSlow 20s linear infinite;
        }
        .animate-border-flow {
          animation: borderFlow 2s ease-in-out infinite;
        }
        .service-card-active {
          animation: cardGlow 2s ease-in-out infinite;
          border-color: rgba(139, 92, 246, 0.5);
          transform: scale(1.02);
        }
        .step-ring {
          position: relative;
        }
        .step-ring::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0.8);
          opacity: 0;
          transition: all 0.3s ease;
        }
        .step-ring.active::before {
          animation: pulseRing 1.5s ease-out infinite;
        }
        .metric-badge {
          transition: all 0.3s ease;
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
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-3xl rotate-animation" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-pink-600/8 rounded-full blur-3xl rotate-animation" style={{ animationDirection: 'reverse' }} />
      <div className="absolute top-40 left-1/3 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-40 right-1/3 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, rgba(139, 92, 246, 0.2) 0px, rgba(139, 92, 246, 0.2) 1px, transparent 1px, transparent 25px)`,
          backgroundSize: '35px 35px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header with animations */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-6 group cursor-pointer animate-border-flow">
            <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />
            <span className="text-sm text-purple-400 font-medium">What We Offer</span>
            <Zap className="w-3 h-3 text-yellow-400 group-hover:scale-110 transition-transform" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-gradient">Services</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full animate-pulse" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-6">
            Comprehensive digital solutions designed to transform your ideas into reality 
            and drive your business forward.
          </p>
        </div>

        {/* Services Grid with animated cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div 
              key={i}
              className={`glass-card rounded-3xl p-8 hover-lift card-shine group cursor-pointer relative overflow-hidden transition-all duration-700 ${
                hoveredCard === i ? 'service-card-active' : ''
              }`}
              style={{ 
                transitionDelay: `${i * 100}ms`,
                animation: isVisible ? `slideUp 0.5s ease-out ${i * 0.1}s forwards` : 'none',
                opacity: 0 
              }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Animated Background glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative">
                {/* Icon with animation */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg transition-all duration-300 ${
                  hoveredCard === i ? 'scale-110 rotate-6 shadow-xl' : 'group-hover:scale-110'
                }`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title with gradient on hover */}
                <h3 className={`text-2xl font-bold text-white mb-3 transition-all duration-300 ${
                  hoveredCard === i ? 'text-gradient' : 'group-hover:text-gradient'
                }`}>
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features with checkmarks */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-300 text-sm">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        hoveredCard === i ? 'scale-110' : ''
                      }`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Metric badge */}
                <div className={`absolute top-4 right-4 glass-card rounded-full px-3 py-1 metric-badge ${
                  hoveredCard === i ? 'opacity-100 scale-105' : 'opacity-70'
                }`}>
                  <span className="text-xs text-purple-400">{service.metric}</span>
                </div>

                {/* CTA with animated arrow */}
                <Link 
                  href="#contact"
                  className={`inline-flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent transition-all duration-300 ${
                    hoveredCard === i ? 'gap-3' : 'group-hover:gap-3'
                  }`}
                >
                  Learn More
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                    hoveredCard === i ? 'translate-x-1' : 'group-hover:translate-x-1'
                  }`} style={{ stroke: 'url(#gradient)' }} />
                </Link>
              </div>

              {/* Hover indicator */}
              {hoveredCard === i && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
              )}
            </div>
          ))}
        </div>

         {/* Process Section */}
        <div className={`mt-32 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="text-gradient">Process</span>
            </h3>
            <p className="text-gray-400">How we turn your vision into reality</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-30" />
            
            {[
              { step: "01", title: "Discovery", desc: "Understanding your vision and requirements" },
              { step: "02", title: "Planning", desc: "Creating detailed roadmap and strategy" },
              { step: "03", title: "Development", desc: "Building with best practices and care" },
              { step: "04", title: "Delivery", desc: "Launch, support, and continuous improvement" },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                {/* Step number */}
                <div className="w-24 h-24 rounded-full glass-card-strong mx-auto mb-6 flex items-center justify-center relative animate-glow-pulse">
                  <span className="text-3xl font-bold text-gradient">{item.step}</span>
                </div>
                <h4 className="text-white font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
         </section>
  )
}