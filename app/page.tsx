import Link from "next/link";
import Card from "./component/Card/Card";
import ChallengeItem from "./component/ChallengeItem";
import GratitudeCard from "./component/GratitudeCard";
// import { getBibleTranslation } from "@/server/api/get";


export default function Home() {

  // console.log('home page rendered', getBibleTranslation())
  
  return (
    <>
      <Card
      title="Daily Step"
      className='bg-[#10B981] gap-[10px] flex flex-col' >
        <div id="verse-content" className="verse-container"></div>
        <div className="font-semibold text-xl lg:w-4/5 sm:w-full">“For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life”</div>
        <span className="text-[18px] font-semibold text-black/70 ">-John 3:16</span>
      </Card>
    
      <ChallengeItem/>

      <section>
        <div className='flex justify-between items-center'>
          <h1>Gratitude Post</h1>
        <Link href='#'>View more</Link>
        </div>
        <div className="flex justify-between gap-5"><GratitudeCard
        content="Feeling grateful today for God’s faithfulness. Even in the smallest moments, He shows His love in ways I don’t deserve. Thank You, Lord, for Your goodness that carries me through every season. 🙏✨"
        reactionCount = '1.5K'
        />
        <GratitudeCard
        content="Feeling grateful today for God’s faithfulness. Even in the smallest moments, He shows His love in ways I don’t deserve. Thank You, Lord, for Your goodness that carries me through every season. 🙏✨"
        reactionCount = '1.5K'
        />
        <GratitudeCard
        content="Feeling grateful today for God’s faithfulness. Even in the smallest moments, He shows His love in ways I don’t deserve. Thank You, Lord, for Your goodness that carries me through every season. 🙏✨"
        reactionCount = '1.5K'
        />
        </div>
      </section>
      
    </>
  );
}
