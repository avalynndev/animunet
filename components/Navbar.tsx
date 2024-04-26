import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  Button,
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import SearchIcon from "@/components/Icons/SearchIcon";

export default function NavbarContainer({ toggleTheme, theme }: any) {
  const [searchValue, setSearchValue] = useState(""); // State to store the input value
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Redirect to another page when Enter key is pressed
      router.push(`/search/${searchValue}`); // Assuming you want to redirect to a search page with the search query
    }
  };
  return (
    <>
      <Navbar>
        <Link color="foreground" href="/">
          <p className="font-bold text-xl text-mono">ANIMUNET</p>
        </Link>
        <NavbarContent className="">
          <Input
            classNames={{
              base: "lg:w-full h-10 sm:w-96",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
            value={searchValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </NavbarContent>
        <Link color="foreground" href="/anime-list">
          <p className="text-sm">ANIME LIST</p>
        </Link>
        <Button
          isIconOnly
          color={theme === "light" ? "secondary" : "primary"}
          variant="shadow"
          onClick={toggleTheme}
          className={theme === "light" ? "light-button" : "dark-button"}
        >
          {theme === "light" ? <IoMoonOutline /> : <IoSunnyOutline />}
        </Button>
      </Navbar>
    </>
  );
}
