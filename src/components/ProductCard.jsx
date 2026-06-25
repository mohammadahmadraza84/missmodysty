import { ExternalLink, Heart } from 'lucide-react'
import { useState } from 'react'

export default function ProductCard({ product }) {
  const [wished, setWished] = useState(false)

  const gradients = [
    'from-plum-200 to-blush',
    'from-blush to-gold-300/40',
    'from-plum-100 to-mauve/20',
    'from-gold-300/30 to-blush',
    'from-plum-300/40 to-plum-100',
    'from-mauve/20 to-plum-50',
  ]
  const gradient = gradients[product.id % gradients.length]

  return (
    <div className="group card-hover bg-white flex flex-col">
      {/* Image area */}
      <div className={`relative bg-gradient-to-br ${gradient} aspect-[3/4] overflow-hidden`}>
        {product.image
          ? <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
              <span className="font-display text-5xl text-plum-300 font-light italic">MM</span>
              <span className="font-body text-xs text-plum-400 mt-2 tracking-widest uppercase">Coming Soon</span>
            </div>
          )
        }

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-plum-900 text-white font-body text-xs px-2 py-0.5 tracking-wide">New</span>
          )}
          {product.isSale && (
            <span className="bg-gold-500 text-white font-body text-xs px-2 py-0.5 tracking-wide">Sale</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setWished(!wished)}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label="Add to wishlist"
        >
          <Heart size={16} className={wished ? 'fill-red-400 text-red-400' : 'text-plum-600'} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="font-body text-xs text-gold-500 tracking-widest uppercase mb-1">{product.brand}</p>
        <h3 className="font-display text-lg font-light text-plum-900 leading-snug mb-2">{product.name}</h3>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-blush">
          <div>
            <span className="font-body font-medium text-plum-900">£{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="font-body text-sm text-plum-400 line-through ml-2">
                £{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <a
            href={product.affiliateUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-plum-900 hover:bg-plum-800 text-white font-body text-xs px-3 py-2 tracking-wide transition-colors"
          >
            Shop <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </div>
  )
}
