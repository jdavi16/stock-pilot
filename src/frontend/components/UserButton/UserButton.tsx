import { IconChevronRight, IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import { Avatar, Group, Text, Popover, UnstyledButton, Flex, Divider } from "@mantine/core";
import classes from "./UserButton.module.css";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

export function UserButton() {
  const email = localStorage.getItem("email") || "";
  const firstName = localStorage.getItem("firstName") || "";
  const lastName = localStorage.getItem("lastName") || "";
  const [opened, { close, open }] = useDisclosure(false);

  const capitalizeName = (name: string): string => {
    return name.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Popover width={200} position='right-end' offset={25} opened={opened}>
      <Popover.Target>
        <UnstyledButton className={classes.user} onClick={open}>
          <Group>
            <Avatar />
            <div style={{ flex: 1 }}>
              <Text size='sm' fw={500}>
                {capitalizeName(firstName)} {capitalizeName(lastName)}
              </Text>

              <Text size='xs' c='dimmed'>
                {email}
              </Text>
            </div>
            <IconChevronRight size={14} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown className={classes.dropdown} onMouseLeave={close}>
        <Flex direction='column' gap={10}>
          <Link className={classes.dropdownItem} to={"/profile"} onClick={close}>
            <IconUser />
            Profile
          </Link>
          <Link className={classes.dropdownItem} to={"/settings"} onClick={close}>
            <IconSettings />
            Settings
          </Link>
          <Divider color='var(--borderColor)' />
          <Link className={classes.dropdownItem} to={"/"}>
            <IconLogout />
            Logout
          </Link>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
}
