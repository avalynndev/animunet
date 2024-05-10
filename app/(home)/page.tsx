"use client";
import axios from "axios";
import {
  Card,
  CardFooter,
  CardBody,
  Skeleton,
  Button,
  Spinner,
} from "@nextui-org/react";
import { GiCrossMark } from "react-icons/gi";
import RecentEpisodeCard from "@/components/RecentEpisodeCard";
import React, { useState, useEffect, Suspense } from "react";
import AnimeCard from "@/components/AnimeCard";
import { url } from "@/config/url";
import Image from "next/image";
import Link from 'next/link'

interface Anime {
  id: number;
  title: string;
}

const AnimeHistoryItem = ({ animeHistory, onDelete }: any) => {
  console.log(animeHistory)
  const handleDelete = (itemId: number) => {
    onDelete(itemId);
  };
  return (
    <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 sm:grid-cols-5 md:grid-cols-5 pb-4">
      {animeHistory.map((item: any, index: any) => (
        <div key={index}>
          <Link shallow href={`/watch/${item.id}/${item.episode_number}`}>
            <Card
              isHoverable={true}
              isPressable
              className="border-none bg-none"
            >
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl h-[230px] w-[270px]"
                  src={item.image}
                  height={230}
                  width={270}
                />
              </CardBody>
              <CardFooter className="pt-0">
                <p className="text-tiny text-center">
                  {item.title.length > 24
                    ? item.title.slice(0, 20) + "..."
                    : item.title}
                </p>
              </CardFooter>
              <span className="absolute top-3 right-4 px-2 py-1 bg-black text-foreground-400 rounded-xl text-xs">
                EP: {item.episode_number}
              </span>
              <Button
                size="sm"
                isIconOnly
                onClick={() => handleDelete(item.id)} // Pass the item ID to the delete function
                color="danger"
                className="absolute top-3 left-4 px-2 py-1 text-white rounded-md text-xs"
              >
                <GiCrossMark />
              </Button>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  );
};

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [topAiring, setTopAiring] = useState<Anime[]>([]);
  const [popular, setPopular] = useState<Anime[]>([]);
  const [recentEpisodes, setRecentEpisodes] = useState<Anime[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [localItems, setLocalItems] = useState({ AnimeHistory: [] });

  const handleDeleteItem = (itemId: number) => {
    try {
      const updatedHistory = localItems.AnimeHistory.filter(
        (item: any) => item.id !== itemId
      );
      localStorage.setItem("watchHistory", JSON.stringify(updatedHistory));
      setLocalItems({ AnimeHistory: updatedHistory });
    } catch (error) {
      console.log("Error deleting item from local storage:", error);
    }
  };

  const fetchTopAiring = async () => {
    try {
      const response = await axios.get(url.top_airing);
      setTopAiring(response.data.results);
    } catch (error) {
      setError("Error fetching top airing anime");
    }
  };

  const fetchPopular = async () => {
    try {
      const response = await axios.get(url.popular);
      setPopular(response.data.results);
    } catch (error) {
      setError("Error fetching popular anime");
    }
  };

  const fetchRecentEpisodes = async () => {
    try {
      const response = await axios.get(url.recent_episodes);
      setRecentEpisodes(response.data.results);
    } catch (error) {
      setError("Error fetching recent episodes");
    }
  };

  function get_local() {
    try {
      const data = localStorage.getItem("watchHistory");
      return JSON.parse(data || "");
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }
  

  useEffect(() => {
    const fetchDetails = async () => {
      await Promise.all([
        fetchTopAiring(),
        fetchPopular(),
        fetchRecentEpisodes(),
      ]);
      setIsLoading(false);
    };
    fetchDetails();
    const newData = get_local();
    setLocalItems(newData);
  }, []);

  return (
    <div className="text-center max-w mx-auto px-6">
      <h2 className="text-4xl font-bold mb-4 py-4 font-mono">
        CONTINUE WATCHING
      </h2>
      <Suspense fallback={<Spinner color="success" size="lg" />}>
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
          <div>
            {localItems.AnimeHistory != null && (
              <AnimeHistoryItem
                animeHistory={localItems.AnimeHistory}
                onDelete={handleDeleteItem}
              />
            )}
            {localItems.AnimeHistory == null && (
              <div className="flex flex-col text-center items-center justify-center ">
                <div className="text-gray-500 ">
                  Keep watching more and easily continue watching from here..!!
                </div>
              </div>
            )}
          </div>
        )}
      </Suspense>
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
            {topAiring.map((anime: any) => (
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
            {recentEpisodes.map((anime: any) => (
              <RecentEpisodeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default Main;
