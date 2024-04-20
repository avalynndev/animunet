import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { url } from "@/config/url";
import AnimeCard from "@/components/AnimeCard";
import { useRouter } from "next/router";

const Info = () => {
  const {
    query: { id },
  } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [search_results, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const search = await axios.get(url.search + id);
        setSearchResults(search.data.results);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, []);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 pt-16	sm:grid-cols-5 md:grid-cols-5 pb-16">
          {search_results.map((anime: any) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
    </>
  );
};

export default Info;
