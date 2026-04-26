import { Navbar } from "@/components/landing/navbar"
import { Contact } from "@/components/landing/contact"
import { Footer } from "@/components/landing/footer"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Web Matrix | Get in Touch for Tech Solutions",
  description: "Get in touch with Web Matrix. We are here to help bring your digital vision to life with custom software, web development, and IoT solutions.",
  keywords: ["contact web matrix", "hire developers", "tech agency contact", "software consultation", "web development inquiry"],
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050510] relative">
      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-pink-600/8 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 left-0 w-[700px] h-[700px] bg-blue-600/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-3xl" />
        
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
      
      <div className="relative z-10">
        <Navbar />
        <div className="pt-24">
          <Contact />
        </div>
        <Footer />
      </div>
    </main>
  )
}
