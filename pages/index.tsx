import axios from "axios";
import RecentEpisodeCard from "@/components/RecentEpisodeCard";
import { Card, CardFooter, CardBody, Skeleton } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import AnimeCard from "@/components/AnimeCard";
import { url } from "@/config/url";
import Image from "next/image";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [top_airing, setTopAiring] = useState<any[]>([]);
  const [popular, setPopular] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [recent_episodes, setRecentEpisodes] = useState<any[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const top_airing = await axios.get(url.top_airing);
        setTopAiring(top_airing.data.results);
        const popular = await axios.get(url.popular);
        setPopular(popular.data.results);
        const movies = await axios.get(url.movies);
        setMovies(movies.data.results);
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
      <h2 className="text-4xl font-bold mb-4 py-4 font-mono">TOP AIRING</h2>
      {isLoading ? (
        <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 sm:grid-cols-5 md:grid-cols-5 pb-4">
          {Array.from({ length: 10 }, (_, index) => (
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
          {top_airing.map((anime: any) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
      <h2 className="text-4xl font-bold mb-4 py-4 font-mono">POPULAR</h2>
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
          {popular.map((anime: any) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
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
              <Skeleton className="rounded-md">
                <span className="absolute top-3 right-4 px-2 py-1 bg-black text-foreground-400 rounded-xl text-xs">
                  EP: x
                </span>
              </Skeleton>
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
      <h2 className="text-4xl font-bold mb-4 py-4 font-mono">MOVIES</h2>
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
          {movies.map((anime: any) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
