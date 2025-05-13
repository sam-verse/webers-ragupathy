"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Mail, Globe, MapPin, Zap, Shield, Wifi, Clock, Users, CheckCircle } from "lucide-react"
import CircuitBackground from "@/components/circuit-background"
import { useInView } from "react-intersection-observer"

export default function VisitingCard() {
  const [activeTab, setActiveTab] = useState("about")
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    clients: 0,
    technicians: 0,
    experience: 0,
  })
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isPhotoHovered, setIsPhotoHovered] = useState(false)

  // For responsive design
  const [isMobile, setIsMobile] = useState(false)

  // For animations when elements come into view
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  // Check if mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Animate stats when in view
  useEffect(() => {
    if (statsInView) {
      const projectsInterval = setInterval(() => {
        setAnimatedStats((prev) => {
          if (prev.projects >= 354) {
            clearInterval(projectsInterval)
            return prev
          }
          return { ...prev, projects: Math.min(prev.projects + 50, 354) }
        })
      }, 30)

      const clientsInterval = setInterval(() => {
        setAnimatedStats((prev) => {
          if (prev.clients >= 265) {
            clearInterval(clientsInterval)
            return prev
          }
          return { ...prev, clients: Math.min(prev.clients + 10, 265) }
        })
      }, 50)

      const techniciansInterval = setInterval(() => {
        setAnimatedStats((prev) => {
          if (prev.technicians >= 20) {
            clearInterval(techniciansInterval)
            return prev
          }
          return { ...prev, technicians: Math.min(prev.technicians + 1, 20) }
        })
      }, 100)

      const experienceInterval = setInterval(() => {
        setAnimatedStats((prev) => {
          if (prev.experience >= 10) {
            clearInterval(experienceInterval)
            return prev
          }
          return { ...prev, experience: Math.min(prev.experience + 1, 10) }
        })
      }, 200)

      return () => {
        clearInterval(projectsInterval)
        clearInterval(clientsInterval)
        clearInterval(techniciansInterval)
        clearInterval(experienceInterval)
      }
    }
  }, [statsInView])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1D37] to-[#0c2347] text-white overflow-hidden relative">
      {/* Interactive Circuit Background */}
      <CircuitBackground />

      <div className="container mx-auto px-4 py-8 sm:max-w-lg md:max-w-xl lg:max-w-2xl relative z-10">
        {/* Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0A1D37]/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        >
          {/* Header Section */}
          <div className="relative">
            {/* Content */}
            <div className="relative p-6 pt-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Photo */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="relative"
                  onMouseEnter={() => setIsPhotoHovered(true)}
                  onMouseLeave={() => setIsPhotoHovered(false)}
                >
                  <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white/30 shadow-lg relative">
                    <Image
                      src="https://res.cloudinary.com/dlnwacm5j/image/upload/v1746376687/Bhoopathy_P_aekjng.png"
                      alt="Ragupathy"
                      fill
                      className="object-cover"
                    />

                    {/* Animated glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#FF4D4D]/0 via-[#FF4D4D]/30 to-[#FF4D4D]/0"
                      initial={{ opacity: 0, x: -100 }}
                      animate={{
                        opacity: isPhotoHovered ? 1 : 0,
                        x: isPhotoHovered ? 100 : -100,
                      }}
                      transition={{ duration: 1, repeat: isPhotoHovered ? Number.POSITIVE_INFINITY : 0 }}
                    />
                  </div>

                  {/* Animated circuit lines around photo */}
                  <svg
                    className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] -z-10"
                    viewBox="0 0 200 200"
                  >
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke="#FF4D4D"
                      strokeWidth="1"
                      strokeDasharray="10 5"
                      className="animate-spin-slow"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="white"
                      strokeWidth="0.5"
                      strokeDasharray="5 10"
                      className="animate-reverse-spin"
                    />
                  </svg>
                </motion.div>

                {/* Name, Designation, Logo */}
                <div className="flex flex-col items-center md:items-start">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex items-center gap-1 mb-2"
                  >
                    <Image
                      src="https://res.cloudinary.com/dlnwacm5j/image/upload/v1747159253/Untitled_design_27_z4knex.png"
                      alt="Webers Logo"
                      width={150}
                      height={90}
                      className="h-auto"
                    />
                  </motion.div>

                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-center md:text-left mb-1"
                  >
                    Ragupathy
                  </motion.h1>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-sm md:text-base text-white/80 font-medium mb-3"
                  >
                    Managing Director
                  </motion.div>

                  {/* Divider */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="w-20 h-1 bg-[#FF4D4D] rounded-full mb-4"
                  ></motion.div>

                  {/* Tagline */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="text-sm md:text-base text-center md:text-left text-white/70 italic mb-2"
                  >
                    "Powering Progress, Securing the Future"
                  </motion.p>
                </div>
              </div>

              {/* Experience Badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                className="absolute top-4 right-4 bg-[#FF4D4D] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center"
              >
                <Clock className="w-3 h-3 mr-1" />
                11 Years
              </motion.div>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-6 mb-6">
            <ContactButton
              icon={<Phone className="w-4 h-4" />}
              label="Phone"
              value="9944404611"
              href="tel:9944404611"
            />
            <ContactButton
              icon={<Mail className="w-4 h-4" />}
              label="Email"
              value="ragu@webers.co.in"
              href="mailto:ragu@webers.co.in"
            />
            <ContactButton
              icon={<Globe className="w-4 h-4" />}
              label="Website"
              value="www.webers.co.in"
              href="https://www.webers.co.in"
            />
            <ContactButton
              icon={<MapPin className="w-4 h-4" />}
              label="Location"
              value="Tap to View"
              href="https://maps.app.goo.gl/yourLocationLink"
            />
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <TabButton label="About" isActive={activeTab === "about"} onClick={() => setActiveTab("about")} />
            <TabButton label="Services" isActive={activeTab === "services"} onClick={() => setActiveTab("services")} />
            <TabButton label="Stats" isActive={activeTab === "stats"} onClick={() => setActiveTab("stats")} />
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === "about" && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-[#FF4D4D]" />
                    About Webers
                  </h3>
                  <div className="flex items-center justify-center mb-4">
                    <Image
                      src="/webers-building.jpg"
                      alt="Webers Office"
                      width={400}
                      height={200}
                      className="rounded-lg object-cover h-48 w-full"
                    />
                  </div>
                  <p className="text-sm text-white/80 mb-4">
                    Webers is a leading provider of electrical solutions, networking infrastructure, and digital
                    security systems with 11 years of industry experience.
                  </p>
                  <p className="text-sm text-white/80">
                    We pride ourselves on delivering high-quality, reliable solutions tailored to meet the unique needs
                    of our clients across various sectors.
                  </p>
                </motion.div>
              )}

              {activeTab === "services" && (
                <motion.div
                  key="services"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-[#FF4D4D]" />
                    Our Services
                  </h3>
                  <div className="space-y-6">
                    <ServiceItem
                      icon={<Zap className="w-5 h-5 text-[#FF4D4D]" />}
                      title="Electrical Systems"
                      description="Complete electrical solutions for commercial and residential properties."
                      imageSrc="/service-electrical.jpg"
                    />
                    <ServiceItem
                      icon={<Wifi className="w-5 h-5 text-[#FF4D4D]" />}
                      title="Networking Solutions"
                      description="Advanced networking infrastructure for seamless connectivity."
                      imageSrc="/service-networking.jpg"
                    />
                    <ServiceItem
                      icon={<Shield className="w-5 h-5 text-[#FF4D4D]" />}
                      title="Digital Security Systems"
                      description="Comprehensive security solutions to protect your assets."
                      imageSrc="/service-security.jpg"
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === "stats" && (
                <motion.div
                  key="stats"
                  ref={statsRef}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-[#FF4D4D]" />
                    Our Achievements
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <StatCard
                      icon={<CheckCircle className="w-5 h-5 text-[#FF4D4D]" />}
                      value={animatedStats.projects.toString()}
                      label="Projects Completed"
                      suffix="+"
                    />
                    <StatCard
                      icon={<Users className="w-5 h-5 text-[#FF4D4D]" />}
                      value={animatedStats.clients.toString()}
                      label="Satisfied Clients"
                      suffix="+"
                    />
                    <StatCard
                      icon={<Users className="w-5 h-5 text-[#FF4D4D]" />}
                      value={animatedStats.technicians.toString()}
                      label="Trained Technicians"
                      suffix="+"
                    />
                    <StatCard
                      icon={<Clock className="w-5 h-5 text-[#FF4D4D]" />}
                      value={animatedStats.experience.toString()}
                      label="Years of Experience"
                      suffix="+"
                    />
                  </div>

                  {/* Client logos */}
                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-3 text-white/70">Trusted By</h4>
                    <div className="flex flex-wrap justify-center gap-4">
                      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <div key={i} className="bg-white p-2 rounded-md w-20 h-20 flex items-center justify-center">
                          <Image
                            src={`/client-${i}.png`}
                            alt={`Client ${i}`}
                            width={60}
                            height={60}
                            className="object-contain hover:scale-110 transition-transform"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-black/20 border-t border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src="https://res.cloudinary.com/dlnwacm5j/image/upload/v1747159253/Untitled_design_27_z4knex.png"
                  alt="Webers Logo"
                  width={100}
                  height={45}
                  className="h-auto"
                />
                <div className="text-sm text-white/70 font-medium">© {new Date().getFullYear()} Webers</div>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  className="text-white/70 hover:text-[#FF4D4D] transition-colors p-2 hover:bg-white/5 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className="text-white/70 hover:text-[#FF4D4D] transition-colors p-2 hover:bg-white/5 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                </Link>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="text-white/70 hover:text-[#FF4D4D] transition-colors p-2 hover:bg-white/5 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

interface ContactButtonProps {
  icon: React.ReactNode
  label: string
  value: string
  href: string
}

function ContactButton({ icon, label, value, href }: ContactButtonProps) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors relative overflow-hidden group"
    >
      {/* Animated highlight effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D4D]/0 via-[#FF4D4D]/10 to-[#FF4D4D]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

      <div className="w-8 h-8 rounded-full bg-[#FF4D4D]/10 flex items-center justify-center mr-2 text-[#FF4D4D] group-hover:bg-[#FF4D4D]/20 transition-colors">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs text-white/60 truncate">{label}</div>
        <div className="text-sm font-medium truncate">{value}</div>
      </div>
    </motion.a>
  )
}

interface TabButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
}

function TabButton({ label, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 text-sm font-medium transition-colors relative overflow-hidden ${
        isActive ? "text-white" : "text-white/50 hover:text-white/80"
      }`}
    >
      {label}
      {isActive && (
        <>
          <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF4D4D]" />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "linear" }}
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30 w-full"
          />
        </>
      )}
    </button>
  )
}

interface ServiceItemProps {
  icon: React.ReactNode
  title: string
  description: string
  imageSrc: string
}

function ServiceItem({ icon, title, description, imageSrc }: ServiceItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="flex flex-col md:flex-row gap-4 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className="relative w-full md:w-24 h-24 rounded-md overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-2">{icon}</div>
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-1">{title}</h4>
        <p className="text-xs text-white/70">{description}</p>
      </div>
    </motion.div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  value: string
  label: string
  suffix?: string
}

function StatCard({ icon, value, label, suffix = "" }: StatCardProps) {
  return (
    <motion.div
      className="bg-white/5 rounded-lg p-3 flex flex-col items-center text-center relative overflow-hidden group"
      whileHover={{ y: -5 }}
    >
      {/* Animated highlight effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D4D]/0 via-[#FF4D4D]/10 to-[#FF4D4D]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

      <div className="mb-2 relative z-10">{icon}</div>
      <div className="text-xl font-bold mb-1 relative z-10">
        {value}
        {suffix}
      </div>
      <div className="text-xs text-white/70 relative z-10">{label}</div>
    </motion.div>
  )
}
