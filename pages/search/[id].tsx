import axios from "axios";
import { Card, CardFooter, CardBody, Skeleton } from "@nextui-org/react";
import React, { useState, useEffect, useCallback } from "react";
import { url } from "@/config/url";
import AnimeCard from "@/components/AnimeCard";
import { useRouter } from "next/router";
import Image from "next/image";

const Info = () => {
  const {
    query: { id },
  } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [search_results, setSearchResults] = useState<any[]>([]);

  const fetchDetails = useCallback(async () => {
    try {
      const search = await axios.get(url.search + id);
      setSearchResults(search.data.results);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);
  return (
    <>
      {isLoading ? (
        <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 pt-16 sm:grid-cols-5 md:grid-cols-5 pb-16">
          {Array.from({ length: 20 }, (_, index) => (
            <Card isPressable className="border-none bg-none" key={index}>
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
        <div className="pb-96">
          <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 pt-16	sm:grid-cols-5 md:grid-cols-5 pb-16">
            {search_results.map((anime: any) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Info;
