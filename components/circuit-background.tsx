"use client"

import { useEffect, useRef } from "react"

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Circuit node class
    class Node {
      x: number
      y: number
      radius: number
      connections: Node[]
      pulseRadius: number
      pulseOpacity: number
      isPulsing: boolean
      pulseSpeed: number
      color: string

      constructor(x: number, y: number, radius: number) {
        this.x = x
        this.y = y
        this.radius = radius
        this.connections = []
        this.pulseRadius = 0
        this.pulseOpacity = 0
        this.isPulsing = false
        this.pulseSpeed = Math.random() * 0.5 + 0.5
        this.color = "#FF4D4D"
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw node
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 77, 77, 0.5)"
        ctx.fill()

        // Draw pulse if active
        if (this.isPulsing) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(255, 77, 77, ${this.pulseOpacity})`
          ctx.lineWidth = 1
          ctx.stroke()

          // Update pulse
          this.pulseRadius += this.pulseSpeed
          this.pulseOpacity -= 0.01

          if (this.pulseOpacity <= 0) {
            this.isPulsing = false
            this.pulseRadius = 0
            this.pulseOpacity = 0.5
          }
        }

        // Draw connections
        this.connections.forEach((node) => {
          ctx.beginPath()
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(node.x, node.y)
          ctx.strokeStyle = "rgba(255, 255, 255, 0.15)"
          ctx.lineWidth = 1
          ctx.stroke()
        })
      }

      startPulse() {
        if (!this.isPulsing) {
          this.isPulsing = true
          this.pulseRadius = this.radius
          this.pulseOpacity = 0.5

          // Propagate pulse to connections with delay
          setTimeout(
            () => {
              this.connections.forEach((node) => {
                if (Math.random() > 0.3) {
                  // 70% chance to propagate
                  node.startPulse()
                }
              })
            },
            Math.random() * 300 + 100,
          )
        }
      }
    }

    // Create nodes
    const nodes: Node[] = []
    const nodeCount = window.innerWidth < 768 ? 15 : 30

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = Math.random() * 2 + 1

      nodes.push(new Node(x, y, radius))
    }

    // Create connections between nodes
    nodes.forEach((node) => {
      const connectionCount = Math.floor(Math.random() * 3) + 1

      // Find closest nodes
      const sortedNodes = [...nodes]
        .filter((n) => n !== node)
        .sort((a, b) => {
          const distA = Math.hypot(a.x - node.x, a.y - node.y)
          const distB = Math.hypot(b.x - node.x, b.y - node.y)
          return distA - distB
        })

      // Connect to closest nodes
      for (let i = 0; i < Math.min(connectionCount, sortedNodes.length); i++) {
        node.connections.push(sortedNodes[i])
      }
    })

    // Start random pulses
    const startRandomPulses = () => {
      const randomNode = nodes[Math.floor(Math.random() * nodes.length)]
      randomNode.startPulse()

      setTimeout(startRandomPulses, Math.random() * 2000 + 1000)
    }

    startRandomPulses()

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0
    let isMouseMoving = false

    canvas.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      isMouseMoving = true

      // Find closest node and trigger pulse
      const closestNode = nodes.reduce((closest, node) => {
        const dist = Math.hypot(node.x - mouseX, node.y - mouseY)
        const closestDist = Math.hypot(closest.x - mouseX, closest.y - mouseY)

        return dist < closestDist ? node : closest
      }, nodes[0])

      if (Math.hypot(closestNode.x - mouseX, closestNode.y - mouseY) < 100) {
        closestNode.startPulse()
      }

      // Reset mouse moving flag after delay
      setTimeout(() => {
        isMouseMoving = false
      }, 100)
    })

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw all nodes
      nodes.forEach((node) => {
        node.draw(ctx)
      })

      // Draw mouse interaction
      if (isMouseMoving) {
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, 50, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(255, 77, 77, 0.1)"
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(mouseX, mouseY, 10, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 77, 77, 0.2)"
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-40" />
}
