import axios from "axios";
import { Card, CardFooter, CardBody, Skeleton } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import AnimeCard from "@/components/AnimeCard";
import { url } from "@/config/url";
import Image from "next/image";

const Anime_List = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [anime_list, setAnimeList] = useState<any[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const anime_list = await axios.get(url.anime_list);
        setAnimeList(anime_list.data.results);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, []);
  return (
    <div className="text-center max-w mx-auto px-6">
      {isLoading ? (
        <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 sm:grid-cols-5 md:grid-cols-5 pb-4">
          {Array.from({ length: 20 }, (_, index) => (
            <Card isPressable className="border-none bg-none" key={index}>
              <CardBody className="overflow-visible py-2">
                <Skeleton className="rounded-md">
                  <Image
                    alt="Anime Banner"
                    className="object-cover rounded-xl h-[250px]"
                    src={
                      "https://gogocdn.net/cover/kusuriya-no-hitorigoto-1696009733.png"
                    }
                    height={250}
                    width={270}
                  />
                </Skeleton>
              </CardBody>
              <CardFooter className="pt-0">
                <Skeleton className="rounded-md">
                  <p className="text-tiny text-center">Anime Name here prob</p>
                </Skeleton>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 sm:grid-cols-5 md:grid-cols-5 pb-4">
          {anime_list.map((anime: any) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Anime_List;
