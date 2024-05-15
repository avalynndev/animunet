"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { Spinner } from "@nextui-org/react";
import { url } from "@/config/url";
import AnimeCard from "@/components/AnimeCard";
import axios from "axios";
import Image from "next/image";

const Anime_List = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [anime_list, setAnimeResults] = useState<any[]>([]);

  const fetchDetails = useCallback(async () => {
    try {
      const list = await axios.get(url.anime_list);
      setAnimeResults(list.data.results);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setIsLoading(false);
    }
  },[]);

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
              <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-7 gap-4">
                {anime_list.map((anime: any) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default Anime_List;
