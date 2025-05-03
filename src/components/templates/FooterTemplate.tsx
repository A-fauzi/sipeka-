'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronRight, Mail, MapPin, Phone, BookOpen, HelpCircle, Info, FileText } from 'lucide-react'

// Import shadcn/ui components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'

const footerLinks = [
  {
    title: 'Tentang SiPEKA+',
    links: [
      { label: 'Tentang Kami', href: '/about' },
      { label: 'Tim Pengelola', href: '/team' },
      { label: 'Kemitraan', href: '/partners' },
      { label: 'Kontak', href: '/contact' },
    ],
  },
  {
    title: 'Layanan',
    links: [
      { label: 'Cara Melapor', href: '/how-to-report' },
      { label: 'Jenis Keluhan', href: '/report-types' },
      { label: 'Instansi Terkait', href: '/agencies' },
      { label: 'Statistik Laporan', href: '/statistics' },
    ],
  },
  {
    title: 'Informasi',
    links: [
      { label: 'Kebijakan Privasi', href: '/privacy' },
      { label: 'Syarat Layanan', href: '/terms' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Bantuan', href: '/help' },
    ],
  },
]

const contactInfo = [
  { icon: <MapPin className="h-5 w-5" />, text: 'Jl. Jend. Ahmad Yani No.1, Bekasi' },
  { icon: <Phone className="h-5 w-5" />, text: '(021) 889-12345' },
  { icon: <Mail className="h-5 w-5" />, text: 'info@sipeka-plus.bekasikota.go.id' },
]

const socialLinks = [
  { name: 'Twitter', icon: 'https://cdn-icons-png.flaticon.com/512/733/733579.png', href: 'https://twitter.com/kotabekasi' },
  { name: 'Facebook', icon: 'https://cdn-icons-png.flaticon.com/512/733/733547.png', href: 'https://facebook.com/pemkotbekasi' },
  { name: 'Instagram', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png', href: 'https://instagram.com/pemkotbekasi' },
  { name: 'YouTube', icon: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png', href: 'https://youtube.com/pemkotbekasi' },
]
const quickAccessLinks = [
  { icon: <Info className="h-5 w-5" />, label: 'Panduan Pengguna', href: '/user-guide' },
  { icon: <BookOpen className="h-5 w-5" />, label: 'Peraturan Daerah', href: '/regulations' },
  { icon: <HelpCircle className="h-5 w-5" />, label: 'Bantuan', href: '/help' },
  { icon: <FileText className="h-5 w-5" />, label: 'Laporan Tahunan', href: '/annual-report' },
]

export default function Footer() {
  const pathname = usePathname()
  const hiddenFooterPaths = ['/help-center/article']; // Paths to hide footer
  const isHidden = hiddenFooterPaths.some(path => pathname.startsWith(path));
  const isMinimal = pathname.startsWith('/auth');

  if (isHidden) {
    return null
  }

  if (isMinimal) {
    return (
      <footer className="bg-muted/30 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="flex items-center space-x-2">
                <Image 
                  src="/img/logo.png" 
                  alt="SiPEKA+ Logo" 
                  width={120} 
                  height={120} 
                />
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Pemerintah Kota Bekasi. Hak Cipta Dilindungi.
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-muted/30 pt-16 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* SiPEKA+ Info */}
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <Image 
                src="/img/logo.png" 
                alt="SiPEKA+ Logo" 
                width={120} 
                height={120} 
              />
            </Link>
            <p className="text-muted-foreground mb-6">
              Sistem Pelaporan Keluhan Warga Plus - Menjembatani aspirasi warga dengan pemerintah Kota Bekasi secara real-time, transparan, dan terukur untuk mewujudkan kota layak huni dan berbasis teknologi.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link 
                  key={social.name} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-background hover:bg-primary/10 transition-colors"
                >
                  <Image 
                    src={social.icon} 
                    alt={social.name} 
                    width={20} 
                    height={20} 
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-base font-semibold mb-6">{column.title}</h3>
              <ul className="space-y-4">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="group text-muted-foreground hover:text-primary transition-colors flex items-center"
                    >
                      <ChevronRight className="h-3.5 w-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter & Contact */}
          <div>
            <h3 className="text-base font-semibold mb-6">Dapatkan Informasi Terbaru</h3>
            <p className="text-muted-foreground mb-4">
              Berlangganan buletin kami untuk mendapatkan informasi terbaru tentang layanan kota dan peningkatan SiPEKA+.
            </p>
            <div className="flex space-x-2 mb-6">
              <Input 
                type="email" 
                placeholder="Email Anda" 
                className="rounded-lg" 
              />
              <Button size="sm">
                Langganan
              </Button>
            </div>
            <Card className="bg-background/50 border-none">
              <CardContent className="p-4 space-y-3">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-primary mt-0.5 mr-3">{info.icon}</div>
                    <span className="text-sm text-muted-foreground">{info.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Access Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickAccessLinks.map((link, index) => (
            <Link 
              key={index}
              href={link.href}
              className="flex items-center p-3 bg-background/70 rounded-lg hover:bg-primary/10 transition-colors"
            >
              <div className="text-primary mr-3">{link.icon}</div>
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          ))}
        </div>

        <Separator className="my-6 opacity-50" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SiPEKA+ | Pemerintah Kota Bekasi. Hak Cipta Dilindungi.
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Syarat Layanan
            </Link>
            <Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}