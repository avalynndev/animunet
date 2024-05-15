"use client";
import { Button, Spinner } from "@nextui-org/react";
import React, { useState, useEffect, useCallback } from "react";
import { url } from "@/config/url";
import axios from "axios";
import Link from "next/link";

const Genre = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState<any[]>([]);

  const fetchDetails = useCallback(async () => {
    try {
      const genre = await axios.get(url.genre + "/" + "list");
      setGenres(genre.data);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const getRandomColor = ():
    | "secondary"
    | "primary"
    | "success"
    | "danger"
    | "warning" => {
    const colors: (
      | "secondary"
      | "primary"
      | "success"
      | "danger"
      | "warning"
    )[] = ["primary", "secondary", "success", "danger", "warning"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col text-center items-center justify-center">
        <div className="text-4xl font-bold mb-4">Genres</div>
        <div className="text-gray-500 pb-16">
          Here&apos;s a diverse list of genres spanning different forms.
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center">
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
          <div className="max-w-5xl mx-auto">
            {genres.map((genre) => (
              <Link
                href={`/genre/${genre.id.toLowerCase().replace(/ /g, "-")}`}
                key={genre.id}
              >
                <Button
                  variant="bordered"
                  key={genre.id}
                  id={genre.id}
                  color={getRandomColor()}
                  size="md"
                  className="mt-1 mr-1"
                >
                  {genre.title}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Genre;
