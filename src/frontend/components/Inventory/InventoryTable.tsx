import React, { useEffect, useState, ChangeEvent } from "react";
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector, IconPencil, IconTrash } from "@tabler/icons-react";
import { Center, Group, ScrollArea, Table, Text, TextInput, UnstyledButton, Button } from "@mantine/core";
import classes from "./inventory.module.css";
import axios from "axios";

interface InventoryItem {
  brand: string;
  color: string;
  category: string;
  materialType: string;
  weight: string;
  price: string;
  onHand: string;
  id: string; // Ensure each item has a unique id
}

interface ThProps {
  children: React.ReactNode;
  reverseSortDirection: boolean;
  sorted: boolean;
  onSort: () => void;
}

interface SortPayload {
  sortBy: keyof InventoryItem | null;
  reversed: boolean;
  search: string;
}

function Th({ children, reverseSortDirection, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reverseSortDirection ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify='spacebetween'>
          <Text fw={500} fz='sm'>
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

function filterData(data: InventoryItem[], search: string): InventoryItem[] {
  const query = search.toLowerCase().trim();
  return data.filter((item) => Object.keys(data[0]).some((key) => item[key as keyof InventoryItem].toLowerCase().includes(query)));
}

function sortData(data: InventoryItem[], payload: SortPayload): InventoryItem[] {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }
  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export const InventoryTable: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<InventoryItem[]>([]);
  const [sortedData, setSortedData] = useState<InventoryItem[]>([]);
  const [sortBy, setSortBy] = useState<keyof InventoryItem | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState<boolean>(false);

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

  const setSorting = (field: keyof InventoryItem) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const handleDelete = (id: string) => {
    axios
      .delete(`http://localhost:5000/api/inventory/${id}`)
      .then(() => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        setSortedData(updatedData);
      })
      .catch((error) => {
        console.error("Error deleting item:", error.message);
      });
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.id} className={classes.tr}>
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
      <Button variant='filled' color='var(--accent)' size='xs' style={{ marginRight: "5px", marginTop: "5px" }}>
        {<IconPencil />}
      </Button>
      <Button variant='filled' size='xs' color='var(--accent)' style={{ marginLeft: "5px", marginTop: "5px" }} onClick={() => handleDelete(row.id)}>
        {<IconTrash />}
      </Button>
    </Table.Tr>
  ));

  if (!data || data.length === 0) {
    return (
      <Text ta='center' fz='lg'>
        No data to display
      </Text>
    );
  }

  return (
    <ScrollArea>
      <TextInput placeholder='Search by any field' mb='md' leftSection={<IconSearch size={16} stroke={1.5} />} value={search} onChange={handleSearchChange} />
      <Table horizontalSpacing='md' verticalSpacing='xs' miw={700} layout='fixed'>
        <Table.Tbody>
          <Table.Tr>
            <Th sorted={sortBy === "brand"} reverseSortDirection={reverseSortDirection} onSort={() => setSorting("brand")}>
              Item Name
            </Th>
            <Th sorted={sortBy === "brand"} reverseSortDirection={reverseSortDirection} onSort={() => setSorting("brand")}>
              Brand
            </Th>
            <Th sorted={sortBy === "color"} reverseSortDirection={reverseSortDirection} onSort={() => setSorting("color")}>
              Color
            </Th>
            <Th sorted={sortBy === "category"} reverseSortDirection={reverseSortDirection} onSort={() => setSorting("category")}>
              Category
            </Th>
            <Th sorted={sortBy === "materialType"} reverseSortDirection={reverseSortDirection} onSort={() => setSorting("materialType")}>
              Material Type
            </Th>
            <Th sorted={sortBy === "weight"} reverseSortDirection={reverseSortDirection} onSort={() => setSorting("weight")}>
              Weight
            </Th>
            <Th sorted={sortBy === "price"} reverseSortDirection={reverseSortDirection} onSort={() => setSorting("price")}>
              Price
            </Th>
            <Th sorted={sortBy === "onHand"} reverseSortDirection={reverseSortDirection} onSort={() => setSorting("onHand")}>
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
                <Text fw={500} ta='center'>
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
