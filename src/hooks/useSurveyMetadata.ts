import { useEffect, useState } from "react";
import getElectionContract from "../lib/contract";
import { getSigner } from "../lib/magic";
import { Survey } from "../types/Survey";

const useSurveyMetadata = (id: string) => {
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const signer = await getSigner();
      const contract = getElectionContract(signer);
      const meta = await contract.getElectionMetadata(id);
      setSurvey({
        id,
        creator: meta.creator,
        title: meta.title,
        desc: meta.desc,
        options: meta._options,
        startTime: new Date(Number(meta.startTIme) * 1000),
        endTime: new Date(Number(meta.endTime) * 1000),
        createdAt: new Date(Number(meta.createdAt) * 1000),
      });
      setLoading(false);
    };
    fetch();
  }, [id]);

  return { survey, loading };
};

export default useSurveyMetadata;
