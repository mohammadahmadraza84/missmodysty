import { Link } from 'react-router-dom'
import { Instagram, Youtube } from 'lucide-react'

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-plum-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <h2 className="font-display text-3xl font-light italic text-white mb-4">Miss Modysty</h2>
            <p className="font-body text-white/60 text-sm leading-relaxed max-w-xs">
              The UK's curated destination for modest fashion. Beautifully edited, powered by AI, made for you.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com/missmodysty" target="_blank" rel="noopener noreferrer"
                className="text-white/60 hover:text-gold-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://tiktok.com/@missmodysty" target="_blank" rel="noopener noreferrer"
                className="text-white/60 hover:text-gold-400 transition-colors">
                <TikTokIcon />
              </a>
              <a href="https://youtube.com/@missmodysty" target="_blank" rel="noopener noreferrer"
                className="text-white/60 hover:text-gold-400 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-body text-xs tracking-[0.2em] uppercase text-gold-400 mb-4">Explore</h3>
            <ul className="space-y-3">
              {[
                { to: '/discover',   label: 'Discover' },
                { to: '/ai-stylist', label: 'AI Stylist' },
                { to: '/try-on',     label: 'Virtual Try-On' },
                { to: '/about',      label: 'Our Story' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="font-body text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Occasions */}
          <div>
            <h3 className="font-body text-xs tracking-[0.2em] uppercase text-gold-400 mb-4">Occasions</h3>
            <ul className="space-y-3">
              {['Eid & Celebrations','Wedding Guest','Workwear','Everyday','Activewear','Plus Size'].map(o => (
                <li key={o}>
                  <Link to="/discover" className="font-body text-sm text-white/60 hover:text-white transition-colors">
                    {o}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-white/40">
            © {new Date().getFullYear()} Miss Modysty. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy','Terms of Use','Affiliate Disclosure','Cookie Policy'].map(l => (
              <a key={l} href="#" className="font-body text-xs text-white/40 hover:text-white/70 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>

        <p className="font-body text-xs text-white/30 mt-4 text-center">
          This site contains affiliate links. We may earn a small commission when you purchase through our links, at no extra cost to you.
        </p>
      </div>
    </footer>
  )
}
