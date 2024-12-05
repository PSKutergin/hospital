import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Typography, Input } from "antd";
import { SearchProps } from "antd/es/input";

const { Title } = Typography;
const { Search } = Input;

interface TableHeaderProps {
  title: string;
  handleAdd: () => void;
  setSearchValue: (value: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  handleAdd,
  setSearchValue,
}) => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    if (info?.source === "input") {
      setSearchValue(value);
    } else if (info?.source === "clear") {
      setSearchValue("");
    }
  };

  return (
    <Flex align="center" justify="space-between">
      <Title level={3}>{title}</Title>

      <Flex align="center" gap="16px">
        <Search
          placeholder="Search..."
          allowClear
          onSearch={onSearch}
          style={{ width: 200 }}
        />
        <Button icon={<PlusOutlined />} onClick={handleAdd} type="primary">
          Add new
        </Button>
      </Flex>
    </Flex>
  );
};

export default TableHeader;
