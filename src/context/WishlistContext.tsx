import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface WishlistContextValue {
  wishlistIds: string[];
  wishlistCount: number;
  isInWishlist: (serviceId: string) => boolean;
  addToWishlist: (serviceId: string) => void;
  removeFromWishlist: (serviceId: string) => void;
  toggleWishlist: (serviceId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useLocalStorage<string[]>(
    'creatorspace_wishlist',
    ['srv-brand-identity', 'srv-saas-design-system']
  );

  const isInWishlist = (serviceId: string) => wishlistIds.includes(serviceId);

  const addToWishlist = (serviceId: string) => {
    setWishlistIds((prev) => (prev.includes(serviceId) ? prev : [...prev, serviceId]));
  };

  const removeFromWishlist = (serviceId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== serviceId));
  };

  const toggleWishlist = (serviceId: string): boolean => {
    const exists = wishlistIds.includes(serviceId);
    if (exists) {
      removeFromWishlist(serviceId);
      return false;
    }
    addToWishlist(serviceId);
    return true;
  };

  const clearWishlist = () => {
    setWishlistIds([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistCount: wishlistIds.length,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return ctx;
}
