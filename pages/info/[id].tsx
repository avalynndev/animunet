import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Skeleton } from "@nextui-org/react";
import { url } from "@/config/url";
import DetailsContainer from "@/components/DetailsContainer";
import EpisodeContainer from "@/components/EpisodeContainer";
import { useRouter } from "next/router";

const Info = () => {
  const {
    query: { id },
  } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>();

  const fetchDetails = useCallback(async () => {
    try {
      const response = await axios.get(url.info + id);
      setData(response.data);
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
    <div className="h-screen">
      {isLoading ? (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto flex">
            <div className="w-2/3 pr-4">
              <Skeleton>
                <h1 className="text-3xl font-semibold">x</h1>
              </Skeleton>
              <Skeleton>
                <p className="mt-2">
                  <strong>Genres:</strong>xxx
                </p>
              </Skeleton>
              <Skeleton>
                <p className="mt-2">
                  <strong>Total Episodes:</strong>xx
                </p>
              </Skeleton>
              <Skeleton>
                <p className="mt-2">
                  <strong>Release Date:</strong>xxxx
                </p>
              </Skeleton>
              <Skeleton>
                <p className="mt-2">
                  <strong>Description:</strong>
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                </p>
              </Skeleton>
            </div>{" "}
            <Skeleton>
              <div className="w-1/3">
                <div
                  className="rounded-lg overflow-hidden bg-white shadow-md"
                  style={{ width: "250px" }}
                >
                  <div className="relative h-96">
                    <img
                      src={"none"}
                      alt="Anime Cover"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>
            </Skeleton>
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
    </div>
  );
};

export default Info;
