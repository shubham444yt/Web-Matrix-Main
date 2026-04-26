import { Navbar } from "@/components/landing/navbar"
import { Services } from "@/components/landing/services"
import { Footer } from "@/components/landing/footer"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Services | Web Development & IT Solutions",
  description: "Explore our premium digital services including custom web development, UI/UX design, software development company solutions, and IoT projects.",
  keywords: ["web development services", "UI/UX design", "software development company", "IoT solutions", "student projects"],
  alternates: {
    canonical: "/services",
  },
}

export default function ServicesPage() {
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
          <Services />
        </div>
        <Footer />
      </div>
    </main>
  )
}
