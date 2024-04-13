import React from "react";
import Image from "next/image"; // will use when i have energy to fill the width and height

const DetailsContainer = ({ data }: any) => {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>Genres: {data.genres.join(", ")}</p>
      <img src={data.image} alt="Anime Cover" />
    </div>
  );
};

export default DetailsContainer;
