import { IStaff } from "./IStaff";

export interface IDoctor extends IStaff {
    isHead: boolean;
}