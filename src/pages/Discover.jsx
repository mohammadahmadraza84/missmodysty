import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products, categories, occasions, brands } from '../data/products'

export default function Discover() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedOccasion, setSelectedOccasion] = useState(null)
  const [selectedBrand,    setSelectedBrand]    = useState(null)
  const [maxPrice,         setMaxPrice]         = useState(200)
  const [showFilters,      setShowFilters]      = useState(false)

  const filtered = products.filter(p => {
    if (selectedCategory && p.category !== selectedCategory) return false
    if (selectedOccasion && !p.occasion.includes(selectedOccasion)) return false
    if (selectedBrand    && p.brand    !== selectedBrand)    return false
    if (p.price > maxPrice) return false
    return true
  })

  const clearAll = () => {
    setSelectedCategory(null)
    setSelectedOccasion(null)
    setSelectedBrand(null)
    setMaxPrice(200)
  }

  const hasFilters = selectedCategory || selectedOccasion || selectedBrand || maxPrice < 200

  return (
    <div className="pt-20">
      {/* Page Header */}
      <div className="bg-plum-900 bg-hero-pattern py-14 text-center">
        <p className="section-eyebrow text-gold-400 mb-3">Curated For You</p>
        <h1 className="font-display text-5xl font-light text-white">Discover</h1>
        <p className="font-body text-white/60 text-sm mt-3 max-w-md mx-auto">
          Browse hundreds of modest fashion pieces from the UK's best brands.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">

          {/* Filter Sidebar — Desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {hasFilters && (
                <button onClick={clearAll} className="flex items-center gap-1 font-body text-xs text-gold-500 hover:text-gold-600">
                  <X size={12} /> Clear all filters
                </button>
              )}

              {/* Category */}
              <FilterGroup title="Category" items={categories}
                selected={selectedCategory} onSelect={setSelectedCategory} />

              {/* Occasion */}
              <FilterGroup title="Occasion" items={occasions.map(o => o.label)}
                selected={selectedOccasion} onSelect={setSelectedOccasion} />

              {/* Brand */}
              <FilterGroup title="Brand" items={brands}
                selected={selectedBrand} onSelect={setSelectedBrand} />

              {/* Price */}
              <div>
                <h3 className="font-body text-xs tracking-widest uppercase text-plum-500 mb-3">Max Price</h3>
                <input
                  type="range" min={20} max={300} step={10}
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
                <div className="flex justify-between font-body text-xs text-plum-500 mt-1">
                  <span>£20</span>
                  <span className="text-gold-500 font-medium">£{maxPrice}</span>
                  <span>£300</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-grow">
            {/* Mobile filter toggle + result count */}
            <div className="flex items-center justify-between mb-6">
              <p className="font-body text-sm text-plum-500">
                <span className="font-medium text-plum-900">{filtered.length}</span> pieces found
              </p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 font-body text-sm text-plum-700 border border-blush px-3 py-2"
              >
                <SlidersHorizontal size={14} /> Filters
              </button>
            </div>

            {/* Mobile filter panel */}
            {showFilters && (
              <div className="lg:hidden bg-blush/40 p-4 mb-6 space-y-6">
                <FilterGroup title="Category" items={categories}
                  selected={selectedCategory} onSelect={v => { setSelectedCategory(v); setShowFilters(false) }} />
                <FilterGroup title="Occasion" items={occasions.map(o => o.label)}
                  selected={selectedOccasion} onSelect={v => { setSelectedOccasion(v); setShowFilters(false) }} />
                <FilterGroup title="Brand" items={brands}
                  selected={selectedBrand} onSelect={v => { setSelectedBrand(v); setShowFilters(false) }} />
              </div>
            )}

            {/* Product grid */}
            {filtered.length > 0
              ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              )
              : (
                <div className="text-center py-20">
                  <p className="font-display text-3xl text-plum-300 font-light italic mb-3">No results</p>
                  <p className="font-body text-plum-400 text-sm mb-4">Try adjusting your filters</p>
                  <button onClick={clearAll} className="btn-outline text-sm">Clear filters</button>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterGroup({ title, items, selected, onSelect }) {
  return (
    <div>
      <h3 className="font-body text-xs tracking-widest uppercase text-plum-500 mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item}>
            <button
              onClick={() => onSelect(selected === item ? null : item)}
              className={`font-body text-sm text-left w-full transition-colors ${
                selected === item
                  ? 'text-gold-500 font-medium'
                  : 'text-plum-700 hover:text-plum-900'
              }`}
            >
              {selected === item ? '✓ ' : ''}{item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
