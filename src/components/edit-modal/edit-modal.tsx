import { useEffect, useState } from "react";
import { Button, Form, FormInstance, Input, Modal, Select, Switch } from "antd";
import { IFormField } from "@/models/IFormField";

interface ShopModalProps<T> {
  type: "create" | "update";
  title: string;
  fields: IFormField[];
  isModalOpen: boolean;
  editData: T | null;
  setIsModalOpen: (value: boolean) => void;
  onSubmit: (values: T, form: FormInstance) => void;
}

const EditModal = <T extends object>({
  type,
  title,
  fields,
  isModalOpen,
  editData,
  setIsModalOpen,
  onSubmit,
}: ShopModalProps<T>) => {
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [form]: [FormInstance] = Form.useForm();
  const values = Form.useWatch([], form);

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const isFormModified = () => {
    if (!editData) return false;

    return fields.some((field) => {
      const fieldName = field.name as keyof T;

      return values[fieldName] !== editData[fieldName];
    });
  };

  useEffect(() => {
    if (editData) {
      const initialValues = { ...editData };

      fields.forEach((field) => {
        const fieldName = field.name as keyof T;

        if (field.type === "select" && editData[fieldName]) {
          const selectedOption = field.options?.find(
            (option) => option.value === String(editData[fieldName])
          );
          if (selectedOption) {
            initialValues[fieldName] = selectedOption.value as T[keyof T];
          }
        }
      });

      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [editData, form, fields]);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" variant="filled" name="validateOnly">
        {fields.map((field) => (
          <Form.Item
            key={field.name}
            label={field.label}
            name={field.name}
            rules={field.rules}
          >
            {field.type === "select" ? (
              <Select
                options={field.options}
                fieldNames={{ label: "label", value: "value" }}
                onChange={(value) =>
                  form.setFieldsValue({ [field.name]: value })
                }
                allowClear
              />
            ) : field.type === "checkbox" ? (
              <Switch
                onChange={(value) =>
                  form.setFieldsValue({ [field.name]: value })
                }
              />
            ) : (
              <Input type={field.type} />
            )}
          </Form.Item>
        ))}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              type === "update"
                ? !submittable || !isFormModified()
                : !submittable
            }
            style={{ width: "100%" }}
            onClick={() => onSubmit(values, form)}
          >
            {type === "create" ? "Create" : "Update"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
