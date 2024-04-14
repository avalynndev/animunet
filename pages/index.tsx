import axios from "axios";
import { Suspense } from "react";
import AnimeCard from "@/components/AnimeCard";
import { url } from "@/config/url";
import Loading from "@/components/Loading";

const Main = ({ top_airing, popular }: any) => {
  return (
    <div className="max-w mx-auto px-6">
      <h1 className="text-4xl font-bold mb-4 py-4">Top Airing</h1>
      <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 sm:grid-cols-5 md:grid-cols-5 pb-4">
        <Suspense fallback={<Loading/>}>
          {top_airing.map((anime: any) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </Suspense>
      </div>
      <h1 className="text-4xl font-bold mb-4 py-4">Popular</h1>
      <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 sm:grid-cols-5 md:grid-cols-5 pb-4">
        <Suspense fallback={<Loading/>}>
          {popular.map((anime: any) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const top_airing_res = await axios.get(url.top_airing);
  const popular_res = await axios.get(url.popular);
  const top_airing = top_airing_res.data.results;
  const popular = popular_res.data.results;

  return {
    props: {
      top_airing,
      popular,
    },
  };
}

export default Main;
