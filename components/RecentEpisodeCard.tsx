import React from "react";
import { Card, CardFooter, CardBody } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

export default function AnimeCard({ anime }: any) {
  const truncatedTitle =
    anime.title.length > 20 ? anime.title.slice(0, 17) + "..." : anime.title;
  return (
    <Link
      shallow
      href={`/watch/${anime.id}/${anime.episodeNumber
        .toString()
        .replace(/\./g, "-")}`}
    >
      <Card
        isHoverable={true}
        isPressable
        className="justify-center text-center items-center hover:scale-105 transition-all duration-300 hover:shadow-md dark:hover:shadow-blue-700 hover:shadow-zinc-900"
      >
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl h-[230px]"
            src={anime.image}
            height={230}
            width={270}
          />
        </CardBody>
        <CardFooter className="pt-0 justify-center">
          <p className="text-tiny text-left">{truncatedTitle}</p>
        </CardFooter>
        <span className="absolute top-3 right-4 px-2 py-1 bg-black text-foreground-400 rounded-xl text-xs">
          EP: {anime.episodeNumber}
        </span>
      </Card>
    </Link>
  );
}
