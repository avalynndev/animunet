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
import SearchIcon from "@/components/Icons/SearchIcon";

export default function App() {
  return (
    <>
      <Navbar>
        <NavbarBrand>
          <Link color="foreground" href="/">
            <p className="font-bold text-inherit">ANIMUNET</p>
          </Link>
        </NavbarBrand>

        <NavbarContent as="div" className="items-center" justify="end">
          <Input
            classNames={{
              base: "w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </NavbarContent>
      </Navbar>
    </>
  );
}
