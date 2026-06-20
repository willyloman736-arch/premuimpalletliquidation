'use client';

import { useState, useEffect } from 'react';
import {
  Package,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
import type { Palette } from '@/types/palette';
import { categories } from '@/data/palettes';
import PaletteCard from '@/components/palettes/PaletteCard';
import s from './CatalogView.module.css';

const PALETTES_PER_PAGE = 6;

const sortOptions = [
  { value: 'featured', label: 'Mis en avant' },
  { value: 'price-low', label: 'Prix croissant' },
  { value: 'price-high', label: 'Prix décroissant' },
  { value: 'profit', label: 'Profit estimé' },
  { value: 'quantity', label: 'Quantité' },
] as const;

export default function CatalogView({ palettes }: { palettes: Palette[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [filterBy, setFilterBy] = useState<string>('Tous');

  // Filtrage et tri des palettes
  const filteredPalettes = palettes.filter((palette) => {
    const matchesSearch =
      palette.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      palette.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'Tous' || palette.category === filterBy;
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

  // Pagination
  const indexOfLastPalette = currentPage * PALETTES_PER_PAGE;
  const indexOfFirstPalette = indexOfLastPalette - PALETTES_PER_PAGE;
  const currentPalettes = sortedPalettes.slice(indexOfFirstPalette, indexOfLastPalette);
  const totalPages = Math.ceil(sortedPalettes.length / PALETTES_PER_PAGE);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, filterBy]);

  return (
    <div className={s['palettes-page']}>
      {/* Header Section */}
      <section className={s['page-header']}>
        <div aria-hidden="true">
          <div />
        </div>
        <div className="container">
          <div className={s['header-content']}>
            <h1>Nos Palettes</h1>
            <p>Découvrez notre collection complète de palettes de liquidation premium</p>
            <div className={s['header-stats']}>
              <div className={s['header-stat']}>
                <span className={s['stat-number']}>{palettes.length}</span>
                <span className={s['stat-label']}>Palettes disponibles</span>
              </div>
              <div className={s['header-stat']}>
                <span className={s['stat-number']}>48h</span>
                <span className={s['stat-label']}>Livraison rapide</span>
              </div>
              <div className={s['header-stat']}>
                <span className={s['stat-number']}>300%</span>
                <span className={s['stat-label']}>Profit moyen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search Section */}
      <section className={`${s['filters-section']} ${s.visible}`}>
        <div className="container">
          <div className={s['filters-container']}>
            <div className={s['search-container']}>
              <div className={s['search-box']}>
                <Search size={20} aria-hidden="true" />
                <label htmlFor="catalog-search" className="sr-only">
                  Rechercher une palette
                </label>
                <input
                  id="catalog-search"
                  type="text"
                  placeholder="Rechercher une palette..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className={s['filters-controls']}>
              <label htmlFor="catalog-category" className="sr-only">
                Filtrer par catégorie
              </label>
              <select
                id="catalog-category"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className={s['filter-select']}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'Tous' ? 'Toutes les catégories' : category}
                  </option>
                ))}
              </select>

              <label htmlFor="catalog-sort" className="sr-only">
                Trier les palettes
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
                  aria-label="Affichage en grille"
                  aria-pressed={viewMode === 'grid'}
                >
                  <Grid size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={`${s['view-btn']} ${viewMode === 'list' ? s.active : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="Affichage en liste"
                  aria-pressed={viewMode === 'list'}
                >
                  <List size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className={s['results-info']}>
            <p>
              {filteredPalettes.length} palette{filteredPalettes.length > 1 ? 's' : ''} trouvée
              {filteredPalettes.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>

      {/* Palettes Section */}
      <section className={`${s['palettes-section']} ${s.visible}`}>
        <div className="container">
          {currentPalettes.length === 0 ? (
            <div className={s['no-results']}>
              <Package size={64} aria-hidden="true" />
              <h3>Aucune palette trouvée</h3>
              <p>Essayez de modifier vos critères de recherche</p>
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

      {/* Pagination Section */}
      {totalPages > 1 && (
        <section className={s['pagination-section']}>
          <div className="container">
            <nav className={s.pagination} aria-label="Pagination des palettes">
              <button
                type="button"
                className={`${s['pagination-btn']} ${currentPage === 1 ? s.disabled : ''}`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={18} aria-hidden="true" />
                Précédent
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
                Suivant
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </nav>

            <div className={s['pagination-info']}>
              <p>
                Page {currentPage} sur {totalPages}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
