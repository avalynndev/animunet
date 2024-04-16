import React, { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@nextui-org/react";
import { url } from "@/config/url";
import DetailsContainer from "@/components/DetailsContainer";
import EpisodeContainer from "@/components/EpisodeContainer";

const Info = ({ data }: any) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetching delay with setTimeout
    const timer = setTimeout(() => {
      setIsLoading(false); // Turn off the loading state
    }, 3000); // Simulate a 3-second delay (replace this with actual data fetching)

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="pb-96">
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
        <DetailsContainer data={data} />
      )}
      <EpisodeContainer data={data} />
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const {
    query: { id },
  } = context;

  try {
    const details_res = await axios.get(url.info + id);
    const data = details_res.data;

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error fetching details:", error);
    return {
      props: {
        data: null, // or handle error as needed
      },
    };
  }
}

export default Info;
