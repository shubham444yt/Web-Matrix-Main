import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { LogoCloud } from "@/components/landing/logo-cloud"
import { Features } from "@/components/landing/features"
import { Sources } from "@/components/landing/sources"
import { Discover } from "@/components/landing/discover"
import { AIDashboard } from "@/components/landing/ai-dashboard"
import { Testimonials } from "@/components/landing/testimonials"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"
import { Services } from "@/components/landing/services"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050510] relative">
      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Top gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-pink-600/8 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        
        {/* Mid gradient orbs */}
        <div className="absolute top-1/3 left-0 w-[700px] h-[700px] bg-blue-600/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-3xl animate-float-delayed" />
        
        {/* Bottom gradient orbs */}
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-3xl" />
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <LogoCloud />
        <div className="hidden lg:block">
          <Features />
          <Sources />
        </div>
        {/* <Discover /> */}
        
        <Services/>
        <AIDashboard />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </main>
  )
}
