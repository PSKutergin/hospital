import StaffStore from "@/store/staff/staff";
import nursesData from "@/data/db/nurses.json";
import { IStaff } from "@/models/IStaff";

class NurseStore extends StaffStore<IStaff> {
    constructor() {
        super();
    }

    initializeStore() {
        try {
            this.getStore().getState().loadItems(nursesData);
        } catch (error) {
            console.error("Error initializing doctor store:", error);
        }
    }
}

export default NurseStore;