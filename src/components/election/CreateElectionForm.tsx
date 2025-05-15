// import { useEffect, useState } from "react";

// const CreateElectionForm = () => {
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [options, setOptions] = useState(["", ""]);
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [isPrivate, setIsPrivate] = useState(false);
//   const [isLoading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleOptionChange = (index: number, value: string) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   const handleRemoveOption = (index: number) => {
//     const newOptions = options.filter((_, i) => i !== index);
//     setOptions(newOptions);
//   };

//   const handleSubmit = async () => {
//     if (!title || !desc || options.some((o) => !o) || !startTime || !endTime) {
//       setError("These field is required.");
//       return;
//     }
//   };

//   return (
//     <div className='space-y-5 max-w-2xl flex flex-col mx-auto'>
//       <h1 className='text-2xl font-semibold'>CREATE AN ELECTION</h1>
//     </div>
//   );
// };

// export default CreateElectionForm;
