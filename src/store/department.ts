import { IDepartment } from "@/models/IDepartment";
import { create } from "zustand";

interface IDepartmentStore {
    departments: IDepartment[];
    loadDepartments: (data: IDepartment[]) => void
}

class DepartmentStore {
    private store = create<IDepartmentStore>((set) => ({
        departments: [],
        loadDepartments: (data: IDepartment[]) => {
            try {
                set({ departments: data });
            } catch (error) {
                console.error("Error loading items:", error);
            }
        },
    }));

    public getStore() {
        return this.store;
    }
}

export default DepartmentStore;