import { Survey } from "../../types/Survey";
import { ClockPlus, Timer, TimerOff } from "lucide-react";
import { Link } from "react-router-dom";

const SurveyCard = ({ survey: survey }: { survey: Survey }) => {
  // const [results, setResults] = useState<number[] | null>(null);

  // async function getResult() {
  //   const contract = getElectionContract(getSigner());
  //   const result = await contract.getResults(election.id);
  //   setResults(result.map((r: any) => Number(r)));
  // }

  // useEffect(() => {
  //   getResult();
  // }, []);

  return (
    <Link
      to={`/surveys/${survey.id}`}
      className='bg-white border-2 border-secondary flex flex-col p-4 rounded-2xl hover:border-primary active:scale-95 transition gap-4'
    >
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-bold'>{survey.title}</h1>
        <span className='text-base'>{survey.desc}</span>
      </div>
      <p className='flex flex-col text-sm mt-1 gap-2'>
        <div className='flex items-center gap-3'>
          <Timer />
          {survey.startTime.toLocaleString()}
        </div>
        <div className='flex items-center gap-3'>
          <TimerOff />
          {survey.endTime.toLocaleString()}
        </div>
        <div className='flex items-center gap-3'>
          <ClockPlus />
          {survey.createdAt.toLocaleString()}
        </div>
      </p>
    </Link>
  );
};

export default SurveyCard;
