import React, { useState } from "react";
import {
  Navbar,
  NavbarItem,
  DropdownTrigger,
  DropdownItem,
  Dropdown,
  DropdownMenu,
  NavbarContent,
  Link,
  Button,
  Input,
} from "@nextui-org/react";
import DropdownIcon from "@/components/Icons/Dropdown";
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
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  radius="sm"
                  endContent={<DropdownIcon fill="currentColor" size={16} />}
                  variant="light"
                >
                  
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                as={Link}
                href="/genre"
                key="genre"
                description="Here&apos;s a diverse list of genres spanning different forms.."
                className="text-black"
              >
                Genre
              </DropdownItem>
              <DropdownItem
                as={Link}
                href="/anime-list"
                key="animelist"
                description="List of all available animes you can browse through.."
                className="text-black"
              >
                Anime
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Input
            classNames={{
              base: "lg:w-full h-10 sm:w-full",
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
