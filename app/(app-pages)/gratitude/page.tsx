import { getGratitudes } from "@/features/gratitudes/api";
import GratitudeEditor from "@/features/gratitudes/components/GratitudeEditor";
import GratitudeWall from "@/features/gratitudes/components/GratitudeWall";
import React, { use } from "react";

const Gratitude = () => {
  const grat = use(getGratitudes()); // server

  console.log(grat, "Hello 111111111");

  // const [gratitude, setGratitude] = useState()
  // useEffect(() => {
  //   const fetch = async () => {
  //     const res = await getGratitudes();
  //     setGratitude(res)
  //   };

  //   fetch();
  //   return () => {};
  // }, []);

  return (
    <div>
      <div className="w-full flex flex-col items-center gap-10 mt-[115px]">
        <div className="flex justify-center flex-col gap-3">
          <h1 className="text-2xl font-bold text-center">
            Share Your Gratitude 🙏
          </h1>
          <p className="text-[14px] text-center">
            What are you thankful for today?
          </p>
        </div>
        <GratitudeEditor charLimit={280} />
        <GratitudeWall />
      </div>
    </div>
  );
};

export default Gratitude;
