import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { CirclePlus, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const CreateElectionForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    if (!title || !desc || options.some((o) => !o) || !startTime || !endTime) {
      setError("These field is required.");
      return;
    }
  };

  return (
    <div className='space-y-5 max-w-2xl flex flex-col mx-auto'>
      <h1 className='text-2xl font-semibold'>CREATE AN ELECTION</h1>

      <div className='grid gap-2'>
        <Label htmlFor='title'>Title</Label>
        <Input
          id='title'
          type='text'
          placeholder='Type title here'
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className='grid gap-2'>
        <Label htmlFor='desc'>Description</Label>
        <Textarea
          placeholder='Type description here.'
          id='desc'
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      {options.map((opt, i) => (
        <div className='flex flex-row gap-2'>
          <Input
            key={i}
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(i, e.target.value)}
            translate='yes'
          />
          <Button
            disabled={options.length <= 2}
            size='icon'
            variant='destructive'
            onClick={() => handleRemoveOption(i)}
          >
            <X />
          </Button>
        </div>
      ))}
      <Button
        variant={"secondary"}
        onClick={() => setOptions([...options, ""])}
      >
        <CirclePlus /> Add option
      </Button>

      <div className='grid gap-2'>
        <Label htmlFor='start'>Start time</Label>
        <Input
          id='start'
          type='datetime-local'
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='end'>End time</Label>
        <Input
          id='end'
          type='datetime-local'
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>

      <label>
        <input
          type='checkbox'
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
        />{" "}
        Bầu cử riêng tư
      </label>
      <div className='items-top flex space-x-2'>
        <Checkbox id='terms1' />
        <div className='grid gap-1.5 leading-none'>
          <label
            htmlFor='terms1'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Accept terms and conditions
          </label>
          <p className='text-sm text-muted-foreground'>
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Đang tạo..." : "Tạo bầu cử"}
      </Button>
    </div>
  );
};

export default CreateElectionForm;
