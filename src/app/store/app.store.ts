import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Product } from '../core/models/product.model';

export interface BagItem {
  product: Product;
  size: string;
  quantity: number;
}

/**
 * Define the shape of the global state that will be shared across the app.
 */
export interface GlobalState {
  bag: BagItem[];
}

/**
 * Initial values for the global state
 */
export const initialState: GlobalState = {
  bag: [],
};

// ---------------------------
// Actions
// ---------------------------

export const addToBag = createAction('[Global] Add To Bag', (product: Product, size: string) => ({ product, size }));
export const removeFromBag = createAction('[Global] Remove From Bag', (productId: number, size: string) => ({ productId, size }));

// ---------------------------
// Reducer
// ---------------------------

export const globalReducer = createReducer(
  initialState,
  on(addToBag, (state: GlobalState, { product, size }): GlobalState => {
    const existing = state.bag.find((item) => item.product.id === product.id && item.size === size);
    if (existing) {
      return {
        ...state,
        bag: state.bag.map((item) =>
          item.product.id === product.id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    return { ...state, bag: [...state.bag, { product, size, quantity: 1 }] };
  }),
  on(removeFromBag, (state: GlobalState, { productId, size }): GlobalState => {
    const existing = state.bag.find((item) => item.product.id === productId && item.size === size);
    if (!existing) return state;
    if (existing.quantity > 1) {
      return {
        ...state,
        bag: state.bag.map((item) =>
          item.product.id === productId && item.size === size ? { ...item, quantity: item.quantity - 1 } : item
        ),
      };
    }
    return { ...state, bag: state.bag.filter((item) => !(item.product.id === productId && item.size === size)) };
  })
);

// ---------------------------
// Selectors
// ---------------------------

/** Feature selector to get the entire global state slice */
export const selectGlobalState = createFeatureSelector<GlobalState>('global');

export const selectBag = createSelector(selectGlobalState, (state: GlobalState) => state.bag); 