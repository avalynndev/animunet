import axios from "axios";
import { Card, CardFooter, CardBody, Skeleton } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import AnimeCard from "@/components/AnimeCard";
import { url } from "@/config/url";
import Image from "next/image";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [top_airing, setTopAiring] = useState<any[]>([]);
  const [popular, setPopular] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const top_airing = await axios.get(url.top_airing);
        setTopAiring(top_airing.data.results);
        const popular = await axios.get(url.popular);
        setPopular(popular.data.results);
        console.log(popular.data.results);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails()
  }, []);
  return (
    <div className="max-w mx-auto px-6">
      <h1 className="text-4xl font-bold mb-4 py-4">Top Airing</h1>
      {isLoading ? (
        <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 sm:grid-cols-5 md:grid-cols-5 pb-4">
          {Array.from({ length: 10 }, (_, index) => (
            <Card isPressable className="border-none bg-none">
              <CardBody className="overflow-visible py-2">
                <Skeleton>
                  <Image
                    alt="Anime Banner"
                    className="object-cover rounded-xl h-[250px]"
                    src={""}
                    height={250}
                    width={270}
                  />
                </Skeleton>
              </CardBody>
              <CardFooter className="pt-0">
                <Skeleton>
                  <p className="text-tiny text-center">Anime Name here prob</p>
                </Skeleton>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 sm:grid-cols-5 md:grid-cols-5 pb-4">
          {top_airing.map((anime: any) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
      <h1 className="text-4xl font-bold mb-4 py-4">Popular</h1>
      {isLoading ? (
        <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 sm:grid-cols-5 md:grid-cols-5 pb-4">
          {Array.from({ length: 20 }, (_, index) => (
            <Card isPressable className="border-none bg-none">
              <CardBody className="overflow-visible py-2">
                <Skeleton>
                  <Image
                    alt="Anime Banner"
                    className="object-cover rounded-xl h-[250px]"
                    src={""}
                    height={250}
                    width={270}
                  />
                </Skeleton>
              </CardBody>
              <CardFooter className="pt-0">
                <Skeleton>
                  <p className="text-tiny text-center">Anime Name here prob</p>
                </Skeleton>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 sm:grid-cols-5 md:grid-cols-5 pb-4">
          {popular.map((anime: any) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
