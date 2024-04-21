import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

const EpisodeContainer = ({ data }: any) => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex">
        <div className="">
          <div className="flex flex-wrap gap-2 items-center">
            {data.episodes.map((episodes: any) => (
              <Link shallow
                key={`episode-${data.id}-${episodes.number}`}
                href={`/watch/${data.id}?episode=${episodes.number}`}
              >
                <Button
                  color="primary"
                  variant="shadow"
                  key={episodes.id}
                  href={episodes.url}
                >
                  Episode {episodes.number}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeContainer;
