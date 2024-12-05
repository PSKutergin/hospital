import { IFormField } from "@/models/IFormField";

export const staffFields: IFormField[] = [
    {
        name: 'lastName',
        label: 'Last Name:',
        type: 'text',
        rules: [{ required: true, message: 'Please input last name' }],
    },
    {
        name: 'firstName',
        label: 'First Name:',
        type: 'text',
        rules: [{ required: true, message: 'Please input first name' }],
    },
    {
        name: 'patronymic',
        label: 'Patronymic:',
        type: 'text',
        rules: [{ required: true, message: 'Please input patronymic' }],
    },
    {
        name: 'department',
        label: 'Department:',
        type: 'select',
        options: [],
        rules: [{ required: true, message: 'Please select department' }],
    }
];

export const doctorFields: IFormField[] = [
    ...staffFields,
    {
        name: 'isHead',
        label: 'Is Head of Department:',
        type: 'checkbox',
    }
];