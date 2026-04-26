"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Quote, Star, Sparkles, Heart, User, Briefcase, Award, TrendingUp, Zap } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO at TechStart",
    company: "TechStart",
    content: "Web Matrix transformed our digital presence completely. Their team delivered an exceptional website that exceeded all expectations. Highly recommend!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    gradient: "from-purple-500 to-pink-500",
    metric: "+156% ROI",
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateCo",
    content: "The UI/UX design work was phenomenal. They understood our vision perfectly and created an interface that our users absolutely love.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    gradient: "from-cyan-500 to-blue-500",
    metric: "98% satisfaction",
  },
  {
    name: "Emily Rodriguez",
    role: "Founder at StartupX",
    company: "StartupX",
    content: "Working with Web Matrix on our IoT project was a game-changer. Their technical expertise and dedication to quality is unmatched.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    gradient: "from-pink-500 to-rose-500",
    metric: "3x faster launch",
  },
  {
    name: "David Kim",
    role: "CTO at DataFlow",
    company: "DataFlow",
    content: "The software solution they built for us has dramatically improved our operations. Professional team with excellent communication throughout.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    gradient: "from-orange-500 to-amber-500",
    metric: "40% cost reduction",
  },
  {
    name: "Lisa Wang",
    role: "Marketing Director",
    company: "GrowthHub",
    content: "Our new website has significantly boosted our conversion rates. The attention to detail and modern design approach was exactly what we needed.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    gradient: "from-green-500 to-emerald-500",
    metric: "+87% conversions",
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(1)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [particlePositions, setParticlePositions] = useState<Array<{ x: number; y: number; delay: number }>>([])
  const sectionRef = useRef<HTMLElement>(null)

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
    for (let i = 0; i < 40; i++) {
      positions.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5
      })
    }
    setParticlePositions(positions)
  }

  // Auto-slide with animation lock
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        next()
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [activeIndex, isAnimating])

  const next = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 600)
  }

  const prev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 600)
  }

  const getVisibleTestimonials = () => {
    const result = []
    for (let i = -1; i <= 1; i++) {
      const index = (activeIndex + i + testimonials.length) % testimonials.length
      result.push({ ...testimonials[index], position: i, originalIndex: index })
    }
    return result
  }

  return (
    <section ref={sectionRef} className="py-32 px-4 relative overflow-hidden">
      <style jsx>{`
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
          25% { transform: translate(10px, -20px) scale(1.2); opacity: 0.4; }
          50% { transform: translate(-15px, -30px) scale(0.8); opacity: 0.3; }
          75% { transform: translate(20px, -15px) scale(1.1); opacity: 0.5; }
        }
        @keyframes cardGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.2); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.4); }
        }
        @keyframes starPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
        @keyframes slideFromLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideFromRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shine {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        .glass-card-strong {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glow-border-strong {
          position: relative;
          animation: cardGlow 3s ease-in-out infinite;
        }
        .glow-border-strong::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5), rgba(6, 182, 212, 0.5));
          border-radius: 1.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        .glow-border-strong:hover::before {
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
        .star-animate {
          animation: starPulse 1s ease-in-out infinite;
        }
        .rotate-animation {
          animation: rotateSlow 20s linear infinite;
        }
        .shimmer-text {
          background: linear-gradient(90deg, #fff 0%, #a855f7 50%, #fff 100%);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: shine 2s linear infinite;
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
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-3xl -translate-y-1/2 rotate-animation" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-pink-600/8 rounded-full blur-3xl -translate-y-1/2 rotate-animation" style={{ animationDirection: 'reverse' }} />
      <div className="absolute top-20 left-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-pink-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.4) 1px, transparent 1px)`,
          backgroundSize: '25px 25px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header with animations */}
        <div className={`flex flex-col md:flex-row items-start md:items-end justify-between mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-6 group cursor-pointer border-animate">
              <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />
              <span className="text-sm text-purple-400 font-medium">Testimonials</span>
              <Heart className="w-3 h-3 text-pink-400 group-hover:scale-110 transition-transform" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold">
              <span className="text-white">Loved by</span>
              <br />
              <span className="text-gradient">Our Clients</span>
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mt-4 rounded-full animate-pulse" />
          </div>
          
          {/* Navigation Buttons with animations */}
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <button
              onClick={prev}
              disabled={isAnimating}
              className="w-12 h-12 rounded-xl glass-card flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
            >
              <ChevronLeft className="w-5 h-5 text-white group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={next}
              disabled={isAnimating}
              className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-110 group"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* 3D Testimonials Carousel */}
        <div className={`relative h-[480px] md:h-[420px] transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {getVisibleTestimonials().map((testimonial, i) => (
            <div
              key={`${testimonial.name}-${testimonial.position}`}
              className={`absolute top-0 left-1/2 w-full max-w-lg transition-all duration-700 ease-out cursor-pointer ${
                testimonial.position === 0 
                  ? 'z-30 -translate-x-1/2 scale-100 opacity-100' 
                  : testimonial.position === -1 
                    ? 'z-20 -translate-x-[120%] md:-translate-x-[130%] scale-90 opacity-40 hover:opacity-60' 
                    : 'z-20 translate-x-[20%] md:translate-x-[30%] scale-90 opacity-40 hover:opacity-60'
              }`}
              onMouseEnter={() => setHoveredCard(testimonial.originalIndex)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => {
                if (testimonial.position !== 0) {
                  setActiveIndex(testimonial.originalIndex)
                }
              }}
            >
              <div className={`glass-card-strong rounded-3xl p-8 md:p-10 ${testimonial.position === 0 ? 'glow-border-strong' : ''} transition-all duration-300 ${
                hoveredCard === testimonial.originalIndex ? 'transform scale-[1.02]' : ''
              }`}>
                {/* Animated Quote icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center mb-6 shadow-lg transition-all duration-300 ${
                  hoveredCard === testimonial.originalIndex ? 'scale-110 rotate-6' : ''
                }`}>
                  <Quote className="w-6 h-6 text-white" />
                </div>
                
                {/* Content with animated text */}
                <p className="text-gray-200 text-lg leading-relaxed mb-8 relative">
                  <span className="text-purple-400 text-2xl absolute -top-2 -left-3 opacity-50">"</span>
                  {testimonial.content}
                  <span className="text-purple-400 text-2xl absolute -bottom-4 right-0 opacity-50">"</span>
                </p>
                
                {/* Metric badge */}
                {testimonial.position === 0 && (
                  <div className="absolute top-6 right-6">
                    <div className="glass-card rounded-full px-3 py-1.5 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-green-400 font-medium">{testimonial.metric}</span>
                    </div>
                  </div>
                )}
                
                {/* Author section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${testimonial.gradient} p-0.5 transition-all duration-300 ${
                      hoveredCard === testimonial.originalIndex ? 'scale-105' : ''
                    }`}>
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-full h-full rounded-xl object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg flex items-center gap-2">
                        {testimonial.name}
                        {testimonial.position === 0 && (
                          <Zap className="w-3 h-3 text-yellow-400 animate-pulse" />
                        )}
                      </h4>
                      <p className="text-gray-400 text-sm flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  
                  {/* Animated Rating Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star 
                        key={j} 
                        className={`w-4 h-4 text-yellow-400 fill-yellow-400 transition-all duration-300 ${
                          hoveredCard === testimonial.originalIndex ? 'star-animate' : ''
                        }`}
                        style={{ animationDelay: `${j * 0.1}s` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Hover indicator for side cards */}
                {testimonial.position !== 0 && hoveredCard === testimonial.originalIndex && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-purple-400 animate-pulse">
                    Click to view
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Animated Dots indicator */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true)
                  setActiveIndex(i)
                  setTimeout(() => setIsAnimating(false), 600)
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex 
                  ? 'w-8 bg-gradient-to-r from-purple-500 to-pink-500' 
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Trust badges with animations */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-gray-500 text-sm mb-6 flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-purple-400" />
            Trusted by innovative companies worldwide
            <Sparkles className="w-3 h-3 text-yellow-400" />
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {["RohTech", "GoogleCloud", "Nexcore Alliance"].map((company, i) => (
              <span 
                key={i} 
                className="text-gray-400 text-lg font-semibold transition-all duration-300 hover:text-white hover:scale-110 cursor-pointer"
                style={{ 
                  animation: isVisible ? `slideFromLeft 0.4s ease-out ${i * 0.1}s forwards` : 'none',
                  opacity: 0,
                  transform: 'translateX(-20px)'
                }}
              >
                {company}
              </span>
            ))}
          </div>
        </div>

        {/* Live stats bar */}
        <div className={`mt-12 flex justify-center gap-8 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="glass-card rounded-full px-6 py-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-gray-400">100+</span>
              <span className="text-xs text-white">Happy Clients</span>
            </div>
          </div>
          <div className="glass-card rounded-full px-6 py-2">
            <div className="flex items-center gap-3">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs text-gray-400">4.9</span>
              <span className="text-xs text-white">Average Rating</span>
            </div>
          </div>
          <div className="glass-card rounded-full px-6 py-2">
            <div className="flex items-center gap-3">
              <User className="w-3 h-3 text-purple-400" />
              <span className="text-xs text-gray-400">98%</span>
              <span className="text-xs text-white">Recommend</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}