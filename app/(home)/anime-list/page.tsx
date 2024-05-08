"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Spinner } from "@nextui-org/react";
import { url } from "@/config/url";
import AnimeCard from "@/components/AnimeCard";
import axios from "axios";
import Image from "next/image";

const Anime_List = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [search_results, setSearchResults] = useState<any[]>([]);

  const fetchDetails = async () => {
    try {
      const search = await axios.get(url.anime_list);
      setSearchResults(search.data.results);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);
  return (
    <div className="text-center max-w mx-auto px-6 pb-3">
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
            {search_results.length === 0 ? (
              <div className="flex flex-col text-center items-center justify-center h-screen">
                <div className="text-4xl font-bold mb-4">No Results Found</div>
                <div className="text-gray-500 ">
                  Try adjusting your search criteria or check your spelling.
                </div>
              </div>
            ) : (
              <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 pt-16 sm:grid-cols-5 md:grid-cols-5 ">
                {search_results.map((anime: any) => (
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

export default Anime_List;
