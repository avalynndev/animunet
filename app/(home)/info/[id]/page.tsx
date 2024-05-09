"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import {
  Card,
  CardFooter,
  CardBody,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import { url } from "@/config/url";
import AnimeCard from "@/components/AnimeCard";
import axios from "axios";
import Image from "next/image";
import DetailsContainer from "@/components/DetailsContainer";
import EpisodeContainer from "@/components/EpisodeContainer";

const Info = ({ params }: any) => {
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [related_data, setRelatedAnimeData] = useState<any>();

  const fetchDetails = useCallback(async () => {
    try {
      const response = await axios.get(url.info + id);
      setData(response.data);
      const arr = Array.from(id).slice(0, 2);
      const related_data = await axios.get(url.search + arr);
      setRelatedAnimeData(related_data.data.results);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchDetails();
    }
  }, [id, fetchDetails]);

  return (
    <div className="pb-2">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <Spinner
              label="Loading"
              color="secondary"
              size="lg"
              labelColor="foreground"
            />
          </div>
        </div>
      ) : (
        <div>
          {!data ? (
            <div className="flex flex-col items-center justify-center h-screen">
              <div className="text-4xl font-bold mb-4">No Results Found</div>
              <div className="text-gray-500">Took a wrong turn?</div>
            </div>
          ) : (
            <div>
              <DetailsContainer key={`details-${data?.id}`} data={data} />
              <EpisodeContainer key={`episodes-${data?.id}`} data={data} />
            </div>
          )}
        </div>
      )}
      <div className="max-w text-center items-center">
        <Suspense
          fallback={
            <Spinner
              label="Loading"
              color="secondary"
              size="lg"
              labelColor="foreground"
            />
          }
        >
          {isLoading ? (
            <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 pt-16 sm:grid-cols-5 md:grid-cols-5">
              {Array.from({ length: 20 }, (_, index) => (
                <Card isPressable className="border-none bg-none" key={index}>
                  <CardBody className="overflow-visible py-2">
                    <Skeleton className="rounded-md">
                      <Image
                        alt="Anime Banner"
                        className="object-cover rounded-xl h-[230px] w-[270px]"
                        src={
                          "https://gogocdn.net/cover/kusuriya-no-hitorigoto-1696009733.png"
                        }
                        height={230}
                        width={270}
                      />
                    </Skeleton>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Skeleton className="rounded-md">
                      <p className="text-tiny text-center">
                        Anime Name here prob
                      </p>
                    </Skeleton>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-8 px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto lg:flex">
                {related_data.length === 0 ? (
                  <div className="flex flex-col text-center items-center justify-center h-screen">
                    No Related Animes
                  </div>
                ) : (
                  <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 pt-16 sm:grid-cols-5 md:grid-cols-5 ">
                    {related_data.map((anime: any) => (
                      <AnimeCard key={anime.id} anime={anime} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Info;
