"use client"

import { useEffect, useRef, useState } from "react"
import { Twitter, Linkedin, Github, Mail, Sparkles, Users, Heart, ArrowRight, Briefcase, MapPin, Calendar, Star, Zap, Award } from "lucide-react"

const teamMembers = [
  {
    name: "Shubham Prajapati",
    role: "Founder & CEO",
    bio: "The creative mastermind behind our WebMatrix",
    image: "/images/monu.png",
    gradient: "from-pink-500 to-rose-500",
    experience: "3+ years",
    projects: "10+",
    location: "Mumbai",
    linkedin: "https://www.linkedin.com/in/shubham-prajapati31/",
    github: "https://github.com/Shubham-Prajapati31",
    mail: "mailto:webmatrixcodes@gmail.com"
  },
  {
    name: "Shubham Thakare",
    role: "Co-Founder & Software Engineer",
    bio: "The tech genius driving powerful and scalable solutions",
    image: "/images/sk.jpeg",
    gradient: "from-cyan-500 to-blue-500",
    experience: "3+ years",
    projects: "10+",
    location: "Mumbai",
    linkedin: "https://www.linkedin.com/in/shubham-thakare-3044a0349",
    github: "https://github.com/shubham444yt",
    mail: "mailto:skmusixcreator@gmail.com"
  },
  {
    name: "Anand Yadav",
    role: "Python Developer & UI/UX Designer",
    bio: "The creative mind blending design with flawless functionality",
    image: "/images/anand.jpeg",
    gradient: "from-orange-500 to-amber-500",
    experience: "3+ years",
    projects: "10+",
    location: "Mumbai",
    linkedin: "https://www.linkedin.com/in/anand-yadav-0709432a8/",
    github: "https://github.com/ananddyadav270",
    mail: "mailto:ananddyadav270@gmail.com"
  },
  {
    name: "Vedant Gupta",
    role: "Full Stack Software Developer",
    bio: "The full-stack innovator turning ideas into reality",
    image: "/images/vedant.png",
    gradient: "from-green-500 to-emerald-500",
    experience: "3+ years",
    projects: "10+",
    location: "Mumbai",
    linkedin: "https://www.linkedin.com/in/vedant-gupta-764178366/",
    github: "https://github.com/vedantgupta",
    mail: "mailto:vedantg546@gmail.com"
  },
]

