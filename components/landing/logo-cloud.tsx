"use client"

import { useEffect, useRef, useState } from "react"

const partners = [
  { name: "RohTech" },
  // { name: "Xrisu_4.4" },
  { name: "GoogleCloud" },
  { name: "Nexcore Alliance" },
  { name: "WebMatrix" },
  { name: "Google" },
]

export function LogoCloud() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.01, rootMargin: '100px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      {/* Subtle gradient line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        <p className={`text-center text-gray-500 text-sm mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          Trusted by leading companies worldwide
        </p>
        
        {/* Logo scroll container */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050510] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050510] to-transparent z-10" />
          
          {/* Scrolling logos */}
          <div className="flex items-center gap-16 overflow-hidden">
            <div className={`flex items-center gap-16 animate-scroll ${isVisible ? '' : 'paused'}`}>
              {[...partners, ...partners].map((partner, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 group"
                >
                  <div className="flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 group-hover:bg-white/5">
                    {/* Logo placeholder - styled text */}
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
                      <span className="text-lg font-bold text-gradient">{partner.name.charAt(0)}</span>
                    </div>
                    <span className="text-gray-400 font-medium text-lg group-hover:text-white transition-colors whitespace-nowrap">
                      {partner.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle gradient line */}
      <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        .paused {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
