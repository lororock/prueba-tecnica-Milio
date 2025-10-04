import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoritesKey = 'product-favorites';
  private favoritesSubject: BehaviorSubject<Set<number>>;
  public favorites$: Observable<Set<number>>;
  private isLoaded = false;

  constructor() {
    // Initialize with empty set first
    this.favoritesSubject = new BehaviorSubject<Set<number>>(new Set());
    this.favorites$ = this.favoritesSubject.asObservable();
    
    // Load favorites after a short delay to ensure DOM is ready
    setTimeout(() => {
      this.loadFavorites();
    }, 0);
  }

  private loadFavorites(): void {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      this.isLoaded = true;
      return;
    }

    try {
      const stored = localStorage.getItem(this.favoritesKey);
      if (stored) {
        const favoritesArray = JSON.parse(stored);
        if (Array.isArray(favoritesArray)) {
          this.favoritesSubject.next(new Set(favoritesArray));
        }
      }
      this.isLoaded = true;
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      this.isLoaded = true;
    }
  }


  private saveFavorites(favorites: Set<number>): void {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      this.favoritesSubject.next(favorites);
      return;
    }

    try {
      const favoritesArray = [...favorites];
      localStorage.setItem(this.favoritesKey, JSON.stringify(favoritesArray));
      this.favoritesSubject.next(favorites);
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }

  isFavorite(productId: number): boolean {
    return this.favoritesSubject.value.has(productId);
  }

  toggleFavorite(productId: number): void {
    const currentFavorites = new Set(this.favoritesSubject.value);
    
    if (currentFavorites.has(productId)) {
      currentFavorites.delete(productId);
    } else {
      currentFavorites.add(productId);
    }
    
    this.saveFavorites(currentFavorites);
  }

  getFavorites(): Set<number> {
    return new Set(this.favoritesSubject.value);
  }
}
