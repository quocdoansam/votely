import { useEffect, useState } from "react";
import getElectionContract from "../../lib/contract";
import { getSigner } from "../../lib/magic";
import { Election } from "../../types/Election";
import { Timer, TimerOff } from "lucide-react";

const ElectionCard = ({ election }: { election: Election }) => {
  const [results, setResults] = useState<number[] | null>(null);

  async function getResult() {
    const contract = getElectionContract(getSigner());
    const result = await contract.getResults(election.id);
    setResults(result.map((r: any) => Number(r)));
  }

  useEffect(() => {
    getResult();
  }, []);

  return (
    <a
      href={`/elections/${election.id}`}
      className='bg-white border-2 border-secondary flex flex-col p-4 rounded-2xl hover:border-primary active:scale-95 transition gap-4'
    >
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-bold'>{election.title}</h1>
        <span className='text-base'>{election.desc}</span>
      </div>

      <div className='flex flex-col gap-2'>
        {election.options.map((option, index) => (
          <div key={index} className='flex flex-row gap-2'>
            {option}
            {results && (
              <span className='ml-2 text-sm text-gray-500'>
                ({results[index]} votes)
              </span>
            )}
          </div>
        ))}
      </div>

      <p className='flex flex-col text-sm mt-1 gap-2'>
        <div className='flex items-center gap-3'>
          <Timer />
          {election.startTime.toLocaleString()}
        </div>
        <div className='flex items-center gap-3'>
          <TimerOff />
          {election.endTime.toLocaleString()}
        </div>
      </p>
      <div className='overflow-clip text-ellipsis whitespace-nowrap rounded-xl bg-secondary p-2'>
        by {election.creator}
      </div>
    </a>
  );
};

export default ElectionCard;
