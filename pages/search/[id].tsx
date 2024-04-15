import axios from "axios";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/react";
import { url } from "@/config/url";
import AnimeCard from '@/components/AnimeCard'

const Info = ({ data }: any) => {
  return (
    <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 pt-16	sm:grid-cols-5 md:grid-cols-5 pb-16">
      {data.map((anime: any) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
};


export async function getServerSideProps(context: any) {
  const {
    query: { id },
  } = context;

  try {
    const search_res = await axios.get(url.search + id);
    const data = search_res.data.results;
    console.log(data)

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
