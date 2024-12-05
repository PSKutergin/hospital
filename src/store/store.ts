import CategoryStore from "./category";
import DepartmentStore from "./department";
import DoctorStore from "./staff/doctor";
import NurseStore from "./staff/nurse";

interface IStore {
    category: CategoryStore;
    department: DepartmentStore;
    doctor: DoctorStore;
    nurse: NurseStore;
}

class Store implements IStore {
    category: CategoryStore;
    department: DepartmentStore;
    doctor: DoctorStore;
    nurse: NurseStore;

    constructor() {
        this.category = new CategoryStore();
        this.department = new DepartmentStore();
        this.doctor = new DoctorStore();
        this.nurse = new NurseStore();
    }
}

const storeInstance = new Store();
export default storeInstance;
