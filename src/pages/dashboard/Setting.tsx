import { Pen } from "lucide-react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import InputGroup from "../../components/input/InputGroup";
import { useAuth } from "../../contexts/AuthContext";

const Setting = () => {
  const { user } = useAuth();

  return (
    <div className='flex flex-col mt-4'>
      <h1 className='text-xl md:text-2xl font-semibold'>Settings</h1>
      <div className='flex w-full mt-10'>
        <div className='flex flex-col gap-2 p-2 w-full'>
          <h2 className='text-base md:text-xl font-semibold'>Profile</h2>
          <div className='flex flex-col py-2 gap-4'>
            <div className='flex w-full items-end justify-between'>
              <InputGroup>
                <label htmlFor='id'>Name</label>
                <Input
                  id='id'
                  readOnly
                  className='h-10 w-full'
                  value={user?.name}
                />
              </InputGroup>
              <Button size='icon' variant='secondary'>
                <Pen />
              </Button>
            </div>
            <div className='flex w-full items-end justify-between'>
              <InputGroup>
                <label htmlFor='id'>Email</label>
                <Input
                  id='id'
                  readOnly
                  className='h-10 w-full'
                  value={user?.email}
                />
              </InputGroup>
              <Button size='icon' variant='secondary'>
                <Pen />
              </Button>
            </div>
            <div className='flex w-full items-end justify-between'>
              <InputGroup>
                <label htmlFor='id'>Avatar</label>
                <Input
                  id='id'
                  readOnly
                  className='h-10 w-full'
                  value={user?.avatarUrl}
                />
              </InputGroup>
              <Button size='icon' variant='secondary'>
                <Pen />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
