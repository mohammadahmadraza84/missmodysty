import { Link } from 'react-router-dom'
import { Sparkles, Camera, ArrowRight, Star, Shield, Globe } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products, occasions } from '../data/products'

export default function Home() {
  const featuredProducts = products.slice(0, 4)

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-screen bg-plum-900 bg-hero-pattern flex items-center overflow-hidden">
        {/* Gold accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold-500 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

          {/* Left: Text */}
          <div>
            <p className="section-eyebrow text-gold-400 mb-6">The UK's Modest Fashion Destination</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.05] mb-6">
              Style Without
              <span className="block italic text-gold-400"> Compromise</span>
            </h1>
            <p className="font-body text-white/70 text-lg leading-relaxed mb-10 max-w-md">
              Thousands of beautiful modest fashion pieces, curated from the UK's best brands. 
              Powered by AI. Styled for you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/discover" className="btn-gold flex items-center gap-2 text-sm">
                Discover Now <ArrowRight size={16} />
              </Link>
              <Link to="/ai-stylist" className="btn-outline border-white/30 text-white hover:bg-white hover:text-plum-900 flex items-center gap-2 text-sm">
                <Sparkles size={16} /> Try AI Stylist
              </Link>
            </div>
          </div>

          {/* Right: Feature cards */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <Link to="/ai-stylist"
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-gold-500/20 flex items-center justify-center mb-4">
                <Sparkles size={24} className="text-gold-400" />
              </div>
              <h3 className="font-display text-xl text-white font-light mb-2">AI Stylist</h3>
              <p className="font-body text-white/50 text-sm leading-relaxed">
                Tell me your occasion, budget and style. I'll curate the perfect outfit.
              </p>
              <span className="flex items-center gap-1 text-gold-400 text-xs font-body mt-4 group-hover:gap-2 transition-all">
                Try now <ArrowRight size={12} />
              </span>
            </Link>

            <Link to="/try-on"
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group cursor-pointer mt-8"
            >
              <div className="w-12 h-12 bg-mauve/30 flex items-center justify-center mb-4">
                <Camera size={24} className="text-mauve" />
              </div>
              <h3 className="font-display text-xl text-white font-light mb-2">Virtual Try-On</h3>
              <p className="font-body text-white/50 text-sm leading-relaxed">
                See how any outfit looks on you before you buy. Powered by AI.
              </p>
              <span className="flex items-center gap-1 text-gold-400 text-xs font-body mt-4 group-hover:gap-2 transition-all">
                Try now <ArrowRight size={12} />
              </span>
            </Link>

            <div className="col-span-2 bg-gradient-to-r from-gold-500/10 to-transparent border border-gold-500/20 p-5">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-mauve to-plum-700 border-2 border-plum-900" />
                  ))}
                </div>
                <div>
                  <p className="font-body text-white text-sm font-medium">Join 2,000+ modest fashion lovers</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={10} className="fill-gold-400 text-gold-400" />)}
                    <span className="font-body text-white/50 text-xs ml-1">Trusted curations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="font-body text-white text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-white animate-pulse" />
        </div>
      </section>

      {/* ── AI FEATURES BANNER ── */}
      <section className="bg-blush py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/ai-stylist"
              className="flex items-center gap-5 bg-white p-6 group hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-plum-900 flex items-center justify-center flex-shrink-0">
                <Sparkles size={24} className="text-gold-400" />
              </div>
              <div>
                <p className="section-eyebrow mb-1">New Feature</p>
                <h3 className="font-display text-xl text-plum-900 font-light">AI Modest Fashion Stylist</h3>
                <p className="font-body text-sm text-plum-500 mt-1">
                  Describe your occasion — get a curated outfit instantly.
                </p>
              </div>
              <ArrowRight size={20} className="text-gold-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link to="/try-on"
              className="flex items-center gap-5 bg-white p-6 group hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-plum-900 flex items-center justify-center flex-shrink-0">
                <Camera size={24} className="text-gold-400" />
              </div>
              <div>
                <p className="section-eyebrow mb-1">New Feature</p>
                <h3 className="font-display text-xl text-plum-900 font-light">Virtual Try-On</h3>
                <p className="font-body text-sm text-plum-500 mt-1">
                  Upload your photo or choose an avatar. See it on you.
                </p>
              </div>
              <ArrowRight size={20} className="text-gold-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── OCCASION EDITS ── */}
      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="section-eyebrow mb-2">Shop by Occasion</p>
              <h2 className="section-title">The Occasion Edit</h2>
            </div>
            <Link to="/discover" className="font-body text-sm text-gold-500 hover:text-gold-600 flex items-center gap-1 transition-colors">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
            {occasions.map(({ label, emoji }) => (
              <Link
                key={label}
                to="/discover"
                className="flex-shrink-0 flex flex-col items-center gap-2 group"
              >
                <div className="w-24 h-24 md:w-28 md:h-28 bg-blush group-hover:bg-plum-900 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-3xl">{emoji}</span>
                </div>
                <span className="font-body text-xs text-plum-700 text-center leading-tight w-20 md:w-24">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-eyebrow mb-2">Handpicked For You</p>
              <h2 className="section-title">Featured Picks</h2>
            </div>
            <Link to="/discover" className="font-body text-sm text-gold-500 hover:text-gold-600 flex items-center gap-1 transition-colors">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY MISS MODYSTY ── */}
      <section className="py-20 bg-plum-900 bg-hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-eyebrow text-gold-400 mb-3">Why Choose Us</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white">
              Modest Fashion, <span className="italic text-gold-400">Reimagined</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles size={28} className="text-gold-400" />,
                title: 'Powered by AI',
                desc: 'Our AI stylist understands the nuances of modest fashion — from hijab-compatible necklines to occasion-appropriate coverage.',
              },
              {
                icon: <Shield size={28} className="text-gold-400" />,
                title: 'Trusted Curation',
                desc: 'Every brand on Miss Modysty is hand-selected. We only feature brands that genuinely understand and cater to modest fashion.',
              },
              {
                icon: <Globe size={28} className="text-gold-400" />,
                title: 'UK-Focused',
                desc: 'All brands ship to the UK. Prices in GBP. Sizing in UK conventions. Fashion that understands your world.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5">
                  {icon}
                </div>
                <h3 className="font-display text-2xl text-white font-light mb-3">{title}</h3>
                <p className="font-body text-white/55 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-20 bg-blush">
        <div className="max-w-xl mx-auto px-4 text-center">
          <p className="section-eyebrow mb-3">Join the Edit</p>
          <h2 className="font-display text-4xl font-light text-plum-900 mb-4">
            The Miss Modysty Edit,<br />
            <span className="italic">straight to your inbox</span>
          </h2>
          <p className="font-body text-plum-600 text-sm mb-8">
            Weekly curations, styling tips, new brand arrivals, and exclusive discount codes.
          </p>
          <form className="flex gap-0" onSubmit={e => { e.preventDefault(); window.gtag?.('event', 'newsletter_signup') }}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 font-body text-sm text-plum-900 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
            <button type="submit" className="btn-gold whitespace-nowrap text-sm">
              Subscribe
            </button>
          </form>
          <p className="font-body text-plum-400 text-xs mt-3">No spam. Unsubscribe any time. GDPR compliant.</p>
        </div>
      </section>
    </div>
  )
}
