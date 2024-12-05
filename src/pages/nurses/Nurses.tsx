import { useEffect, useMemo, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin, Table, TableProps } from "antd";
import { useOutletContext } from "react-router-dom";
import { IStaff } from "@/models/IStaff";
import { CategoryEnum } from "@/enums/category-enum";
import storeInstance from "@/store/store";
import TableHeader from "@/components/table-header/table-header";

const Nurses: React.FC = () => {
  const store = storeInstance.nurse.getStore();
  const {
    setType,
    setIsModalOpen,
    setEditData,
    setSelectedCategory,
  }: {
    setType: React.Dispatch<React.SetStateAction<"create" | "update">>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setEditData: React.Dispatch<React.SetStateAction<IStaff | null>>;
    setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryEnum>>;
  } = useOutletContext();
  const { loading, items, removeItem } = store();
  const [searchValue, setSearchValue] = useState<string>("");

  const addNurse = (): void => {
    setType("create");
    setIsModalOpen(true);
    setSelectedCategory(CategoryEnum.NURSES);
  };

  const editNurse = (id: number): void => {
    const nurse = items.find((item) => item.id === id);
    if (nurse) {
      setType("update");
      setIsModalOpen(true);
      setEditData(nurse);
      setSelectedCategory(CategoryEnum.NURSES);
    }
  };

  const columns: TableProps<IStaff>["columns"] = [
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
      title: "Actions",
      dataIndex: "id",
      fixed: "right",
      render: (id) => (
        <Flex gap={8}>
          <a onClick={() => editNurse(id)}>Edit</a>
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
    storeInstance.nurse.initializeStore();
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
            title="Nurses"
            handleAdd={addNurse}
            setSearchValue={setSearchValue}
          />
        )}
        pagination={false}
      />
    </>
  );
};

export default Nurses;
