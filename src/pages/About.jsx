import { Link } from 'react-router-dom'
import { Sparkles, Camera, Heart, ArrowRight } from 'lucide-react'

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="bg-plum-900 bg-hero-pattern py-20 text-center">
        <p className="section-eyebrow text-gold-400 mb-3">Our Story</p>
        <h1 className="font-display text-5xl md:text-6xl font-light text-white leading-tight">
          Dressed with Purpose.<br />
          <span className="italic text-gold-400">Styled with Grace.</span>
        </h1>
      </div>

      {/* Mission */}
      <section className="py-20 bg-ivory">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="section-eyebrow mb-4">Why We Exist</p>
          <h2 className="section-title mb-8">
            Modest fashion is a <span className="italic text-gold-500">$500 billion</span> global market — 
            yet finding the right piece still means scrolling through dozens of disconnected websites.
          </h2>
          <p className="font-body text-plum-600 leading-relaxed text-lg">
            Miss Modysty was built to change that. We are the UK's first AI-powered curated discovery 
            platform for modest fashion — bringing together the best brands, the most beautiful pieces, 
            and intelligent tools that understand the nuances of modest dressing. From nikah-ready looks 
            to workwear that doesn't compromise on coverage, we have curated it all in one beautifully 
            edited destination.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-blush">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">What We Stand For</p>
            <h2 className="section-title">Our Principles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart size={28} className="text-gold-500" />,
                title: 'Authenticity First',
                desc: 'We only feature brands that genuinely serve the modest fashion community — not brands that added a "modest" filter as an afterthought.',
              },
              {
                icon: <Sparkles size={28} className="text-gold-500" />,
                title: 'Intelligent Curation',
                desc: 'Our AI understands modest fashion requirements deeply — hijab-compatible necklines, coverage levels, occasion appropriateness, and more.',
              },
              {
                icon: <Camera size={28} className="text-gold-500" />,
                title: 'Privacy & Trust',
                desc: 'We designed our virtual try-on with your privacy in mind. Your photos are processed securely and never stored or shared.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white p-8">
                <div className="w-14 h-14 bg-blush flex items-center justify-center mb-5">
                  {icon}
                </div>
                <h3 className="font-display text-2xl text-plum-900 font-light mb-3">{title}</h3>
                <p className="font-body text-plum-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">Simple by Design</p>
            <h2 className="section-title">How Miss Modysty Works</h2>
          </div>

          <div className="space-y-0">
            {[
              {
                step: '01',
                title: 'Discover',
                desc: 'Browse hundreds of modest fashion pieces curated from the UK\'s best brands, filtered by occasion, style, price, and category.',
              },
              {
                step: '02',
                title: 'Style with AI',
                desc: 'Tell our AI stylist Mody about your occasion, budget, and preferences. She\'ll recommend specific pieces and complete outfits.',
              },
              {
                step: '03',
                title: 'Try Before You Buy',
                desc: 'Use our virtual try-on to see how any piece looks on you. Upload your photo or choose from our avatar options.',
              },
              {
                step: '04',
                title: 'Shop with Confidence',
                desc: 'Click through to buy directly from the brand. Every link takes you to a trusted retailer. We earn a small commission at no cost to you.',
              },
            ].map(({ step, title, desc }, i) => (
              <div key={step} className={`flex gap-8 items-start py-8 ${i < 3 ? 'border-b border-blush' : ''}`}>
                <span className="font-display text-5xl text-blush font-light flex-shrink-0 leading-none">{step}</span>
                <div>
                  <h3 className="font-display text-2xl text-plum-900 font-light mb-2">{title}</h3>
                  <p className="font-body text-plum-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate disclosure */}
      <section className="py-12 bg-plum-50 border-t border-blush">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="section-eyebrow mb-3">Transparency</p>
          <h2 className="font-display text-2xl text-plum-900 font-light mb-4">Affiliate Disclosure</h2>
          <p className="font-body text-plum-600 text-sm leading-relaxed">
            Miss Modysty is an affiliate marketing platform. This means that when you click on a product 
            link and make a purchase, we may earn a small commission from the retailer — at absolutely no 
            extra cost to you. This commission helps us keep Miss Modysty free and continue curating 
            beautiful modest fashion content. We only feature brands we genuinely believe in.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-plum-900 bg-hero-pattern text-center">
        <h2 className="font-display text-4xl text-white font-light mb-4">
          Ready to discover your <span className="italic text-gold-400">perfect look?</span>
        </h2>
        <div className="flex gap-4 justify-center mt-8">
          <Link to="/discover" className="btn-gold flex items-center gap-2 text-sm">
            Start Discovering <ArrowRight size={16} />
          </Link>
          <Link to="/ai-stylist" className="btn-outline border-white/30 text-white hover:bg-white hover:text-plum-900 flex items-center gap-2 text-sm">
            <Sparkles size={16} /> Meet Mody
          </Link>
        </div>
      </section>
    </div>
  )
}
