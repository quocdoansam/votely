import { ethers } from "ethers";
import ElectionABI from "../abi/Election.json";

const CONTRACT_ADDRESS = "0xceFA7E3a79a00D83B7DBb1eE174d014D50486fcC";

const getElectionContract = (
  providerOrSigner: ethers.providers.Provider | ethers.Signer
) => {
  return new ethers.Contract(CONTRACT_ADDRESS, ElectionABI, providerOrSigner);
};

export default getElectionContract;
