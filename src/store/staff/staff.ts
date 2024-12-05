import { IStaff } from "@/models/IStaff";
import { create } from "zustand";

interface IStaffStore<T extends IStaff> {
    loading: boolean;
    items: T[];
    loadItems: (data: T[]) => void;
    addItem: (item: T) => void;
    editItem: (id: number, updatedItem: Partial<T>) => void;
    removeItem: (id: number) => void;
}

class StaffStore<T extends IStaff> {
    private store = create<IStaffStore<T>>((set) => ({
        loading: false,
        items: [],
        loadItems: (data: T[]) => {
            set({ loading: true });
            try {
                set({ items: data });
            } catch (error) {
                console.error("Error loading items:", error);
            } finally {
                set({ loading: false });
            }
        },
        addItem: (item: T) => {
            set({ loading: true });
            try {
                item.id = this.store.getState().items.length + 1;

                set((state) => ({
                    items: [...state.items, item],
                }));
            } catch (error) {
                console.error("Error adding item:", error);
            } finally {
                set({ loading: false });
            }
        },
        editItem: (id: number, updatedItem: Partial<T>) => {
            set({ loading: true });
            try {
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id ? { ...item, ...updatedItem } : item
                    ),
                }));
            } catch (error) {
                console.error("Error editing item:", error);
            } finally {
                set({ loading: false });
            }
        },
        removeItem: (id: number) => {
            set({ loading: true });
            try {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                }));
            } catch (error) {
                console.error("Error removing item:", error);
            } finally {
                set({ loading: false });
            }
        },
    }));

    public getStore() {
        return this.store;
    }
}

export default StaffStore;