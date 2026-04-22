"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, Zap, Globe, FileText, Layers, MessageSquare, Search, Upload, Grid } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Features() {
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
    <section ref={sectionRef} className="py-32 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-6">
            <span className="text-sm text-purple-400 font-medium">Best Features</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">
            AI-powered process
          </h2>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">& human-driven results</span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className={`grid grid-cols-12 gap-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Large Card - Vexus Blocks */}
          <div className="col-span-12 lg:col-span-8 glass-card rounded-3xl p-8 hover-lift card-shine group">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-semibold">Vexus Blocks Your command center</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left side - AI revolutionizing */}
              <div className="glass-card rounded-2xl p-6 bg-white/5">
                <div className="flex items-center gap-2 mb-4 text-gray-300">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">How AI is revolutionizing</span>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gradient-to-r from-purple-500 to-purple-500/50 rounded-full w-full" />
                  <div className="h-3 bg-gradient-to-r from-purple-500/80 to-purple-500/30 rounded-full w-4/5" />
                  <div className="h-3 bg-gradient-to-r from-purple-500/60 to-purple-500/20 rounded-full w-3/5" />
                </div>
              </div>
              
              {/* Right side - Market content */}
              <div className="glass-card rounded-2xl p-6 bg-white/5">
                <p className="text-gray-400 text-sm mb-4">Market content</p>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span className="text-white">Upward fetch</span>
                </div>
                <p className="text-gray-500 text-sm">My library</p>
              </div>
            </div>
          </div>

          {/* Right Card - Add content */}
          <div className="col-span-12 lg:col-span-4 glass-card rounded-3xl p-8 hover-lift card-shine">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-white font-semibold block">Add content on your own,</span>
                <span className="text-white font-semibold">fetch it for you</span>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-4 bg-white/5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 rounded-full bg-pink-500" />
                <span className="text-white text-sm">Upward fetch</span>
              </div>
              <div className="h-2 bg-gradient-to-r from-green-500 to-green-400 rounded-full w-full mb-2" />
              <div className="h-2 bg-purple-500/30 rounded-full w-3/4" />
            </div>
          </div>

          {/* Bottom Left - Start new project */}
          <div className="col-span-12 md:col-span-4 glass-card rounded-3xl p-8 hover-lift card-shine">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-semibold">Start a new project</span>
            </div>
            
            <div className="glass-card rounded-xl p-4 bg-white/5 mb-4">
              <p className="text-gray-400 text-sm mb-3">Product led growth research</p>
              <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Next
              </button>
            </div>
            <p className="text-gray-500 text-sm">Define your research project</p>
          </div>

          {/* Bottom Middle - Edit draft */}
          <div className="col-span-12 md:col-span-4 glass-card rounded-3xl p-8 hover-lift card-shine">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-white font-semibold block">Edit your draft paper, finalize</span>
                <span className="text-white font-semibold">and save it</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {["Blog post", "Presentation", "Summary"].map((tag, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full text-xs bg-white/10 text-gray-300 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-500 text-sm">One home for all your business research</p>
          </div>

          {/* Bottom Right - Smart IoT */}
          <div className="col-span-12 md:col-span-4 glass-card rounded-3xl p-8 hover-lift card-shine">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-semibold">Smart IoT Integration</span>
            </div>
            
            <div className="glass-card rounded-xl p-4 bg-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-300 text-sm">Device sync</span>
                <div className="w-12 h-6 rounded-full bg-green-500 flex items-center justify-end px-1">
                  <div className="w-4 h-4 rounded-full bg-white" />
                </div>
              </div>
              <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
