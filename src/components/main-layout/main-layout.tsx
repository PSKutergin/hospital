import s from "./main-layout.module.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FormInstance, Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { CategoryEnum } from "@/enums/category-enum";
import { doctorFields, staffFields } from "@/data/fields";
import { IDoctor } from "@/models/IDoctor";
import { IStaff } from "@/models/IStaff";
import departmentsData from "@/data/db/departments.json";
import storeInstance from "@/store/store";
import EditModal from "@/components/edit-modal/edit-modal";

const { Header, Content } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const storeCategory = storeInstance.category.getStore();
  const storeDepartment = storeInstance.department.getStore();
  const storeDoctor = storeInstance.doctor.getStore();
  const storeNurse = storeInstance.nurse.getStore();
  const { categories, activeCategory, setActiveCategory } = storeCategory();
  const { departments, loadDepartments } = storeDepartment();
  const { addItem: addDoctor, editItem: editDoctor } = storeDoctor();
  const { addItem: addNurse, editItem: editNurse } = storeNurse();

  const [type, setType] = useState<"create" | "update">(
    "create" as "create" | "update"
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryEnum>(
    CategoryEnum.DOCTORS
  );
  const [editData, setEditData] = useState<IDoctor | IStaff | null>(null);

  const items = useMemo(
    () =>
      categories &&
      categories.map((category: CategoryEnum, index: number) => ({
        key: String(index + 1),
        label: category,
      })),
    [categories]
  );

  const handleMenuClick = useCallback(
    (e: { key: string }) => {
      const selectedCategory = categories[parseInt(e.key, 10) - 1];
      setActiveCategory(selectedCategory);
      navigate(`/${selectedCategory.toLowerCase()}`);
    },
    [categories, setActiveCategory, navigate]
  );

  const handleSubmit = (values: IDoctor | IStaff, form: FormInstance) => {
    if (type === "create") {
      if (selectedCategory === CategoryEnum.DOCTORS) {
        addDoctor(values as IDoctor);
      } else if (selectedCategory === CategoryEnum.NURSES) {
        addNurse(values as IStaff);
      }
    } else if (type === "update") {
      if (selectedCategory === CategoryEnum.DOCTORS) {
        editDoctor(editData?.id as number, values as IDoctor);
      } else if (selectedCategory === CategoryEnum.NURSES) {
        editNurse(editData?.id as number, values as IStaff);
      }
    }

    form.resetFields();
    setIsModalOpen(false);
  };

  const formFields = useMemo(() => {
    const fields =
      selectedCategory === CategoryEnum.DOCTORS ? doctorFields : staffFields;

    return fields.map((field) =>
      field.name === "department"
        ? {
            ...field,
            options:
              departments && departments.length
                ? departments.map((item) => ({
                    label: item.name,
                    value: item.name,
                  }))
                : [],
          }
        : field
    );
  }, [selectedCategory, departments]);

  useEffect(() => {
    if (categories && activeCategory) {
      navigate(`/${activeCategory.toLowerCase()}`);
    }
  }, [categories, activeCategory, navigate]);

  useEffect(() => {
    loadDepartments(departmentsData);
  }, [loadDepartments]);

  return (
    <Layout className={s.layout}>
      <Header className={s.header}>
        <section className={s.logo} />
        {categories && (
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[String(categories.indexOf(activeCategory) + 1)]}
            items={items}
            onClick={handleMenuClick}
            className={s.menu}
          />
        )}
      </Header>
      <Content className={s.content}>
        <section className={s.container}>
          <Outlet
            context={{
              setType,
              setIsModalOpen,
              setEditData,
              setSelectedCategory,
            }}
          />
        </section>
      </Content>

      <EditModal
        type={type}
        title={
          type === "create"
            ? `Add new ${selectedCategory.toLocaleLowerCase()}`
            : `Update ${selectedCategory.toLocaleLowerCase()}`
        }
        fields={formFields}
        isModalOpen={isModalOpen}
        editData={editData}
        setIsModalOpen={setIsModalOpen}
        onSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default MainLayout;
