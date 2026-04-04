"use client"

import { useEffect, useRef, useState } from "react"
import { Globe, Code, Palette, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Discover() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const cards = [
    {
      number: "001",
      icon: Globe,
      title: "Create reports",
      subtitle: "Markets, companies",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      number: "002",
      icon: Code,
      title: "Create newsletters",
      subtitle: "with latest trends",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      number: "003",
      icon: Palette,
      title: "Manage research",
      subtitle: "papers with AI",
      gradient: "from-purple-500 to-violet-500",
    },
  ]

  return (
    <section ref={sectionRef} className="py-32 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-600/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
              Discover What would you
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              like to do <span className="text-gradient">with Web Matrix?</span>
            </h2>
          </div>
          
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 hover:from-pink-600 hover:via-rose-600 hover:to-orange-500 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 whitespace-nowrap">
              Let's Start
            </Button>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div 
              key={i}
              className={`glass-card rounded-3xl p-8 hover-lift card-shine group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${card.gradient} bg-opacity-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Plus className="w-5 h-5 text-purple-300" />
                </div>
                <span className="text-gray-500 text-sm font-mono">{card.number}</span>
              </div>

              {/* Icon Display */}
              <div className="glass-card rounded-2xl p-8 mb-8 bg-gradient-to-br from-purple-500/5 to-pink-500/10 group-hover:from-purple-500/10 group-hover:to-pink-500/15 transition-all duration-300">
                <div className="flex items-center justify-center h-24">
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <card.icon className="w-16 h-16 text-purple-400" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-1">{card.title}</h3>
              <p className="text-gray-400">{card.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
