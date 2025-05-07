import { Election } from "@/types/Election";
import { ElectionStatus } from "@/types/ElectionStatus";
import { useEffect, useState } from "react";

const ElectionList = ({ status }: { status: ElectionStatus }) => {
  const [elections, setElections] = useState<Election[]>([]);

  useEffect(() => {}, []);
  return;
};

export default ElectionList;
