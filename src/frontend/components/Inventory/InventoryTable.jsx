import React, { useEffect } from "react";
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector, IconPencil, IconTrash } from "@tabler/icons-react";
import { Center, Group, keys, ScrollArea, Table, Text, TextInput, UnstyledButton, Button } from "@mantine/core";
import classes from "./inventory.module.css";
import axios from "axios";

function Th({ children, reverseSortDirection, sorted, onSort }) {
  const Icon = sorted ? (reverseSortDirection ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="spacebetween">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data, search) {
  const query = search.toLowerCase().trim();
  return data.filter((item) => keys(data[0]).some((key) => item[key].toLowerCase().includes(query)));
}

function sortData(data, payload) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }
  return filterData(
    [...data].sort((a, b) => {
      if (payload.reverseSortDirection) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export const InventoryTable = () => {
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);
  const [sortedData, setSortedData] = React.useState([]);
  const [sortBy, setSortBy] = React.useState(null);
  const [reverseSortDirection, setReverseSortDirection] = React.useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/inventory")
      .then((response) => {
        setData(response.data);
        setSortedData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error.message);
      });
  }, []);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reverseSortDirection);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={`${row.brand}-${row.color}-${row.materialType}`} className={classes.tr}>
      <Table.Td>
        {row.brand} {row.color} {row.materialType}
      </Table.Td>
      <Table.Td>{row.brand}</Table.Td>
      <Table.Td>{row.color}</Table.Td>
      <Table.Td>{row.category}</Table.Td>
      <Table.Td>{row.materialType}</Table.Td>
      <Table.Td>{row.weight}</Table.Td>
      <Table.Td>{row.price}</Table.Td>
      <Table.Td>{row.onHand}</Table.Td>
      <Button variant="filled" color="var(--accent)" size="xs" style={{ marginRight: "5px", marginTop: "5px" }}>
        {<IconPencil />}
      </Button>
      <Button variant="filled" size="xs" color="var(--accent)" style={{ marginLeft: "5px", marginTop: "5px" }}>
        {<IconTrash />}
      </Button>
    </Table.Tr>
  ));

  if (!data || data.length === 0) {
    return (
      <Text ta="center" fz="lg">
        No data to display
      </Text>
    );
  }

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={<IconSearch size={16} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
        <Table.Tbody>
          <Table.Tr>
            <Th sorted={sortBy === "brand"} reveresed={reverseSortDirection} onSort={() => setSorting("brand")}>
              Item Name
            </Th>
            <Th sorted={sortBy === "brand"} reveresed={reverseSortDirection} onSort={() => setSorting("brand")}>
              Brand
            </Th>
            <Th sorted={sortBy === "color"} reveresed={reverseSortDirection} onSort={() => setSorting("color")}>
              Color
            </Th>
            <Th sorted={sortBy === "category"} reveresed={reverseSortDirection} onSort={() => setSorting("category")}>
              Category
            </Th>
            <Th
              sorted={sortBy === "materialType"}
              reveresed={reverseSortDirection}
              onSort={() => setSorting("materialType")}
            >
              Material Type
            </Th>
            <Th sorted={sortBy === "weight"} reveresed={reverseSortDirection} onSort={() => setSorting("weight")}>
              Weight
            </Th>
            <Th sorted={sortBy === "price"} reveresed={reverseSortDirection} onSort={() => setSorting("price")}>
              Price
            </Th>
            <Th sorted={sortBy === "unit"} reveresed={reverseSortDirection} onSort={() => setSorting("unit")}>
              On Hand
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
};
