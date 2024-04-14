import axios from "axios";
import { url } from "@/config/url";
import DetailsContainer from "@/components/DetailsContainer";
import EpisodeContainer from "@/components/EpisodeContainer";

const Info = ({ data }: any) => {
  return (
    // <>
    <div className="pb-96">
      <DetailsContainer data={data} />
      <EpisodeContainer key={data.id} data={data} />
    </div>
    // </>
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
