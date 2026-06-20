'use client';

import {
  useEffect,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import { Plus, Edit2, Trash2, Save, X, Upload, Minus, Menu } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { cloudinaryConfig } from '@/lib/config';
import { seedPalettes, conditions, categories } from '@/data/palettes';
import type { Palette } from '@/types/palette';
import s from './PaletteAdmin.module.css';

/** Local image entry: either a freshly-picked File or an existing remote URL. */
interface ImageEntry {
  name: string;
  /** Present for images already persisted (Cloudinary/Supabase URLs). */
  url?: string;
  /** The picked File for new uploads (absent for existing images). */
  file?: File;
  /** True when the image already exists remotely. */
  isExisting?: boolean;
}

interface FormState {
  title: string;
  description: string;
  price: string;
  original_price: string;
  condition: string;
  quantity: string;
  weight: string;
  dimensions: string;
  available: boolean;
  featured: boolean;
  category: string;
  origin: string;
  rating: number;
}

const EMPTY_FORM: FormState = {
  title: '',
  description: '',
  price: '',
  original_price: '',
  condition: 'Grade A',
  quantity: '',
  weight: '',
  dimensions: '',
  available: true,
  featured: false,
  category: 'Électronique',
  origin: '',
  rating: 4.5,
};

export default function PaletteAdmin() {
  const { logout } = useAuth();

  // États pour gérer les palettes et l'interface
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [demoMode, setDemoMode] = useState(false);
  const [showDemoBanner, setShowDemoBanner] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM);
  const [contentInput, setContentInput] = useState('');
  const [contentList, setContentList] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<ImageEntry[]>([]);

  const CONDITIONS = conditions;
  const CATEGORIES = categories;

  // Charger les palettes au montage (remplace le top-level await d'origine)
  useEffect(() => {
    let active = true;

    const load = async () => {
      if (isSupabaseConfigured()) {
        try {
          const supabase = getSupabaseClient();
          const { data, error } = await supabase!.from('palettes').select('*');
          if (!active) return;
          if (!error && data) {
            setPalettes(data as Palette[]);
            return;
          }
        } catch {
          // tombe en mode démonstration ci-dessous
        }
      }
      if (!active) return;
      // Mode démonstration : pas de Supabase configuré (ou erreur de chargement)
      setPalettes(seedPalettes);
      setDemoMode(true);
      setShowDemoBanner(true);
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  // Suivre la largeur de fenêtre (remplace les accès directs à window.innerWidth
  // qui cassaient l'hydratation côté serveur)
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Calculer le profit estimé
  const calculateProfit = (price: number | string, originalPrice: number | string): string => {
    const p = typeof price === 'string' ? parseFloat(price) : price;
    const o = typeof originalPrice === 'string' ? parseFloat(originalPrice) : originalPrice;
    if (!p || !o) return '0%';
    const profit = ((p - o) / o) * 100;
    return `${profit.toFixed(1)}%`;
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setContentList([]);
    setImageFiles([]);
    setContentInput('');
    setEditingId(null);
    setShowForm(false);
  };

  // Ajouter un élément au contenu
  const addContentItem = () => {
    if (contentInput.trim()) {
      setContentList([...contentList, contentInput.trim()]);
      setContentInput('');
    }
  };

  // Supprimer un élément du contenu
  const removeContentItem = (index: number) => {
    setContentList(contentList.filter((_, i) => i !== index));
  };

  // Gérer l'upload d'images
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        setImageFiles((prev) => [...prev, { name: file.name, file }]);
      }
    });
  };

  // Supprimer une image
  const removeImage = async (index: number) => {
    const imageToRemove = imageFiles[index];

    // Si c'est une image existante (déjà sur Cloudinary), la supprimer
    if (imageToRemove?.isExisting && imageToRemove.url) {
      await deleteImageFromCloudinary(imageToRemove.url);
    }

    // Supprimer de la liste locale
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  // Ouvrir le formulaire pour édition
  const editPalette = (palette: Palette) => {
    setFormData({
      title: palette.title,
      description: palette.description,
      price: palette.price.toString(),
      original_price: palette.original_price.toString(),
      condition: palette.condition,
      quantity: palette.quantity.toString(),
      weight: palette.weight ?? '',
      dimensions: palette.dimensions ?? '',
      available: palette.available,
      featured: palette.featured,
      category: palette.category,
      origin: palette.origin ?? '',
      rating: palette.rating,
    });
    setContentList(palette.content ?? []);

    // Convertir les URLs en objets "fake file" pour l'affichage
    const existingImages: ImageEntry[] = (palette.images ?? []).map((url) => ({
      name: url.split('/').pop() ?? url, // Nom du fichier depuis l'URL
      url, // URL complète
      isExisting: true, // Flag pour différencier des nouveaux uploads
    }));
    setImageFiles(existingImages);

    setEditingId(palette.id);
    setShowForm(true);
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    // Cloudinary non configuré : on garde un aperçu local (object URL).
    if (!cloudinaryConfig.enabled) {
      return URL.createObjectURL(file);
    }

    try {
      const body = new FormData();
      body.append('file', file);
      body.append('upload_preset', cloudinaryConfig.uploadPreset);

      const response = await fetch(cloudinaryConfig.url, {
        method: 'POST',
        body,
      });

      const data = await response.json();
      return (data?.secure_url as string) ?? URL.createObjectURL(file);
    } catch {
      // En cas d'échec réseau, on retombe sur un aperçu local — ne jamais throw.
      return URL.createObjectURL(file);
    }
  };

  // Sauvegarder la palette
  const savePalette = async () => {
    setSaving(true);
    try {
      // Séparer les images existantes des nouvelles
      const newImages = imageFiles.filter((entry) => !entry.isExisting && entry.file);
      const existingImageUrls = imageFiles
        .filter((entry) => entry.isExisting && entry.url)
        .map((entry) => entry.url as string);

      // Upload seulement les nouvelles images
      const newImageUrls =
        newImages.length > 0
          ? await Promise.all(newImages.map((entry) => uploadImageToCloudinary(entry.file as File)))
          : [];

      // Combiner toutes les URLs
      const allImageUrls = [...existingImageUrls, ...newImageUrls];

      const paletteData = {
        title: formData.title,
        description: formData.description,
        condition: formData.condition,
        weight: formData.weight,
        dimensions: formData.dimensions,
        available: formData.available,
        featured: formData.featured,
        category: formData.category,
        origin: formData.origin,
        rating: formData.rating,
        price: parseFloat(formData.price),
        original_price: parseFloat(formData.original_price),
        quantity: parseInt(formData.quantity, 10),
        content: contentList,
        images: allImageUrls,
        estimated_profit: calculateProfit(formData.price, formData.original_price),
      };

      // Persistance Supabase si configuré, sinon état local uniquement.
      if (!demoMode && isSupabaseConfigured()) {
        const supabase = getSupabaseClient();

        if (editingId) {
          // MODIFICATION
          const { data, error } = await supabase!
            .from('palettes')
            .update(paletteData)
            .eq('id', editingId)
            .select();

          if (error || !data) return;

          // Mise à jour du state local SEULEMENT si succès
          setPalettes(palettes.map((p) => (p.id === editingId ? (data[0] as Palette) : p)));
        } else {
          // CRÉATION
          const { data, error } = await supabase!.from('palettes').insert([paletteData]).select();

          if (error || !data) return;

          // Mise à jour du state local SEULEMENT si succès
          setPalettes([...palettes, data[0] as Palette]);
        }
      } else {
        // Mode démonstration : on ne met à jour que l'état React local.
        const localPalette = {
          ...paletteData,
          estimatedProfit: paletteData.estimated_profit,
        };
        if (editingId) {
          setPalettes(
            palettes.map((p) =>
              p.id === editingId ? ({ ...p, ...localPalette, id: editingId } as Palette) : p,
            ),
          );
        } else {
          const nextId = palettes.length ? Math.max(...palettes.map((p) => p.id)) + 1 : 1;
          setPalettes([...palettes, { ...localPalette, id: nextId } as Palette]);
        }
      }

      resetForm();
    } finally {
      setSaving(false);
    }
  };

  const deleteImageFromCloudinary = async (_imageUrl: string) => {
    // Pour l'instant, on ne supprime que de la BD
    // TODO: Implémenter la suppression côté serveur
  };

  // Supprimer une palette
  const deletePalette = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette palette ?')) {
      // Trouver la palette à supprimer
      const paletteToDelete = palettes.find((p) => p.id === id);

      // Supprimer les images de Cloudinary
      if (paletteToDelete && paletteToDelete.images) {
        await Promise.all(paletteToDelete.images.map((imageUrl) => deleteImageFromCloudinary(imageUrl)));
      }

      if (!demoMode && isSupabaseConfigured()) {
        // Supprimer de Supabase
        const supabase = getSupabaseClient();
        const { error } = await supabase!.from('palettes').delete().eq('id', id);

        if (!error) {
          setPalettes(palettes.filter((p) => p.id !== id));
        }
      } else {
        // Mode démonstration : suppression locale uniquement.
        setPalettes(palettes.filter((p) => p.id !== id));
      }
    }
  };

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: '2px solid #fee2e2',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const buttonStyle: CSSProperties = {
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  };

  const labelStyle: CSSProperties = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 500,
    color: '#374151',
  };

  // Nettoyer les URLs temporaires lors du démontage
  useEffect(() => {
    return () => {
      imageFiles.forEach((entry) => {
        if (!entry.isExisting && entry.url?.startsWith('blob:')) {
          URL.revokeObjectURL(entry.url);
        }
      });
    };
  }, [imageFiles]);

  // Fermer le menu mobile au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showMobileMenu && !target.closest('[data-mobile-menu]')) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMobileMenu]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#fef2f2',
        padding: '20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          marginBottom: '30px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #fecaca',
            position: 'relative',
          }}
        >
          <h1
            style={{
              margin: 0,
              color: '#dc2626',
              fontSize: isMobile ? '20px' : '28px',
              fontWeight: 700,
            }}
          >
            {isMobile ? 'Admin Palettes' : 'Administration des Palettes'}
          </h1>

          {/* Version desktop */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                type="button"
                style={{
                  ...buttonStyle,
                  backgroundColor: '#dc2626',
                  color: 'white',
                }}
                onClick={() => setShowForm(true)}
              >
                <Plus size={16} aria-hidden="true" />
                Nouvelle Palette
              </button>
              <button
                type="button"
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: '2px solid #dc2626',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  backgroundColor: 'transparent',
                  color: '#dc2626',
                }}
                onClick={logout}
              >
                Déconnexion
              </button>
            </div>
          )}

          {/* Bouton menu mobile */}
          {isMobile && (
            <button
              type="button"
              data-mobile-menu
              aria-label="Ouvrir le menu"
              aria-expanded={showMobileMenu}
              style={{
                ...buttonStyle,
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '8px',
              }}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          )}

          {/* Menu slide mobile */}
          {showMobileMenu && isMobile && (
            <div
              data-mobile-menu
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '15px',
                zIndex: 1000,
                minWidth: '200px',
                marginTop: '5px',
              }}
            >
              <button
                type="button"
                style={{
                  ...buttonStyle,
                  backgroundColor: '#dc2626',
                  color: 'white',
                  width: '100%',
                  marginBottom: '10px',
                  justifyContent: 'center',
                }}
                onClick={() => {
                  setShowForm(true);
                  setShowMobileMenu(false);
                }}
              >
                <Plus size={16} aria-hidden="true" />
                Nouvelle Palette
              </button>
              <button
                type="button"
                style={{
                  ...buttonStyle,
                  border: '2px solid #dc2626',
                  backgroundColor: 'transparent',
                  color: '#dc2626',
                  width: '100%',
                  justifyContent: 'center',
                }}
                onClick={() => {
                  logout();
                  setShowMobileMenu(false);
                }}
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bannière mode démonstration */}
      {demoMode && showDemoBanner && (
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto 20px auto',
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid #fecaca',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '15px',
            color: '#dc2626',
            fontSize: '14px',
          }}
        >
          <span>
            Mode démonstration — connectez Supabase (NEXT_PUBLIC_SUPABASE_URL /
            NEXT_PUBLIC_SUPABASE_ANON_KEY) pour activer la sauvegarde.
          </span>
          <button
            type="button"
            aria-label="Fermer la bannière"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#dc2626',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => setShowDemoBanner(false)}
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Barre de recherche */}
      {!showForm && (
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto 20px auto',
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid #fecaca',
          }}
        >
          <label htmlFor="palette-search" className="sr-only">
            Rechercher une palette
          </label>
          <input
            id="palette-search"
            className={s.field}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '2px solid #fee2e2',
              borderRadius: '6px',
              fontSize: '16px',
              outline: 'none',
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher une palette par nom..."
          />
        </div>
      )}

      {/* Liste des palettes */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {!showForm && (
          <div
            style={{
              display: 'grid',
              gap: '20px',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            }}
          >
            {palettes
              .filter((palette) => palette.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((palette) => (
                <div
                  key={palette.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #fecaca',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '15px',
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          margin: '0 0 8px 0',
                          color: '#dc2626',
                          fontSize: '18px',
                          fontWeight: 600,
                        }}
                      >
                        {palette.title}
                      </h3>
                      <div
                        style={{
                          display: 'flex',
                          gap: '10px',
                          marginBottom: '8px',
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: '#fef2f2',
                            color: '#dc2626',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 500,
                          }}
                        >
                          {palette.condition}
                        </span>
                        <span
                          style={{
                            backgroundColor: '#fef2f2',
                            color: '#dc2626',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 500,
                          }}
                        >
                          {palette.category}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        aria-label={`Modifier ${palette.title}`}
                        style={{
                          ...buttonStyle,
                          backgroundColor: '#fef2f2',
                          color: '#dc2626',
                          padding: '6px',
                        }}
                        onClick={() => editPalette(palette)}
                      >
                        <Edit2 size={14} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Supprimer ${palette.title}`}
                        style={{
                          ...buttonStyle,
                          backgroundColor: '#fef2f2',
                          color: '#dc2626',
                          padding: '6px',
                        }}
                        onClick={() => deletePalette(palette.id)}
                      >
                        <Trash2 size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <p
                    style={{
                      color: '#6b7280',
                      fontSize: '14px',
                      marginBottom: '15px',
                      lineHeight: 1.5,
                    }}
                  >
                    {palette.description}
                  </p>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '10px',
                      fontSize: '13px',
                      color: '#4b5563',
                    }}
                  >
                    <div>
                      <strong>Prix:</strong> {palette.price}€
                    </div>
                    <div>
                      <strong>Prix original:</strong> {palette.original_price}€
                    </div>
                    <div>
                      <strong>Quantité:</strong> {palette.quantity}
                    </div>
                    <div>
                      <strong>Profit:</strong>{' '}
                      {calculateProfit(palette.price, palette.original_price)}
                    </div>
                  </div>

                  {palette.content && palette.content.length > 0 && (
                    <div style={{ marginTop: '15px' }}>
                      <strong style={{ fontSize: '13px', color: '#4b5563' }}>Contenu:</strong>
                      <div style={{ marginTop: '5px' }}>
                        {palette.content.slice(0, 3).map((item, index) => (
                          <span
                            key={index}
                            style={{
                              display: 'inline-block',
                              backgroundColor: '#fef2f2',
                              color: '#dc2626',
                              padding: '2px 6px',
                              borderRadius: '3px',
                              fontSize: '11px',
                              marginRight: '5px',
                              marginBottom: '3px',
                            }}
                          >
                            {item}
                          </span>
                        ))}
                        {palette.content.length > 3 && (
                          <span style={{ fontSize: '11px', color: '#6b7280' }}>
                            +{palette.content.length - 3} autres
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}

        {/* Formulaire */}
        {showForm && (
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '30px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #fecaca',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px',
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: '#dc2626',
                  fontSize: '24px',
                  fontWeight: 600,
                }}
              >
                {editingId ? 'Modifier la Palette' : 'Nouvelle Palette'}
              </h2>
              <button
                type="button"
                aria-label="Fermer le formulaire"
                style={{
                  ...buttonStyle,
                  backgroundColor: '#f3f4f6',
                  color: '#6b7280',
                  padding: '6px',
                }}
                onClick={resetForm}
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
              }}
            >
              {/* Colonne 1 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label htmlFor="palette-title" style={labelStyle}>
                    Titre *
                  </label>
                  <input
                    id="palette-title"
                    className={s.field}
                    style={inputStyle}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Nom de la palette"
                  />
                </div>

                <div>
                  <label htmlFor="palette-description" style={labelStyle}>
                    Description *
                  </label>
                  <textarea
                    id="palette-description"
                    className={s.field}
                    style={{
                      ...inputStyle,
                      minHeight: '80px',
                      resize: 'vertical',
                    }}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Description détaillée de la palette"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label htmlFor="palette-price" style={labelStyle}>
                      Prix de vente *
                    </label>
                    <input
                      id="palette-price"
                      className={s.field}
                      style={inputStyle}
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label htmlFor="palette-original-price" style={labelStyle}>
                      Prix original *
                    </label>
                    <input
                      id="palette-original-price"
                      className={s.field}
                      style={inputStyle}
                      type="number"
                      step="0.01"
                      value={formData.original_price}
                      onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {formData.price && formData.original_price && (
                  <div
                    style={{
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '6px',
                      padding: '10px',
                      fontSize: '14px',
                      color: '#dc2626',
                    }}
                  >
                    <strong>
                      Profit estimé: {calculateProfit(formData.price, formData.original_price)}
                    </strong>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label htmlFor="palette-condition" style={labelStyle}>
                      Condition *
                    </label>
                    <select
                      id="palette-condition"
                      className={s.field}
                      style={inputStyle}
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    >
                      {CONDITIONS.map((condition) => (
                        <option key={condition} value={condition}>
                          {condition}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="palette-category" style={labelStyle}>
                      Catégorie *
                    </label>
                    <select
                      id="palette-category"
                      className={s.field}
                      style={inputStyle}
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {CATEGORIES.filter((cat) => cat !== 'Tous').map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Colonne 2 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label htmlFor="palette-quantity" style={labelStyle}>
                    Quantité *
                  </label>
                  <input
                    id="palette-quantity"
                    className={s.field}
                    style={inputStyle}
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="0"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label htmlFor="palette-weight" style={labelStyle}>
                      Poids
                    </label>
                    <input
                      id="palette-weight"
                      className={s.field}
                      style={inputStyle}
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      placeholder="ex: 250g"
                    />
                  </div>
                  <div>
                    <label htmlFor="palette-dimensions" style={labelStyle}>
                      Dimensions
                    </label>
                    <input
                      id="palette-dimensions"
                      className={s.field}
                      style={inputStyle}
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                      placeholder="ex: 15x10x3cm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="palette-origin" style={labelStyle}>
                    Origine
                  </label>
                  <input
                    id="palette-origin"
                    className={s.field}
                    style={inputStyle}
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    placeholder="ex: Retours boutiques mode, Surplus boutiques/Fins de série Europe"
                  />
                </div>

                <div>
                  <label htmlFor="palette-rating" style={labelStyle}>
                    Note
                  </label>
                  <input
                    id="palette-rating"
                    className={s.field}
                    style={inputStyle}
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: parseFloat(e.target.value) })
                    }
                  />
                </div>

                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <label
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.available}
                      onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                      style={{ transform: 'scale(1.2)' }}
                    />
                    <span style={{ fontWeight: 500, color: '#374151' }}>Disponible</span>
                  </label>
                  <label
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      style={{ transform: 'scale(1.2)' }}
                    />
                    <span style={{ fontWeight: 500, color: '#374151' }}>En vedette</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Contenu */}
            <div style={{ marginTop: '25px' }}>
              <label
                htmlFor="palette-content"
                style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontWeight: 500,
                  color: '#374151',
                }}
              >
                Contenu de la palette
              </label>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input
                  id="palette-content"
                  className={s.field}
                  style={{ ...inputStyle, flex: 1 }}
                  value={contentInput}
                  onChange={(e) => setContentInput(e.target.value)}
                  placeholder="Ajouter un élément"
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                    e.key === 'Enter' && addContentItem()
                  }
                />
                <button
                  type="button"
                  style={{
                    ...buttonStyle,
                    backgroundColor: '#dc2626',
                    color: 'white',
                  }}
                  onClick={addContentItem}
                >
                  <Plus size={16} aria-hidden="true" />
                  Ajouter
                </button>
              </div>
              {contentList.length > 0 && (
                <div
                  style={{
                    border: '1px solid #fecaca',
                    borderRadius: '6px',
                    padding: '10px',
                    backgroundColor: '#fef2f2',
                  }}
                >
                  {contentList.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '5px 0',
                        borderBottom:
                          index < contentList.length - 1 ? '1px solid #fecaca' : 'none',
                      }}
                    >
                      <span style={{ fontSize: '14px', color: '#374151' }}>{item}</span>
                      <button
                        type="button"
                        aria-label={`Retirer ${item}`}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: '#dc2626',
                          cursor: 'pointer',
                          padding: '2px',
                        }}
                        onClick={() => removeContentItem(index)}
                      >
                        <Minus size={14} aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Images */}
            <div style={{ marginTop: '25px' }}>
              <label
                htmlFor="image-upload"
                style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontWeight: 500,
                  color: '#374151',
                }}
              >
                Images de la palette
              </label>
              <div
                style={{
                  border: '2px dashed #fecaca',
                  borderRadius: '8px',
                  padding: '20px',
                  textAlign: 'center',
                  backgroundColor: '#fef2f2',
                }}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  style={{
                    ...buttonStyle,
                    backgroundColor: '#dc2626',
                    color: 'white',
                    margin: '0 auto',
                    cursor: 'pointer',
                  }}
                >
                  <Upload size={16} aria-hidden="true" />
                  Choisir des images
                </label>
              </div>
              {imageFiles.length > 0 && (
                <div
                  style={{
                    marginTop: '15px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                    gap: '10px',
                  }}
                >
                  {imageFiles.map((entry, index) => (
                    <div
                      key={index}
                      style={{
                        position: 'relative',
                        backgroundColor: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '6px',
                        padding: '8px',
                        fontSize: '12px',
                        textAlign: 'center',
                      }}
                    >
                      {entry.isExisting || entry.url || entry.file ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={entry.url ?? (entry.file ? URL.createObjectURL(entry.file) : '')}
                          alt={entry.name}
                          style={{
                            width: '100%',
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            marginBottom: '5px',
                          }}
                        />
                      ) : (
                        <div>Chargement...</div>
                      )}
                      <div style={{ fontSize: '10px', color: '#6b7280', textAlign: 'center' }}>
                        {entry.name && entry.name.length > 15
                          ? entry.name.substring(0, 15) + '...'
                          : entry.name}
                      </div>
                      <button
                        type="button"
                        aria-label={`Retirer l'image ${entry.name}`}
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          backgroundColor: '#dc2626',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onClick={() => removeImage(index)}
                      >
                        <X size={12} aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Boutons d'action */}
            <div
              style={{
                display: 'flex',
                gap: '10px',
                marginTop: '30px',
                justifyContent: 'flex-end',
              }}
            >
              <button
                type="button"
                style={{
                  ...buttonStyle,
                  backgroundColor: '#f3f4f6',
                  color: '#6b7280',
                }}
                onClick={resetForm}
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={saving}
                style={{
                  ...buttonStyle,
                  backgroundColor: '#dc2626',
                  color: 'white',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  opacity: saving ? 0.7 : 1,
                }}
                onClick={savePalette}
              >
                <Save size={16} aria-hidden="true" />
                {editingId ? 'Mettre à jour' : 'Créer la palette'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
