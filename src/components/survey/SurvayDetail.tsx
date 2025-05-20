import { useEffect, useState } from "react";
import getElectionContract from "../../lib/contract";
import { getSigner } from "../../lib/magic";
import { useParams } from "react-router-dom";
import { Election } from "../../types/Election";
import NotFoundPage from "../../pages/NotFoundPage";
import ElectionDetailSkeleton from "../skeleton/ElectionDetailSkeleton";
import Button from "../button/Button";
import { Copy, CopyCheckIcon, Share2 } from "lucide-react";
import Input from "../input/Input";

const SurveyDetails = () => {
  const { id } = useParams();
  const [election, setElection] = useState<Election | null>(null);
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
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
    <div className='px-2 pt-2 pb-6'>
      <div className='flex flex-col gap-2 pb-5'>
        <h1 className='text-xl md:text-2xl font-semibold'>{election.title}</h1>
        <span>{election.desc}</span>
      </div>
      <form className='flex flex-col'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
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
                  className='inline-flex text-base font-bold items-center justify-between w-full px-5 py-2 text-gray-900 bg-white border-2 outline-primary border-secondary rounded-2xl cursor-pointer peer-checked:outline-2 peer-checked:text-primary outline-offset-3 transiton'
                >
                  {option}
                </label>
              </div>
            ))}
        </div>
        <div className='flex flex-row py-10 gap-4'>
          <Button
            variant='primary'
            size='md'
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            Submit
          </Button>
          <Button
            variant='secondary'
            size='md'
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            View Results
          </Button>
        </div>
      </form>
      <div className='flex bg-secondary/50 flex-col p-4 rounded-xl items-start gap-4'>
        <div className='flex flex-row gap-2'>
          <Share2 size={24} />
          <span className='font-semibold'>Share</span>
        </div>
        <div className='flex gap-2 w-full'>
          <Input
            id='share'
            value={window.location.href}
            readOnly
            className='w-full'
          />
          <Button variant='secondary' size='icon' onClick={handleCopy}>
            {copied ? <CopyCheckIcon /> : <Copy />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetails;
