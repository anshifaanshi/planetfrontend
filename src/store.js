import { create } from "zustand";

export const useCartStore = create((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const exists = state.items.find((i) => i._id === item._id);
      if (exists) {
        return {
          items: state.items.map((i) =>
            i._id === item._id ? { ...i, qty: i.qty + 1 } : i
          )
        };
      }
      return { items: [...state.items, { ...item, qty: 1 }] };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i._id !== id)
    })),
  clearCart: () => set({ items: [] })
}));