export function Teams() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)
  const [activeMember, setActiveMember] = useState<number | null>(null)
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
    for (let i = 0; i < 60; i++) {
      positions.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5
      })
    }
    setParticlePositions(positions)
  }

  // Auto-rotate active member for demo
  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setActiveMember((prev) => (prev === null ? 0 : (prev + 1) % teamMembers.length))
    }, 4000)
    return () => clearInterval(interval)
  }, [isVisible])

  // Social icons mapping
  const getSocialLinks = (member: any) => [
    { icon: Linkedin, color: "hover:text-[#0077B5]", link: member.linkedin },
    { icon: Github, color: "hover:text-[#333]", link: member.github },
    { icon: Mail, color: "hover:text-purple-400", link: member.mail },
  ]

  return (
    <section ref={sectionRef} className="py-8 px-4 relative overflow-hidden">
      <style jsx>{`
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
          25% { transform: translate(15px, -20px) scale(1.2); opacity: 0.5; }
          50% { transform: translate(-10px, -30px) scale(0.8); opacity: 0.3; }
          75% { transform: translate(20px, -15px) scale(1.1); opacity: 0.4; }
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
        @keyframes imagePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
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
        @keyframes floatSocial {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
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
        .rotate-animation {
          animation: rotateSlow 20s linear infinite;
        }
        .animate-border-flow {
          animation: borderFlow 2s ease-in-out infinite;
        }
        .member-card-active {
          animation: cardGlow 2s ease-in-out infinite;
          border-color: rgba(139, 92, 246, 0.5);
          transform: scale(1.02);
        }
        .social-icon {
          transition: all 0.3s ease;
        }
        .social-icon:hover {
          animation: floatSocial 0.3s ease-in-out;
        }
        .profile-image {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .stat-badge {
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
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-3xl -translate-y-1/2 rotate-animation" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-pink-600/8 rounded-full blur-3xl -translate-y-1/2 rotate-animation" style={{ animationDirection: 'reverse' }} />
      <div className="absolute top-20 left-1/3 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-1/3 w-40 h-40 bg-pink-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '25px 25px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header with animations */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-6 group cursor-pointer animate-border-flow">
            <Users className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm text-purple-400 font-medium">Meet Our Experts</span>
            <Heart className="w-3 h-3 text-pink-400 group-hover:animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-gradient">Team</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full animate-pulse" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-6">
            A diverse group of talented individuals united by passion for innovation 
            and commitment to excellence.
          </p>
        </div>

        {/* Team Grid with animated cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, i) => (
            <div 
              key={i}
              className={`glass-card rounded-3xl p-8 hover-lift card-shine group cursor-pointer transition-all duration-700 ${
                activeMember === i ? 'member-card-active' : ''
              }`}
              style={{ 
                transitionDelay: `${i * 100}ms`,
                animation: isVisible ? `slideUp 0.5s ease-out ${i * 0.1}s forwards` : 'none',
                opacity: 0 
              }}
              onMouseEnter={() => setHoveredMember(i)}
              onMouseLeave={() => setHoveredMember(null)}
              onClick={() => setActiveMember(activeMember === i ? null : i)}
            >
              {/* Image Container with animated border */}
              <div className="relative mb-6">
                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-2xl blur-xl transition-all duration-500 ${
                  hoveredMember === i ? 'opacity-50 scale-110' : 'opacity-30 scale-100'
                }`} />
                <div className="relative w-32 h-32 mx-auto">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${member.gradient} p-0.5 transition-all duration-300 ${
                    hoveredMember === i ? 'scale-105' : ''
                  }`}>
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-[#050510]">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover profile-image group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  {/* Online status indicator */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#050510] animate-pulse" />
                </div>
              </div>

              {/* Info with animated text */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-1 flex items-center justify-center gap-2">
                  {member.name}
                  {activeMember === i && (
                    <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
                  )}
                </h3>
                <p className={`text-transparent bg-gradient-to-r ${member.gradient} bg-clip-text font-medium text-sm mb-3`}>
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm mb-4">{member.bio}</p>

                {/* Expanded info on hover/active */}
                {(hoveredMember === i || activeMember === i) && (
                  <div className="mt-4 pt-4 border-t border-white/10 animate-[slideUp_0.3s_ease-out]">
                    <div className="flex justify-center gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Experience</div>
                        <div className="text-sm font-semibold text-white">{member.experience}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Projects</div>
                        <div className="text-sm font-semibold text-white">{member.projects}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Location</div>
                        <div className="text-sm font-semibold text-white flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {member.location.split(' ')[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Social Links with animations */}
                <div className="flex items-center justify-center gap-3 mt-4">
                  {getSocialLinks(member).map((social, j) => (
                    <a
                      key={j}
                      href={social.link}
                      className={`w-10 h-10 rounded-xl glass-card flex items-center justify-center text-gray-400 transition-all duration-300 social-icon ${social.color}`}
                      style={{ animationDelay: `${j * 0.05}s` }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Decorative element on hover */}
              {hoveredMember === i && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Join Us CTA with enhanced animations */}
        <div className={`mt-20 glass-card-strong rounded-3xl p-10 md:p-16 text-center glow-border relative overflow-hidden transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Animated Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          
          {/* Floating icons */}
          <div className="absolute top-4 left-4 opacity-30">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          </div>
          <div className="absolute bottom-4 right-4 opacity-30">
            <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
          </div>
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 mb-4">
              <Award className="w-3 h-3 text-purple-400" />
              <span className="text-xs text-purple-400">We're Hiring!</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Want to Join Our Team?
            </h3>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for innovation. 
              Check out our open positions and become part of something great.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-full px-10 py-4 font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 group"
              >
                View Open Positions
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="glass-card rounded-full px-6 py-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-300">5+ open roles</span>
              </div>
            </div>
            
            {/* Team stats */}
            <div className="flex justify-center gap-8 mt-8 pt-6 border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">4+</div>
                <div className="text-xs text-gray-500">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">2+</div>
                <div className="text-xs text-gray-500">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">98%</div>
                <div className="text-xs text-gray-500">Retention Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}