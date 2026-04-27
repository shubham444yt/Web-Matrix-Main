"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

// 2D Game Map Component with fixed location marker above a specific building
function GameMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const timeRef = useRef(0)
  
  // FIXED location - positioned above the tallest building (the one at x:170, y:25)
  // This building is the most prominent with w:50, h:55
  // Marker placed above it (center of building: x=195, y=25-5=20)
  const locationRef = useRef({ x: 195, y: 20 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width * window.devicePixelRatio
        canvas.height = rect.height * window.devicePixelRatio
        canvas.style.width = `${rect.width}px`
        canvas.style.height = `${rect.height}px`
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      }
    }
    resize()
    window.addEventListener('resize', resize)

    // Building data - keeping the reference to the target building
    const buildings = [
      { x: 20, y: 30, w: 40, h: 50, color: '#7c3aed' },
      { x: 70, y: 20, w: 45, h: 65, color: '#6366f1' },
      { x: 125, y: 40, w: 35, h: 45, color: '#8b5cf6' },
      // TARGET BUILDING - The most prominent building at x:170, y:25
      { x: 170, y: 25, w: 50, h: 55, color: '#a78bfa', isTarget: true },
      { x: 230, y: 35, w: 40, h: 48, color: '#7c3aed' },
      { x: 280, y: 20, w: 38, h: 60, color: '#6366f1' },
      { x: 20, y: 110, w: 42, h: 40, color: '#8b5cf6' },
      { x: 75, y: 120, w: 36, h: 35, color: '#a78bfa' },
      { x: 170, y: 115, w: 44, h: 42, color: '#6366f1' },
      { x: 230, y: 110, w: 38, h: 38, color: '#7c3aed' },
      { x: 280, y: 120, w: 40, h: 35, color: '#a78bfa' },
    ]

    // Tree data
    const trees = [
      { x: 65, y: 85 }, { x: 120, y: 88 }, { x: 155, y: 92 },
      { x: 200, y: 85 }, { x: 260, y: 88 }, { x: 320, y: 90 },
      { x: 45, y: 155 }, { x: 110, y: 160 }, { x: 195, y: 158 },
      { x: 250, y: 155 }, { x: 310, y: 160 },
    ]

    // Road data
    const roads = [
      { x: 0, y: 100, w: 345, h: 8, horizontal: true },
      { x: 140, y: 0, w: 8, h: 195, horizontal: false },
    ]

    // Vehicle data with movement
    const vehicles = [
      { path: 'horizontal', y: 96, speed: 0.5, color: '#fbbf24', size: 12, direction: 1 },
      { path: 'horizontal', y: 104, speed: 0.7, color: '#34d399', size: 10, direction: -1 },
      { path: 'vertical', x: 136, speed: 0.6, color: '#f472b6', size: 10, direction: 1 },
      { path: 'vertical', x: 144, speed: 0.4, color: '#60a5fa', size: 12, direction: -1 },
    ]

    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return
      timeRef.current = timestamp * 0.001
      
      const w = canvas.width / window.devicePixelRatio
      const h = canvas.height / window.devicePixelRatio

      // Clear canvas
      ctx.clearRect(0, 0, w, h)

      // Draw grass background
      const grassGradient = ctx.createLinearGradient(0, 0, 0, h)
      grassGradient.addColorStop(0, '#1a1a2e')
      grassGradient.addColorStop(0.5, '#16213e')
      grassGradient.addColorStop(1, '#1a1a2e')
      ctx.fillStyle = grassGradient
      ctx.fillRect(0, 0, w, h)

      // Draw grid pattern for game-like feel
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.05)'
      ctx.lineWidth = 1
      for (let x = 0; x < w; x += 20) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // Draw grass patches
      for (let i = 0; i < 20; i++) {
        const gx = (i * 67) % w
        const gy = (i * 43) % h
        const sway = Math.sin(timeRef.current * 2 + i) * 2
        
        ctx.strokeStyle = `rgba(34, 197, 94, ${0.1 + Math.sin(timeRef.current + i) * 0.05})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(gx, gy + 5)
        ctx.lineTo(gx + sway - 2, gy - 5)
        ctx.moveTo(gx + 4, gy + 5)
        ctx.lineTo(gx + 4 + sway + 2, gy - 5)
        ctx.moveTo(gx + 8, gy + 5)
        ctx.lineTo(gx + 8 + sway, gy - 5)
        ctx.stroke()
      }

      // Responsive scaling for map elements
      const designWidth = 345
      const designHeight = 192
      const scale = Math.min(w / designWidth, h / designHeight, 1.2)
      const offsetX = (w - designWidth * scale) / 2
      const offsetY = (h - designHeight * scale) / 2

      ctx.save()
      ctx.translate(offsetX, offsetY)
      ctx.scale(scale, scale)

      // Draw roads with dashed lines
      roads.forEach(road => {
        // Road surface
        ctx.fillStyle = '#374151'
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
        ctx.shadowBlur = 5
        ctx.fillRect(road.x, road.y, road.w, road.h)
        ctx.shadowBlur = 0

        // Road border
        ctx.strokeStyle = '#4b5563'
        ctx.lineWidth = 1.5
        ctx.strokeRect(road.x, road.y, road.w, road.h)

        // Dashed center line
        ctx.strokeStyle = '#fbbf24'
        ctx.lineWidth = 1
        ctx.setLineDash([8, 6])
        ctx.lineDashOffset = -timeRef.current * 20
        
        if (road.horizontal) {
          ctx.beginPath()
          ctx.moveTo(0, road.y + road.h / 2)
          ctx.lineTo(designWidth, road.y + road.h / 2)
          ctx.stroke()
        } else {
          ctx.beginPath()
          ctx.moveTo(road.x + road.w / 2, 0)
          ctx.lineTo(road.x + road.w / 2, designHeight)
          ctx.stroke()
        }
        ctx.setLineDash([])
      })

      // Draw buildings with glow effect
      buildings.forEach(building => {
        // Building shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
        ctx.fillRect(building.x + 2, building.y + 2, building.w, building.h)

        // Building body
        const buildingGradient = ctx.createLinearGradient(building.x, building.y, building.x, building.y + building.h)
        buildingGradient.addColorStop(0, building.color)
        buildingGradient.addColorStop(1, '#312e81')
        ctx.fillStyle = buildingGradient
        ctx.fillRect(building.x, building.y, building.w, building.h)

        // Add a special glow to the target building (the one we're marking)
        if (building.isTarget) {
          ctx.strokeStyle = '#fbbf24'
          ctx.lineWidth = 2
          ctx.strokeRect(building.x - 2, building.y - 2, building.w + 4, building.h + 4)
        }

        // Building glow
        ctx.strokeStyle = `${building.color}4d`
        ctx.lineWidth = 1
        ctx.strokeRect(building.x - 1, building.y - 1, building.w + 2, building.h + 2)

        // Windows
        for (let wy = building.y + 8; wy < building.y + building.h - 8; wy += 12) {
          for (let wx = building.x + 6; wx < building.x + building.w - 6; wx += 10) {
            const windowLit = Math.sin(wx * wy + timeRef.current) > 0.2
            ctx.fillStyle = windowLit ? `rgba(251, 191, 36, ${0.5 + Math.sin(timeRef.current * 3 + wx) * 0.3})` : 'rgba(30, 41, 59, 0.3)'
            ctx.fillRect(wx, wy, 5, 6)
            
            if (windowLit) {
              ctx.shadowColor = '#fbbf24'
              ctx.shadowBlur = 3
              ctx.fillRect(wx, wy, 5, 6)
              ctx.shadowBlur = 0
            }
          }
        }

        // Roof
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
        ctx.fillRect(building.x, building.y - 2, building.w, 3)
      })

      // Draw trees
      trees.forEach(tree => {
        const sway = Math.sin(timeRef.current * 1.5 + tree.x) * 1.5
        
        // Trunk
        ctx.fillStyle = '#78350f'
        ctx.fillRect(tree.x + 4, tree.y + 8, 4, 10)
        
        // Canopy layers
        const canopyColors = ['#166534', '#15803d', '#16a34a']
        canopyColors.forEach((color, i) => {
          ctx.fillStyle = color
          ctx.beginPath()
          ctx.arc(tree.x + 6 + sway, tree.y + 5 - i * 2, 7 - i, 0, Math.PI * 2)
          ctx.fill()
        })
      })

      // Animate vehicles
      vehicles.forEach((vehicle: any) => {
        let vx = 0, vy = 0
        
        if (vehicle.path === 'horizontal') {
          vx = ((timeRef.current * vehicle.speed * 30 * vehicle.direction) % (w + 40)) - 20
          vy = vehicle.y || 0
        } else {
          vx = vehicle.x || 0
          vy = ((timeRef.current * vehicle.speed * 30 * vehicle.direction) % (h + 40)) - 20
        }

        // Vehicle glow
        ctx.shadowColor = vehicle.color
        ctx.shadowBlur = 8
        
        // Vehicle body
        ctx.fillStyle = vehicle.color
        if (vehicle.path === 'horizontal') {
          ctx.fillRect(vx - vehicle.size/2, vy - 3, vehicle.size, 6)
          // Windshield
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
          ctx.fillRect(vx + vehicle.size/4, vy - 2, 3, 4)
        } else {
          ctx.fillRect(vx - 3, vy - vehicle.size/2, 6, vehicle.size)
          // Windshield
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
          ctx.fillRect(vx - 2, vy + vehicle.size/4, 4, 3)
        }
        
        ctx.shadowBlur = 0
      })

      // --- LOCATION MARKER - FIXED POSITION ABOVE THE TARGET BUILDING ---
      // The marker is now static at x:195, y:20 (above building at x:170, y:25 with width 50, so center is x=195)
      // Marker is placed above the building (y=20 is above the building's y=25)
      
      const targetBuilding = buildings.find(b => b.isTarget)
      if (targetBuilding) {
        // Update locationRef to stay exactly above the target building
        // Building center X = building.x + building.w/2 = 170 + 25 = 195
        // Above the building = building.y - 5 = 25 - 5 = 20
        locationRef.current = {
          x: targetBuilding.x + targetBuilding.w / 2,
          y: targetBuilding.y - 5
        }
      }

      const markerX = locationRef.current.x
      const markerY = locationRef.current.y
      
      const pulseRadius = 20 + Math.sin(timeRef.current * 3) * 8

      // Outer pulse rings
      for (let i = 2; i >= 0; i--) {
        const ringRadius = pulseRadius + i * 12
        const ringAlpha = (Math.sin(timeRef.current * 3 + i) + 1) * 0.15
        ctx.beginPath()
        ctx.arc(markerX, markerY, ringRadius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(168, 85, 247, ${ringAlpha})`
        ctx.lineWidth = 2
        ctx.stroke()
        
        // Fill with very subtle gradient
        const ringGradient = ctx.createRadialGradient(markerX, markerY, pulseRadius, markerX, markerY, ringRadius)
        ringGradient.addColorStop(0, 'rgba(168, 85, 247, 0)')
        ringGradient.addColorStop(1, `rgba(168, 85, 247, ${ringAlpha * 0.5})`)
        ctx.fillStyle = ringGradient
        ctx.fill()
      }

      // Main marker
      ctx.shadowColor = '#a855f7'
      ctx.shadowBlur = 15
      
      // Marker pin shape
      ctx.fillStyle = '#a855f7'
      ctx.beginPath()
      ctx.arc(markerX, markerY - 5, 8, 0, Math.PI * 2)
      ctx.fill()
      
      // Pin triangle
      ctx.beginPath()
      ctx.moveTo(markerX - 6, markerY - 3)
      ctx.lineTo(markerX + 6, markerY - 3)
      ctx.lineTo(markerX, markerY + 8)
      ctx.closePath()
      ctx.fill()
      
      // Inner circle
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(markerX, markerY - 5, 3.5, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.restore()

      // Coordinates display (game-style HUD)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
      ctx.fillRect(5, 5, 120, 28)
      ctx.strokeStyle = '#a855f7'
      ctx.lineWidth = 1
      ctx.strokeRect(5, 5, 120, 28)
      
      ctx.fillStyle = '#a855f7'
      ctx.font = 'bold 10px monospace'
      ctx.fillText('📍 LOC: MARKER FIXED', 12, 17)
      ctx.fillText('🎯 ABOVE TOWER', 12, 29)

      // Mini compass with animated rotation
      const compassX = w - 25
      const compassY = 25
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
      ctx.beginPath()
      ctx.arc(compassX, compassY, 15, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#a855f7'
      ctx.stroke()
      
      // Compass needle with slow rotation
      const angle = timeRef.current * 0.2
      ctx.strokeStyle = '#fbbf24'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(compassX, compassY - 8)
      ctx.lineTo(compassX, compassY + 8)
      ctx.stroke()
      ctx.strokeStyle = '#ef4444'
      ctx.beginPath()
      ctx.moveTo(compassX - 6, compassY)
      ctx.lineTo(compassX + 6, compassY)
      ctx.stroke()
      
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 8px monospace'
      ctx.fillText('N', compassX - 3, compassY - 10)

      // NO RANDOM LOCATION UPDATES - Location is now fixed above the target building
      // The random movement has been removed completely

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
      style={{ imageRendering: 'pixelated' }}
    />
  )
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [result, setResult] = useState("")
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
      { threshold: 0.01, rootMargin: '100px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setResult("Sending....")
    
    const formData = new FormData(event.currentTarget)
    formData.append("access_key", "2ebaf33a-6014-44ec-bc42-357697971d09")

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    })

    const data = await response.json()
    if (data.success) {
      setResult("Form Submitted Successfully")
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setTimeout(() => setResult(""), 3000)
    } else {
      setResult("Error - Please try again")
      setTimeout(() => setResult(""), 3000)
    }
  }

  return (
    <section ref={sectionRef} className="py-12 md:py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Info */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="glass-card-strong rounded-3xl p-6 sm:p-10 glow-border h-full">
              <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
              
              <div className="space-y-8">
                {[
                  { 
                    icon: Mail, 
                    label: "Email Us", 
                    value: "webmatrixcodes@gmail.com",
                    gradient: "from-purple-500 to-violet-500"
                  },
                  { 
                    icon: Phone, 
                    label: "Call Us", 
                    value: "+91-73043 98854 / +91-92246 17090",
                    gradient: "from-pink-500 to-rose-500"
                  },
                  { 
                    icon: MapPin, 
                    label: "Visit Us", 
                    value: "Wagle Estate Thane (W), Maharashtra 400604",
                    gradient: "from-cyan-500 to-blue-500"
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 sm:gap-5 group">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-400 text-sm mb-1">{item.label}</p>
                      <p className="text-white font-medium text-base sm:text-lg break-words sm:break-normal">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Working Hours */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <h4 className="text-white font-semibold mb-4">Working Hours</h4>
                <div className="space-y-2 text-gray-400">
                  <p>Monday - Sunday (Everyday) <br/>  <span className="text-white"> 24/7 Support</span></p>
                </div>
              </div>

              {/* Map placeholder - Now with Game Map with fixed location marker */}
              <div className="mt-8 h-48 rounded-2xl overflow-hidden relative border border-purple-500/20">
                <GameMap />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 border border-purple-500/30">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-green-400 font-mono">LIVE</span>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 border border-purple-500/30">
                  <span className="text-xs text-purple-400 font-mono">🎯 LOCATION FIXED • Wagle Estate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <form onSubmit={onSubmit} className="glass-card-strong rounded-3xl p-6 sm:p-10 glow-border">
              <h3 className="text-2xl font-bold text-white mb-8">Send us a Message</h3>
              
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter Your Name"
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="Enter Your Email"
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none"
                    required
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
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
                    name="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    rows={5}
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none resize-none"
                    required
                  />
                </div>

                {/* Status Message */}
                {result && (
                  <div className={`text-center p-3 rounded-lg ${
                    result.includes("Successfully") 
                      ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                      : result.includes("Error") 
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  }`}>
                    {result}
                  </div>
                )}

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