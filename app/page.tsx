import Card from "./component/Card/Card";
import ChallengeItem from "./component/ChallengeItem";

export default function Home() {
  
  return (
    <main
    className="flex flex-col gap-8 max-w-[1258px] align-middle mx-auto p-6 sm:w-full"
    >
      <h1>Welcome to FaithStep</h1>
      <Card
      title="Daily Step"
      className='bg-[#10B981]' >
        <div id="verse-content" className="verse-container"></div>
        <div className="font-semibold text-xl">“For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life”</div>
        <span className="text-[18px] font-semibold text-black/70 flex justify-end">-John 3:16</span>
      </Card>
      
      <ChallengeItem/>
      
    </main>
  );
}
