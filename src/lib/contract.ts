import { ethers } from "ethers";
import ElectionABI from "../abi/Election.json";

const CONTRACT_ADDRESS = "0x73Da440E88BFE68465c60c4F2A9aAb79Cd7871BF";

const getElectionContract = (
  providerOrSigner: ethers.providers.Provider | ethers.Signer
) => {
  return new ethers.Contract(CONTRACT_ADDRESS, ElectionABI, providerOrSigner);
};

export default getElectionContract;
