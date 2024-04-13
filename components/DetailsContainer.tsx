import React from "react";

const DetailsContainer = ({ data }: any) => {
  console.log(data);

  return (
    <div>
      <h1>{data.title}</h1>
      <p>Genres: {data.genres.join(", ")}</p>
      <img src={data.image} alt="Anime Cover" />
    </div>
  );
};

export default DetailsContainer;
