"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, Zap, FileText, Layers, Upload } from "lucide-react"
import Link from "next/link"

export function Features() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.01, rootMargin: "100px" }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-6">
            <span className="text-sm text-purple-400 font-medium">
              Our Expertise
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">
            Smart Digital Solutions
          </h2>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">
              built for modern businesses
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div
          className={`grid grid-cols-12 gap-6 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Large Card */}
          <div className="col-span-12 lg:col-span-8 glass-card rounded-3xl p-8 hover-lift card-shine group">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-semibold">
                Web Matrix — Your Digital Innovation Partner
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left */}
              <div className="glass-card rounded-2xl p-6 bg-white/5">
                <div className="flex items-center gap-2 mb-4 text-gray-300">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">
                    Modern Web & Software Development
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="h-3 bg-gradient-to-r from-purple-500 to-purple-500/50 rounded-full w-full" />
                  <div className="h-3 bg-gradient-to-r from-purple-500/80 to-purple-500/30 rounded-full w-4/5" />
                  <div className="h-3 bg-gradient-to-r from-purple-500/60 to-purple-500/20 rounded-full w-3/5" />
                </div>
              </div>

              {/* Right */}
              <div className="glass-card rounded-2xl p-6 bg-white/5">
                <p className="text-gray-400 text-sm mb-4">Our Services</p>

                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span className="text-white">
                    Web • UI/UX • Software • IoT
                  </span>
                </div>

                <p className="text-gray-500 text-sm">
                  End-to-end development solutions
                </p>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="col-span-12 lg:col-span-4 glass-card rounded-3xl p-8 hover-lift card-shine">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <Upload className="w-5 h-5 text-white" />
              </div>

              <div>
                <span className="text-white font-semibold block">
                  Share your idea,
                </span>
                <span className="text-white font-semibold">
                  we build it for you
                </span>
              </div>
            </div>

            <div className="glass-card rounded-xl p-4 bg-white/5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 rounded-full bg-pink-500" />
                <span className="text-white text-sm">
                  Project Development
                </span>
              </div>

              <div className="h-2 bg-gradient-to-r from-green-500 to-green-400 rounded-full w-full mb-2" />
              <div className="h-2 bg-purple-500/30 rounded-full w-3/4" />
            </div>
          </div>

          {/* Bottom Left */}
          <div className="col-span-12 md:col-span-4 glass-card rounded-3xl p-8 hover-lift card-shine">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>

              <span className="text-white font-semibold">
                Start Your Project
              </span>
            </div>

            <div className="glass-card rounded-xl p-4 bg-white/5 mb-4">
              <p className="text-gray-400 text-sm mb-3">
                From idea to execution — we help startups and students build real-world projects.
              </p>
               <Link href="/projects">
              <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Get Started
              </button>
               </Link>
            </div>

            <p className="text-gray-500 text-sm">
              Kickstart your digital journey with Web Matrix
            </p>
          </div>

          {/* Bottom Middle */}
          <div className="col-span-12 md:col-span-4 glass-card rounded-3xl p-8 hover-lift card-shine">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>

              <div>
                <span className="text-white font-semibold block">
                  Design, Develop & Deploy
                </span>
                <span className="text-white font-semibold">
                  all in one place
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {["Web Apps", "Mobile UI", "Dashboards"].map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full text-xs bg-white/10 text-gray-300 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-gray-500 text-sm">
              Complete digital solutions under one roof
            </p>
          </div>

          {/* Bottom Right */}
          <div className="col-span-12 md:col-span-4 glass-card rounded-3xl p-8 hover-lift card-shine">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>

              <span className="text-white font-semibold">
                IoT & Smart Solutions
              </span>
            </div>

            <div className="glass-card rounded-xl p-4 bg-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-300 text-sm">
                  Smart Device Integration
                </span>

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