"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/20 rounded-full blur-3xl" />
      
      {/* Arc Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] border-t border-purple-500/30 rounded-t-full" />
      
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-gray-300">Start building today</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Build Your Future
          <br />
          <span className="text-gradient">with Web Matrix?</span>
        </h2>
        
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Retain talent, reduce costs, and boost productivity with our intelligent AI platform. Start your free trial today.
        </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button className="relative group bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white rounded-full px-10 py-7 text-lg font-semibold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 animate-shimmer" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="rounded-full px-10 py-7 text-lg font-semibold border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Schedule a Demo
              </Button>
            </Link>
          </div>
        </div>
    </section>
  )
}
