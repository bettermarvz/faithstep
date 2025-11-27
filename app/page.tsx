import Card from "./component/Card/Card";
import ChallengeItem from "./component/ChallengeItem";

export default function Home() {
  
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
      
    </>
  );
}
