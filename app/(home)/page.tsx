"use client";
import axios from "axios";
import { Card, CardFooter, CardBody, Skeleton, Spinner } from "@nextui-org/react";
import RecentEpisodeCard from "@/components/RecentEpisodeCard";
import React, { useState, useEffect, Suspense } from "react";
import AnimeCard from "@/components/AnimeCard";
import { url } from "@/config/url";
import Image from "next/image";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [top_airing, setTopAiring] = useState<any[]>([]);
  const [popular, setPopular] = useState<any[]>([]);  const [recent_episodes, setRecentEpisodes] = useState<any[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const top_airing = await axios.get(url.top_airing);
        setTopAiring(top_airing.data.results);
        const popular = await axios.get(url.popular);
        setPopular(popular.data.results);
        const recent_episodes = await axios.get(url.recent_episodes);
        setRecentEpisodes(recent_episodes.data.results);
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
      <Suspense fallback={<Spinner color="success" size="lg" />}>
        <h2 className="text-4xl font-bold mb-4 py-4 font-mono">TOP AIRING</h2>
        {isLoading ? (
          <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 sm:grid-cols-5 md:grid-cols-5 pb-4">
            {Array.from({ length: 10 }, (_, index) => (
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
          <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 sm:grid-cols-5 md:grid-cols-5 pb-4">
            {top_airing.map((anime: any) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}
      </Suspense>
      <Suspense fallback={<Spinner color="success" size="lg" />}>
        <h2 className="text-4xl font-bold mb-4 py-4 font-mono">POPULAR</h2>
        {isLoading ? (
          <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 sm:grid-cols-5 md:grid-cols-5 pb-4">
            {Array.from({ length: 20 }, (_, index) => (
              <Card isPressable className="border-none bg-none" key={index}>
                <CardBody className="overflow-visible py-2">
                  <Skeleton className="rounded-md">
                    <Image
                      alt="Anime Banner"
                      className="object-cover rounded-xl h-[230px]"
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
          <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 sm:grid-cols-5 md:grid-cols-5 pb-4">
            {popular.map((anime: any) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}
      </Suspense>
      <Suspense fallback={<Spinner color="success" size="lg" />}>
        <h2 className="text-4xl font-bold mb-4 py-4 font-mono">
          RECENT EPISODES
        </h2>
        {isLoading ? (
          <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 sm:grid-cols-5 md:grid-cols-5 pb-4">
            {Array.from({ length: 20 }, (_, index) => (
              <Card isPressable className="border-none bg-none" key={index}>
                <CardBody className="overflow-visible py-2">
                  <Skeleton className="rounded-md">
                    <Image
                      alt="Anime Banner"
                      className="object-cover rounded-xl h-[230px]"
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
          <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 sm:grid-cols-5 md:grid-cols-5 pb-4">
            {recent_episodes.map((anime: any) => (
              <RecentEpisodeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default Main;
