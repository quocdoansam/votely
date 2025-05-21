import { CopyCheckIcon, Copy } from "lucide-react";
import { useState } from "react";
import Button from "../button/Button";
import Input from "./Input";

const CopyInput = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className='flex gap-2 w-full'>
      <Input id='share' value={value} readOnly className='w-full' />
      <Button variant='secondary' size='icon' onClick={handleCopy}>
        {copied ? <CopyCheckIcon /> : <Copy />}
      </Button>
    </div>
  );
};

export default CopyInput;
