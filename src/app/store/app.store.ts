import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Product } from '../core/models/product.model';

/**
 * Define the shape of the global state that will be shared across the app.
 */
export interface GlobalState {
  counter: number;
  bag: Product[];
}

/**
 * Initial values for the global state
 */
export const initialState: GlobalState = {
  counter: 0,
  bag: [],
};

// ---------------------------
// Actions
// ---------------------------

/** Increment the counter */
export const increment = createAction('[Global] Increment');

/** Decrement the counter */
export const decrement = createAction('[Global] Decrement');

/** Reset the counter to its initial value */
export const reset = createAction('[Global] Reset');

export const addToBag = createAction('[Global] Add To Bag', (product: Product) => ({ product }));

// ---------------------------
// Reducer
// ---------------------------

export const globalReducer = createReducer(
  initialState,
  on(increment, (state: GlobalState): GlobalState => ({ ...state, counter: state.counter + 1 })),
  on(decrement, (state: GlobalState): GlobalState => ({ ...state, counter: state.counter - 1 })),
  on(reset, (): GlobalState => initialState),
  on(addToBag, (state: GlobalState, { product }): GlobalState => ({ ...state, bag: [...state.bag, product] }))
);

// ---------------------------
// Selectors
// ---------------------------

/** Feature selector to get the entire global state slice */
export const selectGlobalState = createFeatureSelector<GlobalState>('global');

/** Selector to get the counter value */
export const selectCounter = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.counter
);

export const selectBag = createSelector(selectGlobalState, (state: GlobalState) => state.bag); 