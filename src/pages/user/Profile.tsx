import Input from "../../components/input/Input";
import InputGroup from "../../components/input/InputGroup";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div className='mt-4'>
      <h1 className='text-2xl font-semibold'>Profile</h1>
      <div className='flex flex-col md:flex-row gap-4 py-6 items-center md:justify-between md:gap-10'>
        <img
          src={user?.avatarUrl}
          alt='Avatar'
          className='w-32 h-32 md:w-40 md:h-40 rounded-full bg-white border-2 border-primary'
        />
        <div className='flex flex-col gap-4 grow'>
          <InputGroup className='w-full'>
            <label htmlFor='name'>Name</label>
            <Input value={user?.name} className='w-full' />
          </InputGroup>
          <InputGroup>
            <label htmlFor='email'>Email</label>
            <Input value={user?.email} />
          </InputGroup>
          <InputGroup>
            <label htmlFor='wallet'>Wallet Address</label>
            <Input value={user?.walletAddress} />
          </InputGroup>
        </div>
      </div>
    </div>
  );
};

export default Profile;
