import { create } from "zustand";
import { CategoryEnum } from "@/enums/category-enum";

interface ICategoryStore {
    categories: CategoryEnum[];
    activeCategory: CategoryEnum;
    setActiveCategory: (category: CategoryEnum) => void;
}

class CategoryStore {
    private store = create<ICategoryStore>((set) => ({
        categories: [CategoryEnum.DOCTORS, CategoryEnum.NURSES],
        activeCategory: CategoryEnum.DOCTORS,
        setActiveCategory: (category: CategoryEnum): void =>
            set(() => ({
                activeCategory: category,
            })),
    }));

    public getStore() {
        return this.store;
    }
}

export default CategoryStore;
