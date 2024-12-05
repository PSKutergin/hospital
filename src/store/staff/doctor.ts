import { IDoctor } from "@/models/IDoctor";
import StaffStore from "@/store/staff/staff";
import doctorsData from "@/data/db/doctors.json";


class DoctorStore extends StaffStore<IDoctor> {

    constructor() {
        super();
    }

    initializeStore() {
        try {
            this.getStore().getState().loadItems(doctorsData);
        } catch (error) {
            console.error("Error initializing doctor store:", error);
        }
    }
}

export default DoctorStore;