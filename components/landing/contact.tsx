"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formState)
  }

  return (
    <section ref={sectionRef} className="py-32 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400 font-medium">Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {"Let's Work"} <span className="text-gradient">Together</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? {"We'd"} love to hear about it. Send us a message 
            and {"let's"} create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="glass-card-strong rounded-3xl p-10 glow-border h-full">
              <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
              
              <div className="space-y-8">
                {[
                  { 
                    icon: Mail, 
                    label: "Email Us", 
                    value: "hello@webmatrix.dev",
                    gradient: "from-purple-500 to-violet-500"
                  },
                  { 
                    icon: Phone, 
                    label: "Call Us", 
                    value: "+1 (555) 123-4567",
                    gradient: "from-pink-500 to-rose-500"
                  },
                  { 
                    icon: MapPin, 
                    label: "Visit Us", 
                    value: "123 Innovation Street, Tech City",
                    gradient: "from-cyan-500 to-blue-500"
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5 group">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{item.label}</p>
                      <p className="text-white font-medium text-lg">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Working Hours */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <h4 className="text-white font-semibold mb-4">Working Hours</h4>
                <div className="space-y-2 text-gray-400">
                  <p>Monday - Friday: <span className="text-white">9:00 AM - 6:00 PM</span></p>
                  <p>Saturday: <span className="text-white">10:00 AM - 4:00 PM</span></p>
                  <p>Sunday: <span className="text-white">Closed</span></p>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 h-48 rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-10 h-10 text-purple-400 mx-auto mb-2 animate-float" />
                    <p className="text-white font-medium">View on Map</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <form onSubmit={handleSubmit} className="glass-card-strong rounded-3xl p-10 glow-border">
              <h3 className="text-2xl font-bold text-white mb-8">Send us a Message</h3>
              
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Your Name</label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none"
                    required
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Subject</label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="How can we help?"
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Your Message</label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    rows={5}
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white rounded-xl py-6 text-lg font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
