import axios from "axios";

import AnimeCard from '../components/AnimeCard'

const TopAiring = ({ top_airing, popular }: any) => {
  
  return (
    <div>
      <h1>Top-Airing</h1>
      <div className="gap-2 grid grid-cols-2 lg:grid-cols-10 sm:grid-cols-5 md:grid-cols-7">
        {top_airing.map((anime: any) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
      <h1>Popular</h1>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-10">
        {popular.map((anime: any) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const top_airing_res = await axios.get(
    "https://animetize-api.vercel.app/anime/gogoanime/top-airing"
  );

  const popular_res = await axios.get(
    "https://animetize-api.vercel.app/anime/gogoanime/popular"
  );
  
  const top_airing = top_airing_res.data.results;
  const popular = popular_res.data.results;

  return {
    props: {
      top_airing,
      popular,
    },
  };
}

export default TopAiring;
