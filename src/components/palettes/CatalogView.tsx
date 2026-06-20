'use client';

import { useState, useEffect } from 'react';
import { Package, Grid, List, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import type { Palette } from '@/types/palette';
import { categories } from '@/data/palettes';
import PaletteCard from '@/components/palettes/PaletteCard';
import s from './CatalogView.module.css';

const PALETTES_PER_PAGE = 6;

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'profit', label: 'Estimated profit' },
  { value: 'quantity', label: 'Quantity' },
] as const;

export default function CatalogView({ palettes }: { palettes: Palette[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [filterBy, setFilterBy] = useState<string>('All');

  const filteredPalettes = palettes.filter((palette) => {
    const matchesSearch =
      palette.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      palette.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'All' || palette.category === filterBy;
    return matchesSearch && matchesFilter;
  });

  const sortedPalettes = [...filteredPalettes].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'profit':
        return parseInt(b.estimatedProfit) - parseInt(a.estimatedProfit);
      case 'quantity':
        return b.quantity - a.quantity;
      default:
        return 0;
    }
  });

  const indexOfLastPalette = currentPage * PALETTES_PER_PAGE;
  const indexOfFirstPalette = indexOfLastPalette - PALETTES_PER_PAGE;
  const currentPalettes = sortedPalettes.slice(indexOfFirstPalette, indexOfLastPalette);
  const totalPages = Math.ceil(sortedPalettes.length / PALETTES_PER_PAGE);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, filterBy]);

  return (
    <div className={s['palettes-page']}>
      <section className={s['page-header']}>
        <div className="container">
          <div className={s['header-content']}>
            <span className="eyebrow eyebrow-invert">Browse the lineup</span>
            <h1>Our Pallets</h1>
            <p>Browse our full lineup of premium liquidation pallets.</p>
            <div className={s['header-stats']}>
              <div className={s['header-stat']}>
                <span className={s['stat-number']}>{palettes.length}</span>
                <span className={s['stat-label']}>Pallets available</span>
              </div>
              <div className={s['header-stat']}>
                <span className={s['stat-number']}>48H</span>
                <span className={s['stat-label']}>Fast shipping</span>
              </div>
              <div className={s['header-stat']}>
                <span className={s['stat-number']}>300%</span>
                <span className={s['stat-label']}>Avg. profit</span>
              </div>
            </div>
          </div>
        </div>
        <div className={s['header-hazard']} aria-hidden="true" />
      </section>

      <section className={s['filters-section']}>
        <div className="container">
          <div className={s['filters-container']}>
            <div className={s['search-container']}>
              <div className={s['search-box']}>
                <Search size={20} aria-hidden="true" />
                <label htmlFor="catalog-search" className="sr-only">
                  Search pallets
                </label>
                <input
                  id="catalog-search"
                  type="text"
                  placeholder="Search pallets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className={s['filters-controls']}>
              <label htmlFor="catalog-category" className="sr-only">
                Filter by category
              </label>
              <select
                id="catalog-category"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className={s['filter-select']}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'All' ? 'All categories' : category}
                  </option>
                ))}
              </select>

              <label htmlFor="catalog-sort" className="sr-only">
                Sort pallets
              </label>
              <select
                id="catalog-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={s['filter-select']}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className={s['view-toggle']}>
                <button
                  type="button"
                  className={`${s['view-btn']} ${viewMode === 'grid' ? s.active : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  aria-pressed={viewMode === 'grid'}
                >
                  <Grid size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={`${s['view-btn']} ${viewMode === 'list' ? s.active : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                  aria-pressed={viewMode === 'list'}
                >
                  <List size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className={s['results-info']}>
            <p>
              {filteredPalettes.length} pallet{filteredPalettes.length === 1 ? '' : 's'} found
            </p>
          </div>
        </div>
      </section>

      <section className={s['palettes-section']}>
        <div className="container">
          {currentPalettes.length === 0 ? (
            <div className={s['no-results']}>
              <Package size={64} aria-hidden="true" />
              <h3>No pallets found</h3>
              <p>Try adjusting your search.</p>
            </div>
          ) : (
            <div className={`${s['palettes-grid']} ${s[viewMode]}`}>
              {currentPalettes.map((p, i) => (
                <PaletteCard key={p.id} palette={p} showRating layout={viewMode} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {totalPages > 1 && (
        <section className={s['pagination-section']}>
          <div className="container">
            <nav className={s.pagination} aria-label="Pallet pagination">
              <button
                type="button"
                className={`${s['pagination-btn']} ${currentPage === 1 ? s.disabled : ''}`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={18} aria-hidden="true" />
                Previous
              </button>

              <div className={s['pagination-numbers']}>
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                  ) {
                    return (
                      <button
                        type="button"
                        key={pageNumber}
                        className={`${s['pagination-number']} ${currentPage === pageNumber ? s.active : ''}`}
                        onClick={() => paginate(pageNumber)}
                        aria-label={`Page ${pageNumber}`}
                        aria-current={currentPage === pageNumber ? 'page' : undefined}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (pageNumber === currentPage - 3 || pageNumber === currentPage + 3) {
                    return (
                      <span key={pageNumber} className={s['pagination-dots']} aria-hidden="true">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                type="button"
                className={`${s['pagination-btn']} ${currentPage === totalPages ? s.disabled : ''}`}
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </nav>

            <div className={s['pagination-info']}>
              <p>
                Page {currentPage} of {totalPages}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
