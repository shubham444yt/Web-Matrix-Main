"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Our Teams", href: "/teams" },
  { name: "Projects", href: "/projects" },
  { name: "Services", href: "/services" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] px-4 py-4 transition-all duration-500 ${scrolled || isOpen ? 'bg-[#050510]/95 backdrop-blur-xl py-2 shadow-2xl' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto">
        <div className={`glass-card rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500 ${scrolled ? 'glow-border' : ''}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Web Matrix</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href} 
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${
                  pathname === item.href ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 rounded-full ${
                  pathname === item.href ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                }`} />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <Button className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white rounded-full px-8 py-2.5 font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 overflow-hidden group">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 rounded-full glass-card hover:bg-white/10 transition-all z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden fixed left-0 right-0 top-[76px] mx-4 transition-all duration-500 ease-in-out ${
            isOpen 
              ? 'opacity-100 translate-y-0 pointer-events-auto scale-100 visible' 
              : 'opacity-0 -translate-y-4 pointer-events-none scale-95 invisible'
          }`}
        >
          <div className="glass-card-strong rounded-3xl p-6 shadow-2xl border-purple-500/30 overflow-hidden">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <Link 
                  key={item.name}
                  href={item.href} 
                  className={`block py-4 px-5 rounded-2xl transition-all duration-300 ${
                    pathname === item.href 
                      ? 'text-white bg-white/15 shadow-inner' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">{item.name}</span>
                    <div className={`w-1.5 h-1.5 rounded-full bg-purple-500 transition-opacity duration-300 ${pathname === item.href ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </Link>
              ))}
              <div className="pt-6">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Button className="w-full py-7 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all">
                    Get Started Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
