import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface BasketItem {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  hasPrime: boolean;
}

interface BasketState {
  items: BasketItem[];
}

const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    hydrate: (state, action: PayloadAction<BasketState>) => {
      return action.payload;
    },
    addToBasket: (state, action: PayloadAction<BasketItem>) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action: PayloadAction<{ id: number }>) => {
      let pos = state.items.findIndex((item) => item.id === action.payload.id);
      let newBasket = [...state.items];

      if (pos > -1) {
        newBasket.splice(pos, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as its not in the basket`
        );
      }

      state.items = newBasket;
    },
    removeGroupedFromBasket: (state, action: PayloadAction<{ id: number }>) => {
      let newBasket = state.items.filter(
        (item) => item.id !== action.payload.id
      );

      state.items = newBasket;
    },
    clearBasket: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  removeGroupedFromBasket,
  clearBasket,
  hydrate,
} = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state: RootState) => state.basket.items;
export const selectTotal = (state: RootState) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
