'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutGrid } from 'lucide-react'
import { products, brands, categories, genders, sizes } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { useLanguageStore, t as translate } from '@/lib/language-store'

type SortOption = 'newest' | 'price-low' | 'price-high' | 'popular' | 'rating'

const FilterSection = ({
  title,
  children,
  isRTL,
}: {
  title: string
  children: React.ReactNode
  isRTL: boolean
}) => {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between w-full py-2 text-start ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        <span className="font-semibold text-sm">{title}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ShopPage() {
  const searchParams = useSearchParams()
  const urlFilter = searchParams.get('filter')
  const { language } = useLanguageStore()
  const isRTL = language === 'ar'
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedGenders, setSelectedGenders] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000])
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [gridCols, setGridCols] = useState<3 | 4>(4)

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (urlFilter === 'new') {
      result = result.filter((p) => p.isNew)
    } else if (urlFilter === 'sale') {
      result = result.filter((p) => p.salePrice)
    } else if (urlFilter === 'bestseller') {
      result = result.filter((p) => p.tags.includes('trending') || p.reviewCount >= 100)
    }

    // Filter by brand
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand))
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category))
    }

    // Filter by gender
    if (selectedGenders.length > 0) {
      result = result.filter(p => selectedGenders.includes(p.gender))
    }

    // Filter by size availability
    if (selectedSizes.length > 0) {
      result = result.filter(p =>
        p.sizes.some(s => selectedSizes.includes(s.size) && s.available)
      )
    }

    // Filter by price
    result = result.filter(p => {
      const price = p.salePrice || p.price
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
        break
      case 'price-high':
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
        break
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    }

    return result
  }, [urlFilter, selectedBrands, selectedCategories, selectedGenders, selectedSizes, priceRange, sortBy])

  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(v => v !== value))
    } else {
      setSelected([...selected, value])
    }
  }

  const clearAllFilters = () => {
    setSelectedBrands([])
    setSelectedCategories([])
    setSelectedGenders([])
    setSelectedSizes([])
    setPriceRange([0, 15000])
  }

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    selectedGenders.length > 0 ||
    selectedSizes.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 15000

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-display tracking-wider">
            {translate(language, 'shop.title')}
          </h1>
          <p className="text-muted-foreground mt-2">
            {filteredProducts.length} {translate(language, 'shop.products-count')}
          </p>
        </div>

        {/* Controls */}
        <div className={`flex items-center justify-between mb-8 pb-4 border-b border-border ${isRTL ? 'flex-row-reverse' : ''}`}>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors md:hidden ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {translate(language, 'shop.filters')}
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-accent rounded-full" />
            )}
          </button>

          <div className={`hidden md:flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-accent hover:underline"
              >
                {translate(language, 'shop.clear-all')}
              </button>
            )}
          </div>

          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 rounded ${gridCols === 3 ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-2 rounded ${gridCols === 4 ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="newest">{translate(language, 'shop.sort.newest')}</option>
              <option value="popular">{translate(language, 'shop.sort.popular')}</option>
              <option value="rating">{translate(language, 'shop.sort.rating')}</option>
              <option value="price-low">{translate(language, 'shop.sort.price-low')}</option>
              <option value="price-high">{translate(language, 'shop.sort.price-high')}</option>
            </select>
          </div>
        </div>

        <div className={`flex gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Desktop Sidebar Filters */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              <FilterSection title={translate(language, 'shop.brand')} isRTL={isRTL}>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                        className="w-4 h-4 rounded border-border bg-input accent-accent"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title={translate(language, 'shop.category')} isRTL={isRTL}>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                        className="w-4 h-4 rounded border-border bg-input accent-accent"
                      />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title={translate(language, 'shop.gender')} isRTL={isRTL}>
                <div className="space-y-2">
                  {genders.map(gender => (
                    <label key={gender} className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <input
                        type="checkbox"
                        checked={selectedGenders.includes(gender)}
                        onChange={() => toggleFilter(gender, selectedGenders, setSelectedGenders)}
                        className="w-4 h-4 rounded border-border bg-input accent-accent"
                      />
                      <span className="text-sm">{gender}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title={translate(language, 'shop.size')} isRTL={isRTL}>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
                      className={`px-3 py-1 text-xs rounded border transition-colors ${selectedSizes.includes(size)
                          ? 'bg-accent text-accent-foreground border-accent'
                          : 'border-border hover:border-accent'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title={translate(language, 'shop.price')} isRTL={isRTL}>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    {isRTL ? (
                      <>
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="w-20 px-3 py-2 bg-input border border-border rounded text-sm"
                          min={0}
                          max={priceRange[1]}
                        />
                        <span className="text-muted-foreground">{translate(language, 'shop.to')}</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-20 px-3 py-2 bg-input border border-border rounded text-sm"
                          min={priceRange[0]}
                          max={15000}
                        />
                      </>
                    ) : (
                      <>
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="w-20 px-3 py-2 bg-input border border-border rounded text-sm"
                          min={0}
                          max={priceRange[1]}
                        />
                        <span className="text-muted-foreground">{translate(language, 'shop.to')}</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-20 px-3 py-2 bg-input border border-border rounded text-sm"
                          min={priceRange[0]}
                          max={15000}
                        />
                      </>
                    )}
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={15000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-accent"
                    style={{ direction: 'ltr' }}
                    dir="ltr"
                  />
                </div>
              </FilterSection>
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {filtersOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setFiltersOpen(false)}
                  className="fixed inset-0 bg-black/60 z-40 md:hidden"
                />
                <motion.div
                  initial={{ x: isRTL ? '100%' : '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: isRTL ? '100%' : '-100%' }}
                  transition={{ type: 'tween' }}
                  className={`fixed ${isRTL ? 'right-0' : 'left-0'} top-0 bottom-0 w-80 bg-background z-50 overflow-y-auto md:hidden`}
                >
                  <div className="p-6 space-y-4">
                    <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <h2 className="text-lg font-semibold">{translate(language, 'shop.filters')}</h2>
                      <button onClick={() => setFiltersOpen(false)}>
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {hasActiveFilters && (
                      <button
                        onClick={clearAllFilters}
                        className="text-sm text-accent hover:underline"
                      >
                        {translate(language, 'shop.clear-all')}
                      </button>
                    )}

                    <FilterSection title={translate(language, 'shop.brand')} isRTL={isRTL}>
                      <div className="space-y-2">
                        {brands.map(brand => (
                          <label key={brand} className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <input
                              type="checkbox"
                              checked={selectedBrands.includes(brand)}
                              onChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                              className="w-4 h-4 rounded border-border bg-input accent-accent"
                            />
                            <span className="text-sm">{brand}</span>
                          </label>
                        ))}
                      </div>
                    </FilterSection>

                    <FilterSection title={translate(language, 'shop.category')} isRTL={isRTL}>
                      <div className="space-y-2">
                        {categories.map(cat => (
                          <label key={cat} className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(cat)}
                              onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                              className="w-4 h-4 rounded border-border bg-input accent-accent"
                            />
                            <span className="text-sm">{cat}</span>
                          </label>
                        ))}
                      </div>
                    </FilterSection>

                    <FilterSection title={translate(language, 'shop.size')} isRTL={isRTL}>
                      <div className="flex flex-wrap gap-2">
                        {sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
                            className={`px-3 py-1 text-xs rounded border transition-colors ${selectedSizes.includes(size)
                                ? 'bg-accent text-accent-foreground border-accent'
                                : 'border-border hover:border-accent'
                              }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </FilterSection>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">{translate(language, 'shop.no-products')}</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 text-accent hover:underline"
                >
                  {translate(language, 'shop.clear-all')}
                </button>
              </div>
            ) : (
              <div className={`grid grid-cols-2 ${gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6`}>
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
