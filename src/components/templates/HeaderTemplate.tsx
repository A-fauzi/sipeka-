
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { 
  Menu, 
  Bell, 
  HelpCircle, 
  User, 
  ChevronRight, 
  Search,
  Rocket,
  BarChart3,
  FileText,
  Home,
  Info,
  X,
  Settings,
  LogOut
} from 'lucide-react'

// Import shadcn/ui components
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuContent,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const navItems = [
  { id: 'home', label: 'Beranda', icon: Home, description: 'Halaman utama aplikasi' },
  { id: 'lapor', label: 'Lapor', icon: FileText, description: 'Buat laporan baru' },
  { id: 'pantau', label: 'Pantau', icon: Rocket, description: 'Pantau status laporan' },
  { id: 'statistik', label: 'Statistik', icon: BarChart3, description: 'Lihat data statistik' },
  { id: 'tentang', label: 'Tentang', icon: Info, description: 'Informasi tentang aplikasi' }
]

export default function Header() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState('home')
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchActive, setIsSearchActive] = useState(false)

  const hiddenNavbarPaths = ['/help-center']
  const isHidden = hiddenNavbarPaths.some(path => pathname.startsWith(path))
  const isMinimal = pathname !== '/'

  // Track scroll position and active section
  useEffect(() => {
    if (isMinimal) return

    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)
      setScrolled(currentScrollPos > 20)

      // Update active section based on scroll position
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

  // ESC key to close search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchActive(false)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (isHidden) {
    return null
  }

  // Component for search overlay
  const SearchOverlay = () => (
    <div className={cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity",
      isSearchActive ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      <div className="absolute inset-x-0 top-0 pt-20 pb-8 px-4 sm:px-6 md:px-8 flex flex-col items-center">
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            autoFocus={isSearchActive}
            type="text"
            placeholder="Cari laporan, statistik, atau informasi..."
            className="w-full pl-12 pr-12 py-3 text-lg bg-background border border-border/30 rounded-2xl shadow-lg focus:ring-2 focus:ring-primary-blue/20 focus:outline-none transition-all"
          />
          <button 
            onClick={() => setIsSearchActive(false)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <X className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        </div>
        
        <div className="mt-6 w-full max-w-2xl mx-auto bg-background/70 backdrop-blur-md rounded-2xl p-4 border border-border/30 shadow-lg">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Pencarian Populer</h3>
          <div className="flex flex-wrap gap-2">
            {['Laporan terbaru', 'Statistik bulanan', 'Tutorial pelaporan', 'FAQ'].map((item) => (
              <Button 
                key={item} 
                variant="outline" 
                size="sm" 
                className="rounded-full text-xs hover:bg-primary-blue/10 border-border/30"
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Minimal navbar for non-home pages
  if (isMinimal) {
    return (
      <>
        <SearchOverlay />
        <nav className="sticky top-0 z-40 w-full py-3 backdrop-blur-xl bg-background/80 dark:bg-background/80 border-b border-border/10 shadow-sm">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative h-9 w-9 overflow-hidden rounded-xl shadow-lg">
                <div className="absolute inset-0 bg-coral-gradient opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Image 
                  src="/img/logo.png" 
                  alt="SiPEKA+ Logo" 
                  width={36} 
                  height={36} 
                  className="transition-transform duration-300 group-hover:scale-110" 
                />
              </div>
            </Link>
          
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <NavigationMenu>
                <NavigationMenuList className="space-x-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavigationMenuItem key={item.id}>
                        <Link href={`/#${item.id}`} legacyBehavior passHref>
                          <NavigationMenuLink className={cn(
                            "group flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            pathname === `/#${item.id}` 
                              ? "text-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent"
                          )}>
                            <Icon size={16} className="mr-2" />
                            <span>{item.label}</span>
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground relative group"
                onClick={() => setIsSearchActive(true)}
              >
                <Search size={18} />
                <span className="sr-only">Search</span>
                <span className="absolute inset-0 bg-primary-blue/5 scale-0 rounded-full group-hover:scale-100 transition-transform duration-200"></span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground relative group"
              >
                <Bell size={18} />
                <span className="absolute top-1 right-1.5 h-1.5 w-1.5 bg-destructive rounded-full"></span>
                <span className="sr-only">Notifications</span>
                <span className="absolute inset-0 bg-primary-blue/5 scale-0 rounded-full group-hover:scale-100 transition-transform duration-200"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/*<Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-2 rounded-full border border-border/30 hover:bg-accent hover:border-border/50 transition-all duration-200"
                  >
                    <User size={16} className="mr-1 text-primary-blue" />
                    <span className="text-sm">Masuk</span>
                    <ChevronRight size={14} className="ml-1 opacity-70" />
                  </Button>*/}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-1 border-border/30">
                  <DropdownMenuItem asChild>
                    <Link href="/auth/login" className="cursor-pointer">
                      <User size={16} className="mr-2 text-primary-blue" />
                      <span>Masuk</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/register" className="cursor-pointer">
                      <FileText size={16} className="mr-2 text-primary-blue" />
                      <span>Daftar Baru</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/help" className="cursor-pointer">
                      <HelpCircle size={16} className="mr-2 text-muted-foreground" />
                      <span>Pusat Bantuan</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Mobile menu trigger */}
              <div className="md:hidden ml-1">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-foreground p-1.5 hover:bg-accent rounded-lg"
                    >
                      <Menu size={20} />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full max-w-xs border-l border-border/10">
                    
                    <div className="space-y-1">
                      {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.id}
                            href={`/#${item.id}`}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium transition-colors",
                              activeSection === item.id
                                ? "bg-primary-blue/10 text-primary"
                                : "hover:bg-accent text-muted-foreground hover:text-foreground"
                            )}
                          >
                            <div className="flex items-center">
                              <div className={cn(
                                "flex items-center justify-center w-8 h-8 rounded-lg mr-3",
                                activeSection === item.id 
                                  ? "bg-primary-blue/10" 
                                  : "bg-background"
                              )}>
                                <Icon size={16} className={cn(
                                  activeSection === item.id 
                                    ? "text-primary-blue" 
                                    : "text-muted-foreground"
                                )} />
                              </div>
                              <div className="flex flex-col">
                                <span>{item.label}</span>
                                <span className="text-xs text-muted-foreground">{item.description}</span>
                              </div>
                            </div>
                            <ChevronRight size={16} className="text-muted-foreground" />
                          </Link>
                        );
                      })}
                    </div>
                    
                    <div className="pt-4 mt-6 space-y-2">
                      <Button 
                        asChild 
                        className="w-full rounded-lg bg-primary-blue hover:bg-primary-blue/90 text-white shadow-sm shadow-primary-blue/20 transition-all duration-200" 
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/auth/login" className="flex items-center justify-center">
                          <User size={16} className="mr-2" />
                          <span>Masuk</span>
                        </Link>
                      </Button>
                      
                      <Button 
                        asChild 
                        variant="outline"
                        className="w-full rounded-lg border-border/30 hover:bg-accent transition-all duration-200" 
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/auth/register" className="flex items-center justify-center">
                          <span>Daftar Baru</span>
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-accent/50 rounded-lg p-4 border border-border/10">
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <HelpCircle size={14} className="mr-1.5 text-primary-blue" />
                          Butuh bantuan?
                        </h4>
                        <p className="text-xs text-muted-foreground mb-3">
                          Kunjungi pusat bantuan kami untuk informasi lebih lanjut
                        </p>
                        <Button 
                          asChild 
                          variant="secondary" 
                          size="sm" 
                          className="w-full rounded-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link href="/help">Pusat Bantuan</Link>
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </nav>
      </>
    )
  }

  // Main home navbar with glass effect and animations
  return (
    <>
      <SearchOverlay />
      <nav
        className={cn(
          "fixed top-0 w-full z-40 transition-all duration-500 ease-out border-b",
          scrolled 
            ? 'backdrop-blur-xl bg-background/90 border-border/10 shadow-sm py-2' 
            : 'backdrop-blur-sm bg-background/50 border-transparent py-4',
          isVisible ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Brand Logo */}
            <Link href="/" className="group">
              <Image 
                    src="/img/logo.png" 
                    alt="SiPEKA+ Logo" 
                    width={120} 
                    height={120} 
                    className="transition-transform duration-300 group-hover:scale-110" 
                  />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className={cn(
                "p-1 rounded-full transition-all duration-300",
                scrolled 
                  ? "bg-accent/70 backdrop-blur-md shadow-sm" 
                  : "bg-background/80 backdrop-blur-lg shadow-lg"
              )}>
                <NavigationMenu>
                  <NavigationMenuList className="space-x-1">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeSection === item.id;
                      
                      return (
                        <NavigationMenuItem key={item.id}>
                          <Link href={`/#${item.id}`} legacyBehavior passHref>
                            <NavigationMenuLink
                              className={cn(
                                "px-3 py-1.5 rounded-full transition-all duration-300 flex items-center space-x-2 relative group",
                                isActive
? "bg-coral-gradient text-white font-medium shadow-sm shadow-primary-blue/10"
                                  : "text-muted-foreground hover:bg-primary-blue/10 hover:text-foreground"
                              )}
                            >
                              {isActive && (
                                <span className="absolute inset-0 animate-pulse-slow bg-primary-blue/20 rounded-full blur opacity-60"></span>
                              )}
                              <Icon size={16} className={isActive ? "text-white" : "text-muted-foreground group-hover:text-primary-blue transition-colors"} />
                              <span>{item.label}</span>
                            </NavigationMenuLink>
                          </Link>
                        </NavigationMenuItem>
                      );
                    })}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "text-muted-foreground hover:text-foreground relative group rounded-full",
                  scrolled ? "h-8 w-8" : "h-9 w-9"
                )}
                onClick={() => setIsSearchActive(true)}
              >
                <Search size={18} />
                <span className="sr-only">Search</span>
                <span className="absolute inset-0 bg-primary-blue/5 scale-0 rounded-full group-hover:scale-100 transition-transform duration-200"></span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "text-muted-foreground hover:text-foreground relative group rounded-full",
                  scrolled ? "h-8 w-8" : "h-9 w-9"
                )}
              >
                <Bell size={18} />
                <span className="absolute top-1 right-1.5 h-1.5 w-1.5 bg-destructive rounded-full"></span>
                <span className="sr-only">Notifications</span>
                <span className="absolute inset-0 bg-primary-blue/5 scale-0 rounded-full group-hover:scale-100 transition-transform duration-200"></span>
              </Button>
              
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn(
                      "group rounded-full transition-all duration-300 px-3",
                      scrolled ? "py-1" : "py-1.5",
                      "bg-transparent hover:bg-accent data-[state=open]:bg-accent"
                    )}>
                      <HelpCircle size={16} className="mr-1.5 text-muted-foreground group-hover:text-primary-blue" />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground">Bantuan</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[320px] p-3 bg-background/95 backdrop-blur-xl border border-border/20 rounded-xl shadow-lg">
                      <div className="grid grid-cols-1 gap-1">
                        <Link
                          href="/help"
                          className="flex items-start space-x-3 p-3 hover:bg-accent rounded-lg group transition-colors"
                        >
                          <div className="bg-primary-blue/10 p-2 rounded-lg group-hover:bg-primary-blue/20 transition-colors">
                            <HelpCircle size={18} className="text-primary-blue" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium">Pusat Bantuan</h4>
                            <p className="text-xs text-muted-foreground">Panduan penggunaan aplikasi dan FAQ</p>
                          </div>
                        </Link>
                        <Link
                          href="/help/tutorial"
                          className="flex items-start space-x-3 p-3 hover:bg-accent rounded-lg group transition-colors"
                        >
                          <div className="bg-primary-blue/10 p-2 rounded-lg group-hover:bg-primary-blue/20 transition-colors">
                            <FileText size={18} className="text-primary-blue" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium">Tutorial</h4>
                            <p className="text-xs text-muted-foreground">Panduan visual cara menggunakan fitur</p>
                          </div>
                        </Link>
                        <Link
                          href="/help/contact"
                          className="flex items-start space-x-3 p-3 hover:bg-accent rounded-lg group transition-colors"
                        >
                          <div className="bg-primary-blue/10 p-2 rounded-lg group-hover:bg-primary-blue/20 transition-colors">
                            <User size={18} className="text-primary-blue" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium">Kontak Kami</h4>
                            <p className="text-xs text-muted-foreground">Hubungi tim dukungan</p>
                          </div>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/*<Button 
                    variant="outline" 
                    size="sm" 
                    className={cn(
                      "ml-2 rounded-full border-border/30 hover:bg-accent hover:border-border/50 transition-all duration-200",
                      scrolled ? "py-1 px-3" : "py-1.5 px-4"
                    )}
                  >
                    <Avatar className="h-5 w-5 mr-2">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary-blue/10 text-primary-blue text-xs">
                        <User size={14} />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Masuk</span>
                    <ChevronRight size={14} className="ml-1 opacity-70" />
                  </Button>*/}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60 mt-1 border-border/30 bg-background/95 backdrop-blur-xl p-2">
                  <DropdownMenuLabel className="px-2 py-1.5 text-xs font-normal text-muted-foreground">
                    Akun
                  </DropdownMenuLabel>
                  
                  <DropdownMenuItem asChild className="rounded-lg focus:bg-accent hover:bg-accent">
                    <Link href="/auth/login" className="cursor-pointer flex items-center px-2 py-2">
                      <div className="bg-primary-blue/10 p-1.5 rounded-lg mr-2">
                        <User size={16} className="text-primary-blue" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm">Masuk</span>
                        <span className="text-xs text-muted-foreground">Akses akun anda</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild className="rounded-lg focus:bg-accent hover:bg-accent">
                    <Link href="/auth/register" className="cursor-pointer flex items-center px-2 py-2">
                      <div className="bg-primary-blue/10 p-1.5 rounded-lg mr-2">
                        <FileText size={16} className="text-primary-blue" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm">Daftar Baru</span>
                        <span className="text-xs text-muted-foreground">Buat akun baru</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator className="my-1.5 bg-border/20" />
                  
                  <DropdownMenuLabel className="px-2 py-1.5 text-xs font-normal text-muted-foreground">
                    Bantuan & Pengaturan
                  </DropdownMenuLabel>
                  
                  <DropdownMenuItem asChild className="rounded-lg focus:bg-accent hover:bg-accent">
                    <Link href="/help" className="cursor-pointer flex items-center px-2 py-2">
                      <HelpCircle size={16} className="mr-2 text-muted-foreground" />
                      <span className="text-sm">Pusat Bantuan</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild className="rounded-lg focus:bg-accent hover:bg-accent">
                    <Link href="/settings" className="cursor-pointer flex items-center px-2 py-2">
                      <Settings size={16} className="mr-2 text-muted-foreground" />
                      <span className="text-sm">Pengaturan</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild className="rounded-lg focus:bg-accent hover:bg-accent">
                    <Link href="/" className="cursor-pointer flex items-center px-2 py-2 text-destructive focus:text-destructive">
                      <LogOut size={16} className="mr-2" />
                      <span className="text-sm">Keluar</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Mobile menu trigger */}
              <div className="md:hidden ml-1">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={cn(
                        "text-muted-foreground hover:text-foreground hover:bg-accent rounded-full",
                        scrolled ? "h-8 w-8" : "h-9 w-9"
                      )}
                    >
                      <Menu size={20} />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full max-w-xs border-l border-border/10">
                    
                    <div className="space-y-1">
                      {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;
                        
                        return (
                          <Link
                            key={item.id}
                            href={`/#${item.id}`}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium transition-colors",
                              isActive
                                ? "bg-primary-blue/10 text-primary"
                                : "hover:bg-accent text-muted-foreground hover:text-foreground"
                            )}
                          >
                            <div className="flex items-center">
                              <div className={cn(
                                "flex items-center justify-center w-8 h-8 rounded-lg mr-3",
                                isActive 
                                  ? "bg-primary-blue/10" 
                                  : "bg-background"
                              )}>
                                <Icon size={16} className={cn(
                                  isActive 
                                    ? "text-primary-blue" 
                                    : "text-muted-foreground"
                                )} />
                              </div>
                              <div className="flex flex-col">
                                <span>{item.label}</span>
                                <span className="text-xs text-muted-foreground">{item.description}</span>
                              </div>
                            </div>
                            <ChevronRight size={16} className="text-muted-foreground" />
                          </Link>
                        );
                      })}
                    </div>
                    
                    <div className="pt-4 mt-6 space-y-2">
                      <Button 
                        asChild 
                        className="w-full rounded-lg bg-primary-blue hover:bg-primary-blue/90 text-white shadow-sm shadow-primary-blue/20 transition-all duration-200" 
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/auth/login" className="flex items-center justify-center">
                          <User size={16} className="mr-2" />
                          <span>Masuk</span>
                        </Link>
                      </Button>
                      
                      <Button 
                        asChild 
                        variant="outline"
                        className="w-full rounded-lg border-border/30 hover:bg-accent transition-all duration-200" 
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/auth/register" className="flex items-center justify-center">
                          <span>Daftar Baru</span>
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-accent/50 rounded-lg p-4 border border-border/10">
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <HelpCircle size={14} className="mr-1.5 text-primary-blue" />
                          Butuh bantuan?
                        </h4>
                        <p className="text-xs text-muted-foreground mb-3">
                          Kunjungi pusat bantuan kami untuk informasi lebih lanjut
                        </p>
                        <Button 
                          asChild 
                          variant="secondary" 
                          size="sm" 
                          className="w-full rounded-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link href="/help">Pusat Bantuan</Link>
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}