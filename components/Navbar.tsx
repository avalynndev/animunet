import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Input,
} from "@nextui-org/react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import SearchIcon from "@/components/Icons/SearchIcon";

export default function App({ toggleTheme, theme }:any) {
  return (
    <>
      <Navbar>
        <NavbarBrand>
          <Link color="foreground" href="/">
            <p className="font-bold text-inherit">ANIMUNET</p>
          </Link>
        </NavbarBrand>

        <NavbarContent>
          <Input
            classNames={{
              base: "w-96 h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="lg"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </NavbarContent>

        <NavbarContent justify="end">
          <Button
            isIconOnly
            color={theme === "light" ? "secondary" : "primary"}
            variant="shadow"
            onClick={toggleTheme}
            className={theme === "light" ? "light-button" : "dark-button"}
          >
            {theme === "light" ? <IoMoonOutline /> : <IoSunnyOutline />}
          </Button>
        </NavbarContent>
      </Navbar>
    </>
  );
}
