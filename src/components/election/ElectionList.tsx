import { useEffect, useState } from "react";
import { ElectionStatus } from "../../types/ElectionStatus";
import { Election } from "../../types/Election";

const ElectionList = ({ status }: { status: ElectionStatus }) => {
  const [elections, setElections] = useState<Election[]>([]);

  useEffect(() => {}, []);
  return;
};

export default ElectionList;
