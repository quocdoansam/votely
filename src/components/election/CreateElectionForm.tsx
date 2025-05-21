import { useState } from "react";
import Input from "../input/Input";
import { useResponsive } from "../../hooks/useResponsive";
import Button from "../button/Button";
import { X } from "lucide-react";
import InputGroup from "../input/InputGroup";
import Checkbox from "../input/Checkbox";
import Alert from "../Alert";
import getElectionContract from "../../lib/contract";
import { getSigner } from "../../lib/magic";

const CreateElectionForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { isMobile } = useResponsive();

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) return;
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !desc || options.some((o) => !o) || !startTime || !endTime) {
      setError("All fields are required and options must be filled.");
      return;
    }

    setLoading(true);
    try {
      const signer = getSigner();
      const contract = getElectionContract(signer);

      const startTimestamp = Math.floor(new Date(startTime).getTime() / 1000);
      const endTimestamp = Math.floor(new Date(endTime).getTime() / 1000);

      if (startTimestamp >= endTimestamp) {
        setError("Start time must be before end time.");
        setLoading(false);
        return;
      }

      const tx = await contract.createElection(
        startTimestamp,
        endTimestamp,
        title,
        desc,
        options
      );

      await tx.wait();
      setSuccess("Election Created Successfully.");
    } catch (err: any) {
      console.log(err);
      setError("Failed to create election.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='flex flex-col py-6'>
        <h1 className='text-2xl font-semibold'>Create an election</h1>
        <h2 className=''>Please follow the terms and community standards.</h2>
      </div>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <Input
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder='Description'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className='outline-none border-2 border-secondary rounded-xl p-2 bg-secondary focus:border-primary'
        />
        <div>
          <label className='font-medium'>Options</label>
          <div
            className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}
          >
            {options.map((opt, idx) => (
              <div className='flex gap-2' key={idx}>
                <Input
                  placeholder={`Option ${idx + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  className='grow'
                />
                {options.length > 2 && (
                  <Button
                    variant='danger'
                    size='icon'
                    onClick={() => handleRemoveOption(idx)}
                    className='text-red-500'
                  >
                    <X />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant='outline'
              size='md'
              type='button'
              onClick={handleAddOption}
            >
              Add Option
            </Button>
          </div>
        </div>

        <div
          className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}
        >
          <InputGroup>
            <label htmlFor='startTime' className='font-medium'>
              Start Time
            </label>
            <Input
              id='startTime'
              type='datetime-local'
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor='endTime' className='font-medium'>
              End Time
            </label>
            <Input
              id='endTime'
              type='datetime-local'
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className='border border-secondary rounded p-2'
            />
          </InputGroup>
        </div>
        <InputGroup direction='horizontal'>
          <Checkbox
            id='checkbox'
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
          <label htmlFor='checkbox' className='text-sm'>
            Anyone can join this election.
          </label>
        </InputGroup>

        {error && <Alert variant='danger'>{error}</Alert>}
        {success && <Alert variant='success'>{success}</Alert>}

        <Button disabled={isLoading} variant='primary' size='md' type='submit'>
          {isLoading ? "Creating..." : "Create Election"}
        </Button>
      </form>
    </div>
  );
};

export default CreateElectionForm;
