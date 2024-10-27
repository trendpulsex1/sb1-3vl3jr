import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'tr' | 'de';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  formatPrice: (amount: number) => string;
}

const translations: Translations = {
  table: {
    en: "Table",
    tr: "Masa",
    de: "Tisch"
  },
  selectTable: {
    en: "Select a Table",
    tr: "Masa Seçin",
    de: "Tisch auswählen"
  },
  tables: {
    en: "Tables",
    tr: "Masalar",
    de: "Tische"
  },
  addTable: {
    en: "Add Table",
    tr: "Masa Ekle",
    de: "Tisch hinzufügen"
  },
  editTable: {
    en: "Edit Table",
    tr: "Masayı Düzenle",
    de: "Tisch bearbeiten"
  },
  tableNumber: {
    en: "Table Number",
    tr: "Masa Numarası",
    de: "Tischnummer"
  },
  capacity: {
    en: "Capacity",
    tr: "Kapasite",
    de: "Kapazität"
  },
  status: {
    en: "Status",
    tr: "Durum",
    de: "Status"
  },
  available: {
    en: "Available",
    tr: "Müsait",
    de: "Verfügbar"
  },
  occupied: {
    en: "Occupied",
    tr: "Dolu",
    de: "Besetzt"
  },
  reserved: {
    en: "Reserved",
    tr: "Rezerve",
    de: "Reserviert"
  },
  todaysOrders: {
    en: "Today's Orders",
    tr: "Bugünkü Siparişler",
    de: "Heutige Bestellungen"
  },
  noOrders: {
    en: "No orders for today",
    tr: "Bugün için sipariş bulunmuyor",
    de: "Keine Bestellungen für heute"
  },
  orderTime: {
    en: "Order time",
    tr: "Sipariş zamanı",
    de: "Bestellzeit"
  },
  customerView: {
    en: "Menu",
    tr: "Menü",
    de: "Speisekarte"
  },
  merchantDashboard: {
    en: "Orders Status",
    tr: "Sipariş Durumu",
    de: "Bestellstatus"
  },
  admin: {
    en: "Admin",
    tr: "Yönetici",
    de: "Administrator"
  },
  pending: {
    en: "Pending",
    tr: "Bekliyor",
    de: "Ausstehend"
  },
  preparing: {
    en: "Preparing",
    tr: "Hazırlanıyor",
    de: "In Zubereitung"
  },
  ready: {
    en: "Ready",
    tr: "Hazır",
    de: "Fertig"
  },
  delivered: {
    en: "Delivered",
    tr: "Teslim Edildi",
    de: "Geliefert"
  },
  saveChanges: {
    en: "Save Changes",
    tr: "Değişiklikleri Kaydet",
    de: "Änderungen speichern"
  },
  addItem: {
    en: "Add Item",
    tr: "Ürün Ekle",
    de: "Artikel hinzufügen"
  },
  itemName: {
    en: "Item Name",
    tr: "Ürün Adı",
    de: "Artikelname"
  },
  price: {
    en: "Price",
    tr: "Fiyat",
    de: "Preis"
  },
  description: {
    en: "Description",
    tr: "Açıklama",
    de: "Beschreibung"
  },
  category: {
    en: "Category",
    tr: "Kategori",
    de: "Kategorie"
  },
  categories: {
    en: "Categories",
    tr: "Kategoriler",
    de: "Kategorien"
  },
  addCategory: {
    en: "Add Category",
    tr: "Kategori Ekle",
    de: "Kategorie hinzufügen"
  },
  categoryName: {
    en: "Category Name",
    tr: "Kategori Adı",
    de: "Kategoriename"
  },
  finance: {
    en: "Finance",
    tr: "Finans",
    de: "Finanzen"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat(language, {
      style: 'currency',
      currency: language === 'tr' ? 'TRY' : language === 'de' ? 'EUR' : 'USD',
    }).format(amount);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}