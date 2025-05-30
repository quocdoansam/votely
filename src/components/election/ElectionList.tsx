import { useEffect, useState } from "react";
import { ElectionStatus } from "../../types/ElectionStatus";
import { Survey } from "../../types/Survey";
import { getSigner } from "../../lib/magic";
import getElectionContract from "../../lib/contract";
import ElectionCardSkeleton from "../skeleton/ElectionCardSkeleton";
import SurveyCard from "../survey/SurvayCard";

const ElectionList = ({ status }: { status: ElectionStatus }) => {
  const [elections, setElections] = useState<Survey[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchElections = async () => {
      setLoading(true);
      try {
        const signer = getSigner();
        const contract = getElectionContract(signer);

        const electionIds: string[] = await contract.getElectionsByState(
          status
        );

        const electionsData = await Promise.all(
          electionIds.map(async (id: string) => {
            const meta = await contract.getElectionMetadata(id);
            return {
              id,
              creator: meta.creator,
              title: meta.title,
              desc: meta.desc,
              isPrivate: meta.isPrivate,
              options: meta._options,
              startTime: new Date(Number(meta.startTime) * 1000),
              endTime: new Date(Number(meta.endTime) * 1000),
              createdAt: new Date(Number(meta.createdAt) * 1000),
            } as Survey;
          })
        );

        setElections(electionsData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách election:", error);
        setElections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchElections();
  }, [status]);

  if (loading)
    return (
      <p className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-4'>
        <ElectionCardSkeleton />
        <ElectionCardSkeleton />
        <ElectionCardSkeleton />
        <ElectionCardSkeleton />
        <ElectionCardSkeleton />
        <ElectionCardSkeleton />
      </p>
    );
  if (elections.length === 0)
    return <p className='mx-auto'>No election yet.</p>;

  return (
    <div className='columns-1 md:columns-2 lg:columns-3 gap-4'>
      {elections.map((election) => (
        <div key={election.id} className='break-inside-avoid mb-4'>
          <SurveyCard survey={election} />
        </div>
      ))}
    </div>
  );
};

export default ElectionList;
