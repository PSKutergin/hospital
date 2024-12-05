import { Rule } from "antd/es/form"

export interface IFormField {
    name: string
    label: string
    type: string
    options?: { value: string; label: string }[]
    rules?: Rule[]
}