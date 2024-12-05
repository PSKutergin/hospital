import { useEffect, useMemo, useState } from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Table, Spin, TableProps, Flex } from "antd";
import { useOutletContext } from "react-router-dom";
import { IDoctor } from "@/models/IDoctor";
import { CategoryEnum } from "@/enums/category-enum";
import storeInstance from "@/store/store";
import TableHeader from "@/components/table-header/table-header";

const Doctors: React.FC = () => {
  const store = storeInstance.doctor.getStore();
  const {
    setType,
    setIsModalOpen,
    setEditData,
    setSelectedCategory,
  }: {
    setType: React.Dispatch<React.SetStateAction<"create" | "update">>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setEditData: React.Dispatch<React.SetStateAction<IDoctor | null>>;
    setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryEnum>>;
  } = useOutletContext();
  const { loading, items, removeItem } = store();
  const [searchValue, setSearchValue] = useState<string>("");

  const addDoctor = (): void => {
    setType("create");
    setIsModalOpen(true);
    setSelectedCategory(CategoryEnum.DOCTORS);
  };

  const editDoctor = (id: number): void => {
    const doctor = items.find((item) => item.id === id);
    if (doctor) {
      setType("update");
      setIsModalOpen(true);
      setEditData(doctor);
      setSelectedCategory(CategoryEnum.DOCTORS);
    }
  };

  const columns: TableProps<IDoctor>["columns"] = [
    {
      title: "#",
      dataIndex: "id",
      width: 50,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Patronymic",
      dataIndex: "patronymic",
    },
    {
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Head of department",
      dataIndex: "isHead",
      render: (isHead) => {
        return isHead ? (
          <CheckCircleOutlined style={{ color: "green" }} />
        ) : (
          <CloseCircleOutlined style={{ color: "red" }} />
        );
      },
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "id",
      fixed: "right",
      render: (id) => (
        <Flex gap={8}>
          <a onClick={() => editDoctor(id)}>Edit</a>
          <a onClick={() => removeItem(id)}>Delete</a>
        </Flex>
      ),
    },
  ];

  const filteredItems = useMemo(() => {
    if (!items.length) return [];
    return items.filter((item) =>
      [item.lastName, item.firstName, item.patronymic, item.department]
        .map((field) => field?.toLowerCase() || "")
        .some((value) => value.includes(searchValue.toLowerCase()))
    );
  }, [items, searchValue]);

  useEffect(() => {
    storeInstance.doctor.initializeStore();
  }, []);

  return (
    <>
      <Table
        scroll={{ y: 55 * 10 }}
        loading={{
          spinning: loading,
          indicator: (
            <Spin
              indicator={
                <LoadingOutlined
                  style={{ color: "#41E3A7", fontSize: 48 }}
                  spin
                />
              }
            />
          ),
        }}
        rowKey={(record) => record.id}
        size="middle"
        columns={columns}
        dataSource={filteredItems}
        title={() => (
          <TableHeader
            title="Doctors"
            handleAdd={addDoctor}
            setSearchValue={setSearchValue}
          />
        )}
        pagination={false}
      />
    </>
  );
};

export default Doctors;
