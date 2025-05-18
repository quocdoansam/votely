import { useEffect, useState } from "react";
import getElectionContract from "../../lib/contract";
import { getSigner } from "../../lib/magic";
import ElectionOption from "./ElectionOption";
import { useParams } from "react-router-dom";
import { Election } from "../../types/Election";
import NotFoundPage from "../../pages/NotFoundPage";
import ElectionDetailSkeleton from "../skeleton/ElectionDetailSkeleton";
import Button from "../button/Button";

const ElectionDetail = () => {
  const { id } = useParams();
  const [election, setElection] = useState<Election | null>(null);

  useEffect(() => {
    const fetchElectionMetadata = async () => {
      if (!id) return;

      try {
        const signer = getSigner();
        const contract = getElectionContract(signer);
        const meta = await contract.getElectionMetadata(id);
        setElection({
          id,
          creator: meta.creator,
          title: meta.title,
          desc: meta.desc,
          isPrivate: meta.isPrivate,
          options: meta._options,
          startTime: new Date(Number(meta.startTIme) * 1000),
          endTime: new Date(Number(meta.endTime) * 1000),
        });
      } catch (error) {
        console.error("Failed to fetch election metadata:", error);
      }
    };

    fetchElectionMetadata();
  }, [id]);

  if (!id) return <NotFoundPage />;
  if (!election)
    return (
      <div className='max-w-5xl mx-auto'>
        <ElectionDetailSkeleton />
      </div>
    );

  return (
    <div className='max-w-5xl mt-6 rounded-2xl border-2 border-secondary mx-auto p-4'>
      <h1 className='text-xl md:text-2xl font-semibold'>{election.title}</h1>
      <span>{election.desc}</span>
      <form className='flex flex-col'>
        <div className='grid grid-cols-1 md:grid-cols-2 py-4 gap-4'>
          {Array.isArray(election.options) &&
            election.options.map((option, index) => (
              <div key={index}>
                <input
                  type='radio'
                  id={`opt${index}`}
                  name='voteOption'
                  value={option}
                  className='hidden peer'
                  required
                />
                <label
                  htmlFor={`opt${index}`}
                  className='inline-flex text-base font-bold items-center justify-between w-full p-5 text-gray-900 bg-white border-2 outline-primary border-secondary rounded-2xl cursor-pointer peer-checked:outline-2 peer-checked:text-primary outline-offset-4 transiton'
                >
                  {option}
                </label>
              </div>
            ))}
        </div>
        <Button
          variant='primary'
          size='md'
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ElectionDetail;
