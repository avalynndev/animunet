import React from "react";
import { Card, CardFooter, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";

export default function App({ anime }: any) {
  return (
    <Link href={`info/${anime.id}`}>
      <Card isPressable isFooterBlurred className="border-none">
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl h-[250px]"
            src={anime.image}
            width={270}
          />
        </CardBody>
        <CardFooter className="overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-center">{anime.title}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
