"use client";
import axios from "axios";
import {
  Card,
  CardFooter,
  CardBody,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
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

const AnimeHistoryItem = ({ animeHistory }: any) => {
  return (
    <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-7 gap-4">
      {animeHistory.map((item: any, index: any) => (
        <div key={index}>
          <Link
            shallow
            href={`/watch/${item.id}/${item.episode_number
              .toString()
              .replace(/\./g, "-")}`}
          >
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
      return JSON.parse(localStorage.getItem("watchHistory") || "");
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
   <section className=" items-center">
     <div className="max-w-7xl text-center max-w mx-auto px-6 pb-3">
       <h2 className="text-4xl font-bold mb-4 py-4 font-mono">
         CONTINUE WATCHING
       </h2>
       <Suspense fallback={<Spinner color="success" size="lg" />}>
         {isLoading ? (
           <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-7 gap-4">
             {Array.from({ length: 7 }, (_, index) => (
               <Card
                 isPressable
                 className="border-none bg-none flex flex-col justify-center items-center"
                 key={index}
               >
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
                   <Skeleton className="rounded-md text-center w-max w-full" />
                 </CardFooter>
               </Card>
             ))}
           </div>
         ) : (
           <div>
             {localItems.AnimeHistory != null && (
               <AnimeHistoryItem animeHistory={localItems.AnimeHistory} />
             )}
             {localItems.AnimeHistory == null && (
               <div className="flex flex-col justify-center items-center">
                 <div className="text-gray-500">
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
           <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-7 gap-4">
             {Array.from({ length: 14 }, (_, index) => (
               <Card
                 isPressable
                 className="border-none bg-none flex flex-col justify-center items-center"
                 key={index}
               >
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
                   <Skeleton className="rounded-md text-center w-max w-full" />
                 </CardFooter>
               </Card>
             ))}
           </div>
         ) : (
           <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-7 gap-4">
             {topAiring.map((anime: any) => (
               <AnimeCard key={anime.id} anime={anime} />
             ))}
           </div>
         )}
       </Suspense>
       <Suspense fallback={<Spinner color="success" size="lg" />}>
         <h2 className="text-4xl font-bold mb-4 py-4 font-mono">POPULAR</h2>
         {isLoading ? (
           <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-7 gap-4">
             {Array.from({ length: 21 }, (_, index) => (
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
                   <Skeleton className="rounded-md text-center w-max w-full" />
                 </CardFooter>
               </Card>
             ))}
           </div>
         ) : (
           <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-7 gap-4">
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
           <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-7 gap-4">
             {Array.from({ length: 21 }, (_, index) => (
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
                   <Skeleton className="rounded-md text-center w-max w-full" />
                 </CardFooter>
               </Card>
             ))}
           </div>
         ) : (
           <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-7 gap-4">
             {recentEpisodes.map((anime: any) => (
               <RecentEpisodeCard key={anime.id} anime={anime} />
             ))}
           </div>
         )}
       </Suspense>
     </div>
   </section>
 );
};

export default Main;
