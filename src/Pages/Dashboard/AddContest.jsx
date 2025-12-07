import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddContest = () => {
  const { register, handleSubmit, reset } = useForm();
  const [deadline, setDeadline] = useState(new Date());

  const onSubmit = (data) => {
    const contestInfo = {
      name: data.name,
      image: data.image,
      description: data.description,
      price: data.price,
      prizeMoney: data.prizeMoney,
      taskInstruction: data.taskInstruction,
      contestType: data.contestType,
      deadline: deadline,
    };
    console.log(contestInfo);
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Contest</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Name */}
        <input
          {...register("name")}
          placeholder="Contest Name"
          className="w-full border p-2 rounded"
          required
        />

        {/* Image */}
        <input
          {...register("image")}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
          required
        />

        {/* Description */}
        <textarea
          {...register("description")}
          placeholder="Contest Description"
          className="w-full border p-2 rounded"
          rows={3}
          required
        ></textarea>

        {/* Price */}
        <input
          type="number"
          {...register("price")}
          placeholder="Entry Fee"
          className="w-full border p-2 rounded"
          required
        />

        {/* Prize Money */}
        <input
          type="number"
          {...register("prizeMoney")}
          placeholder="Prize Money"
          className="w-full border p-2 rounded"
          required
        />

        {/* Task Instruction */}
        <textarea
          {...register("taskInstruction")}
          placeholder="Task Instruction"
          className="w-full border p-2 rounded"
          rows={2}
          required
        ></textarea>

        {/* Contest Type */}
        <select
          {...register("contestType")}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Contest Type</option>
          <option value="Design">Design</option>
          <option value="Writing">Writing</option>
          <option value="Marketing">Marketing</option>
        </select>

        {/* Deadline */}
        <div>
          <label className="block mb-1">Deadline:</label>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            className="w-full border p-2 rounded"
            required
            showTimeSelect
            dateFormat="Pp"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Contest
        </button>
      </form>
    </div>
  );
};

export default AddContest;