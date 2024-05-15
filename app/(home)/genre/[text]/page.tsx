"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import {
  Card,
  CardFooter,
  CardBody,
  Skeleton,
  Spinner,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { url } from "@/config/url";
import AnimeCard from "@/components/AnimeCard";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const Genre = ({ params }: any) => {
  const { text } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [genre_results, setGenreResults] = useState<any[]>([]);

  const fetchDetails = useCallback(async () => {
    try {
      const genre = await axios.get(url.genre + "/" + text);
      setGenreResults(genre.data.results);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setIsLoading(false);
    }
  }, [text]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);
  return (
    <div className="text-center max-w-7xl mx-auto px-6 pb-3">
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
        <div className="py-8 px-4 sm:px-6 lg:px-8 pb-6">
          <div className="flex flex-col text-center items-center justify-center">
            <div className="flex flex-col flex-wrap ">
              <Breadcrumbs size="lg">
                <BreadcrumbItem>
                  <Link href="/genre">Genre</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  {text.charAt(0).toUpperCase() + text.slice(1)}
                </BreadcrumbItem>
              </Breadcrumbs>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-7 gap-4">
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
          <div>
            {genre_results.length === 0 ? (
              <div className="flex flex-col text-center items-center justify-center h-screen">
                <div className="text-4xl font-bold mb-4">No Results Found</div>
                <div className="text-gray-500 ">
                  Try adjusting your search criteria or check your spelling.
                </div>
              </div>
            ) : (
              <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-7 gap-4">
                {genre_results.map((anime: any) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </div>
            )}
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default Genre;
