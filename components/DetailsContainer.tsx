import React from "react";
import Image from "next/image"; 

const DetailsContainer = ({ data }: any) => {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>Genres: {data.genres.join(", ")}</p>
      <Image src={data.image} height={250} width={270} alt="Anime Cover" />
    </div>
  );
};

export default DetailsContainer;
