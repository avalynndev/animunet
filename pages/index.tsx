import axios from "axios";
import AnimeCard from "@/components/AnimeCard";
import { url } from "@/config/url";

const Main = ({ top_airing, popular }: any) => {
  return (
    <div className="max-w mx-auto px-6">
      <h1 className="text-4xl font-bold mb-4 py-4">Top Airing</h1>
      <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 sm:grid-cols-5 md:grid-cols-5 pb-4">
          {top_airing.map((anime: any) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
      </div>
      <h1 className="text-4xl font-bold mb-4 py-4">Popular</h1>
      <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 sm:grid-cols-5 md:grid-cols-5 pb-4">
        {popular.map((anime: any) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  let top_airing = [];
  let popular = [];

  try {
    const [top_airing_res, popular_res] = await Promise.all([
      axios.get(url.top_airing),
      axios.get(url.popular),
    ]);
    top_airing = top_airing_res.data.results;
    popular = popular_res.data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return {
    props: {
      top_airing,
      popular,
    },
  };
}

export default Main;
