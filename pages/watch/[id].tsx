import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import EpisodeContainer from "@/components/EpisodeContainer";
import { Skeleton } from "@nextui-org/react";
import { useRouter } from "next/router";
import { url } from "@/config/url";

interface EpisodeDetails {
  id: number;
  title: string;
}

interface WatchDataSources {
  url: string;
  isM3U8: boolean;
  quality: string;
}

interface WatchData {
  sources: {
    url: string;
  }[];
}

const Watch = () => {
  const {
    query: { id, episode },
  } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [watchData, setWatchData] = useState<WatchData | null>(null);
  const [episodeDetails, setEpisodeDetails] = useState<EpisodeDetails | null>(
    null
  );

  const sleep = (ms:any) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const fetchDetails = useCallback(async () => {
    try {
      const episode_link = await axios.get(
        url.episode_link + id + "-episode-" + episode
      );
      const details_res = await axios.get(url.info + id);
      setWatchData(episode_link.data);
      setEpisodeDetails(details_res.data);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      await sleep(1000);
      setIsLoading(false);
    }
  }, [id, episode]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  if (!watchData) {
    return (
      <div className="max-w-3xl mx-auto px-4 pt-10 pb-4">
        {isLoading ? (
        <div className="flex flex-col items-center justify-center pb-5">
          </div>
      ) : (
        <div className="flex flex-col items-center justify-center pb-5">
          <div className="text-4xl font-bold mb-4">No Results Found</div>
          <div className="text-gray-500">Took a wrong turn?</div>
        </div>
      )}
        <Skeleton className="rounded-md">
          <iframe
            src={""}
            title="Embedded Video"
            width="100%"
            height="450"
            scrolling="no"
            allowFullScreen
            className="max-w-3xl mx-auto px-4 pt-10"
          ></iframe>
        </Skeleton>
      </div>
    );
  }
  const defaultSourceUrl = watchData.sources
    .map((value, index, array) => {
      const source = value as WatchDataSources;
      if (source.quality === "default") {
        return source.url;
      }
      return null;
    })
    .filter((url) => url !== null)[0];
  return (
    <div className="pb-96">
        <>
          <iframe
            src={
              "https://bharadwajpro.github.io/m3u8-player/player/#" +
              defaultSourceUrl
            }
            title="Embedded Video"
            width="100%"
            height="450"
            scrolling="no"
            allowFullScreen
            className="max-w-3xl mx-auto px-4 pt-10"
          ></iframe>
          <EpisodeContainer data={episodeDetails} />
        </>
    </div>
  );
};

export default Watch;
function wait(arg0: number) {
  throw new Error("Function not implemented.");
}

