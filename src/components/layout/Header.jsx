'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import DarkModeToggle from "@/components/DarkModeToggle"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  // Use useEffect instead of useLayoutEffect to avoid hydration issues
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    // run once immediately, then on every scroll
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const headerClasses = [
    "fixed right-0 w-full top-0 z-50 will-change-[background-color,box-shadow] transition-all duration-200",
    isScrolled
      ? "bg-white/95 dark:bg-black/95 shadow-md"
      : "bg-transparent dark:bg-transparent"
  ].join(" ")

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          DocProcess
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="#features"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Features
          </Link>
          <DarkModeToggle />
        </nav>
      </div>
    </header>
  )
}
