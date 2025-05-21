import { useState } from "react";
import { useParams } from "react-router-dom";
import getElectionContract from "../../lib/contract";
import { getSigner } from "../../lib/magic";
import ElectionDetailSkeleton from "../skeleton/ElectionDetailSkeleton";
import Button from "../button/Button";
import { Share2 } from "lucide-react";
import Alert from "../Alert";
import { useAuth } from "../../contexts/AuthContext";
import Error404 from "../../pages/errors/Error404";
import CopyInput from "../input/CopyInput";
import useSurveyMetadata from "../../hooks/useSurveyMetadata";

const SurveyDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const signer = getSigner();
  const contract = getElectionContract(signer);
  const { survey, loading } = useSurveyMetadata(id || "");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (selectedOption === null) {
      setError("Please, choose at least 1 option.");
      return;
    }

    setLoading(true);

    try {
      if (!user?.walletAddress) {
        setError("You need to log in to vote.");
        return;
      }

      const hasVoted = await contract.hasVoted(id, user.walletAddress);
      if (hasVoted) {
        setError("You have already voted.");
        return;
      }

      const voteTx = await contract.vote(id, selectedOption);
      await voteTx.wait();
      setSuccess("Voted successfully.");
    } catch (err) {
      console.error("Voting error:", err);
      setError("Vote failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='max-w-5xl mx-auto'>
        <ElectionDetailSkeleton />
      </div>
    );
  }

  if (!id || !survey) return <Error404 />;

  return (
    <div className='max-w-xl mx-auto px-2 pt-2 pb-6'>
      <div className='flex flex-col gap-2 pb-5'>
        <h1 className='text-xl md:text-2xl font-semibold'>{survey.title}</h1>
        <span>{survey.desc}</span>
      </div>

      <form className='flex flex-col' onSubmit={handleVote}>
        <div className='grid grid-cols-1 gap-4'>
          {survey.options.map((option, index) => (
            <div key={index}>
              <input
                type='radio'
                id={`opt${index}`}
                name='voteOption'
                value={index}
                className='hidden peer'
                onChange={() => setSelectedOption(index)}
              />
              <label
                htmlFor={`opt${index}`}
                className='inline-flex text-base font-bold items-center justify-between w-full px-5 py-2 text-gray-900 bg-white border-2 outline-primary border-secondary rounded-2xl cursor-pointer peer-checked:outline-2 peer-checked:text-primary outline-offset-3 transition'
              >
                {option}
              </label>
            </div>
          ))}
        </div>

        {error && (
          <Alert variant='danger' className='mt-6'>
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant='success' className='mt-6'>
            {success}
          </Alert>
        )}

        <div className='flex flex-row py-10 gap-4'>
          <Button
            type='submit'
            variant='primary'
            size='md'
            disabled={isLoading}
          >
            {isLoading ? "Wait ..." : "Vote"}
          </Button>
          <Button type='button' variant='secondary' size='md'>
            View Results
          </Button>
        </div>
      </form>

      <div className='flex bg-secondary/50 flex-col p-4 rounded-xl items-start gap-4'>
        <div className='flex flex-row gap-2'>
          <Share2 size={24} />
          <span className='font-semibold'>Share</span>
        </div>
        <CopyInput value={window.location.href} />
      </div>
    </div>
  );
};

export default SurveyDetails;
