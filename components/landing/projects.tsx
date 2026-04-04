"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink, Star, Users, Github, ArrowRight, Sparkles, Zap, Eye, Heart, TrendingUp, Award, Code, Layout, Smartphone, Database, Cloud, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "A full-featured online store with advanced filtering, real-time inventory, and seamless checkout experience.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
    tags: ["Next.js", "Stripe", "Tailwind"],
    gradient: "from-purple-500 to-pink-500",
    stats: { sales: "50K+", rating: 4.9 },
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Healthcare Dashboard",
    category: "UI/UX Design",
    description: "Intuitive patient management system with real-time monitoring and analytics visualization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    tags: ["Figma", "React", "D3.js"],
    gradient: "from-cyan-500 to-blue-500",
    stats: { patients: "10K+", uptime: "99.9%" },
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Smart Home IoT",
    category: "IoT Project",
    description: "Connected home automation system with voice control and energy optimization algorithms.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop",
    tags: ["Arduino", "MQTT", "Node.js"],
    gradient: "from-green-500 to-emerald-500",
    stats: { devices: "5K+", savings: "30%" },
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "AI Content Generator",
    category: "Software Development",
    description: "Intelligent content creation tool powered by machine learning for marketing teams.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    tags: ["Python", "OpenAI", "FastAPI"],
    gradient: "from-orange-500 to-amber-500",
    stats: { generated: "100K+", accuracy: "95%" },
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Fitness Tracking App",
    category: "Mobile App",
    description: "Comprehensive health and fitness app with workout plans, nutrition tracking, and social features.",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=500&fit=crop",
    tags: ["React Native", "Firebase", "HealthKit"],
    gradient: "from-pink-500 to-rose-500",
    stats: { downloads: "1M+", active: "100K+" },
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Supply Chain System",
    category: "Enterprise Software",
    description: "End-to-end logistics management with real-time tracking and predictive analytics.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
    tags: ["Java", "Kafka", "PostgreSQL"],
    gradient: "from-violet-500 to-purple-500",
    stats: { shipments: "500K+", efficiency: "+40%" },
    liveUrl: "#",
    githubUrl: "#",
  },
]

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [particlePositions, setParticlePositions] = useState<Array<{ x: number; y: number; delay: number }>>([])

  const filters = ["All", "Web Development", "UI/UX Design", "IoT Project", "Software Development", "Mobile App", "Enterprise Software"]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          generateParticles()
        }
      },
      { threshold: 0.1 }
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

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter)

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "Web Development": return <Code className="w-3 h-3" />;
      case "UI/UX Design": return <Layout className="w-3 h-3" />;
      case "Mobile App": return <Smartphone className="w-3 h-3" />;
      case "IoT Project": return <Database className="w-3 h-3" />;
      default: return <Sparkles className="w-3 h-3" />;
    }
  }

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
          0% { transform: scale(0.9); opacity: 0.5; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        @keyframes imageZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
        .filter-active {
          position: relative;
        }
        .filter-active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: linear-gradient(90deg, #a855f7, #ec4899);
          border-radius: 2px;
          animation: slideUp 0.3s ease-out;
        }
        .overlay-buttons {
          transition: all 0.3s ease;
        }
        .project-stats {
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
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-3xl rotate-animation" />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-pink-600/8 rounded-full blur-3xl rotate-animation" style={{ animationDirection: 'reverse' }} />
      <div className="absolute top-40 left-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-40 right-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header with animations */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-6 group cursor-pointer animate-border-flow">
            <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />
            <span className="text-sm text-purple-400 font-medium">Our Portfolio</span>
            <Award className="w-3 h-3 text-yellow-400 group-hover:scale-110 transition-transform" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full animate-pulse" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-6">
            Explore our latest work showcasing innovation, creativity, and technical excellence 
            across various industries.
          </p>
        </div>

        {/* Animated Filter Tabs */}
        <div className={`flex flex-wrap justify-center gap-3 mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 filter-active"
                  : "glass-card text-gray-400 hover:text-white hover:bg-white/10 hover:scale-105"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid with animated cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <div 
              key={i}
              className={`glass-card rounded-3xl overflow-hidden hover-lift card-shine group transition-all duration-700 cursor-pointer ${
                hoveredProject === i ? 'card-active' : ''
              }`}
              style={{ 
                transitionDelay: `${i * 100}ms`,
                animation: isVisible ? `slideUp 0.5s ease-out ${i * 0.1}s forwards` : 'none',
                opacity: 0 
              }}
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 z-0`} />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                
                {/* Animated Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                  <a 
                    href={project.liveUrl}
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 overlay-buttons"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <a 
                    href={project.githubUrl}
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 overlay-buttons"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
                
                {/* Category badge with icon */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r ${project.gradient} text-white flex items-center gap-1 shadow-lg`}>
                    {getCategoryIcon(project.category)}
                    {project.category}
                  </span>
                </div>

                {/* Stats badge on hover */}
                <div className={`absolute bottom-4 right-4 glass-card rounded-full px-3 py-1.5 transition-all duration-300 ${
                  hoveredProject === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}>
                  <div className="flex items-center gap-2 text-xs">
                    <Eye className="w-3 h-3 text-purple-400" />
                    <span className="text-white">Live Demo</span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className={`text-xl font-bold text-white mb-2 transition-all duration-300 ${
                  hoveredProject === i ? 'text-gradient' : 'group-hover:text-gradient'
                }`}>
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tags with animations */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, j) => (
                    <span 
                      key={j}
                      className={`px-3 py-1 rounded-full text-xs bg-white/5 text-gray-400 border border-white/10 transition-all duration-300 ${
                        hoveredProject === i ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : ''
                      }`}
                      style={{ transitionDelay: `${j * 50}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Stats */}
                <div className={`flex gap-4 pt-3 border-t border-white/10 transition-all duration-300 ${
                  hoveredProject === i ? 'opacity-100' : 'opacity-70'
                }`}>
                  {Object.entries(project.stats).map(([key, value], idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      {key === "sales" && <TrendingUp className="w-3 h-3 text-green-400" />}
                      {key === "rating" && <Star className="w-3 h-3 text-yellow-400" />}
                      {key === "patients" && <Heart className="w-3 h-3 text-pink-400" />}
                      {key === "uptime" && <Shield className="w-3 h-3 text-cyan-400" />}
                      {key === "devices" && <Smartphone className="w-3 h-3 text-blue-400" />}
                      {key === "savings" && <Zap className="w-3 h-3 text-yellow-400" />}
                      {key === "generated" && <Cloud className="w-3 h-3 text-purple-400" />}
                      {key === "accuracy" && <Award className="w-3 h-3 text-orange-400" />}
                      {key === "downloads" && <Smartphone className="w-3 h-3 text-green-400" />}
                      {key === "active" && <Users className="w-3 h-3 text-blue-400" />}
                      {key === "shipments" && <Database className="w-3 h-3 text-cyan-400" />}
                      <span className="text-xs text-white font-medium">{value}</span>
                      <span className="text-[10px] text-gray-500 capitalize">{key}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover indicator line */}
              {hoveredProject === i && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* View All CTA with animations */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link href="#contact">
            <Button className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-full px-10 py-6 text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 group">
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Bottom Stats */}
        <div className={`mt-16 flex flex-wrap justify-center gap-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="glass-card rounded-full px-8 py-3 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-gray-300">50+ Projects Delivered</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-gray-300">30+ Happy Clients</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-gray-300">12 Industry Awards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}