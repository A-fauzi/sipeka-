'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, Bell, HelpCircle, User } from 'lucide-react'

// Import shadcn/ui components
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

const navItems = [
  { id: 'home', label: 'Beranda' },
  { id: 'lapor', label: 'Lapor' },
  { id: 'pantau', label: 'Pantau' },
  { id: 'statistik', label: 'Statistik' },
  { id: 'tentang', label: 'Tentang' }
]

export default function Header() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState('home')
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const hiddenNavbarPaths = ['/help-center']; // Paths to hide Navbar
  const isHidden = hiddenNavbarPaths.some(path => pathname.startsWith(path));
  const isMinimal = pathname !== '/'

  useEffect(() => {
    if (isMinimal) return

    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)
      setScrolled(currentScrollPos > 20)

      for (const item of navItems) {
        const el = document.getElementById(item.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(item.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos, isMinimal])

  if (isHidden) {
    return null
  }

  if (isMinimal) {
    return (
      <nav className="w-full py-4 px-6 shadow-md bg-background">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative overflow-hidden rounded-lg">
              <Image 
                src="/img/logo.png" 
                alt="SiPEKA+ Logo" 
                width={120} 
                height={120} 
                className="transition-transform duration-300 group-hover:scale-110" 
              />
            </div>
            <span className="text-xl font-medium text-primary">SiPEKA+</span>
          </Link>
          
          {/* Minimal header actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <HelpCircle size={20} />
            </Button>
            <Button variant="outline" size="sm" className="rounded-full flex items-center space-x-2">
              <User size={16} />
              <span>Masuk</span>
            </Button>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-500 ease-out",
        scrolled 
          ? 'bg-background/70 dark:bg-background/80 shadow-md py-3' 
          : 'bg-transparent py-5',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {/* Brand - Logo Only */}
          <Link href="/" className="group">
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 rounded-xl -z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <Image 
                src="/img/logo.png" 
                alt="SiPEKA+ Logo" 
                width={120} 
                height={120} 
                className="transition-transform duration-300 group-hover:scale-110" 
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.id}>
                    <Link 
                      href={`/#${item.id}`} 
                      legacyBehavior 
                      passHref
                    >
                      <NavigationMenuLink
                        className={cn(
                          "px-4 py-2 rounded-full transition-all duration-300 block",
                          activeSection === item.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:text-primary"
                        )}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                  <div className="flex items-center space-x-1 ml-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Bell size={20} />
                    </Button>
                    <Button 
                      asChild
                      variant="default" 
                      size="sm" 
                      className="rounded-full hover:-translate-y-0.5 transition-transform"
                    >
                      <Link href="/auth/login">Masuk / Daftar</Link>
                    </Button>
                  </div>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-primary"
            >
              <Bell size={20} />
            </Button>
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-muted-foreground hover:text-primary p-2 hover:bg-primary/10"
                >
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="pt-16">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.id}
                      href={`/#${item.id}`}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "py-3 text-base font-medium transition-colors flex items-center justify-between",
                        activeSection === item.id
                          ? "text-primary font-medium"
                          : "text-muted-foreground hover:text-primary"
                      )}
                    >
                      <span>{item.label}</span>
                      {activeSection === item.id && (
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      )}
                    </Link>
                  ))}
                  <div className="pt-4 mt-2">
                    <Button 
                      asChild 
                      className="w-full rounded-xl" 
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/auth/login">Masuk / Daftar</Link>
                    </Button>
                  </div>
                  
                  <div className="border-t border-border pt-4 mt-2">
                    <div className="flex flex-col space-y-3">
                      <Link
                        href="/help"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 text-muted-foreground hover:text-primary"
                      >
                        <HelpCircle size={18} />
                        <span>Pusat Bantuan</span>
                      </Link>
                      <Link
                        href="/faq"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 text-muted-foreground hover:text-primary"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                        <span>FAQ</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}