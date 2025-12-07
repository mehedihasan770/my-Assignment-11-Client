import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddContest = () => {
  const { register, handleSubmit, reset } = useForm();
  const [deadline, setDeadline] = useState(new Date());

  const onSubmit = (data) => {
    const contestInfo = { ...data, deadline };
    console.log(contestInfo);
    reset();
  };

  return (
    <div className="w-full px-2 md:px-6 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        Add New Contest
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-secondary dark:bg-[#261B25] rounded-2xl shadow-lg p-6 md:p-10 space-y-6"
      >
        {/* Name + Contest Type */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            {...register("name")}
            placeholder="Contest Name"
            required
            className="w-full border border-primary rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:text-white"
          />
          <select
            {...register("contestType")}
            required
            className="w-full border border-primary rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select Contest Type</option>
            <option value="Design">Design</option>
            <option value="Writing">Writing</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        {/* Image URL */}
        <input
          {...register("image")}
          placeholder="Image URL"
          required
          className="w-full border border-primary rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:text-white"
        />

        {/* Price + Prize Money */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="number"
            {...register("price")}
            placeholder="Entry Fee"
            required
            className="w-full border border-primary rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:text-white"
          />
          <input
            type="number"
            {...register("prizeMoney")}
            placeholder="Prize Money"
            required
            className="w-full border border-primary rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Description */}
        <textarea
          {...register("description")}
          placeholder="Contest Description"
          rows={3}
          required
          className="w-full border border-primary rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:text-white"
        />

        {/* Task Instruction */}
        <textarea
          {...register("taskInstruction")}
          placeholder="Task Instruction"
          rows={2}
          required
          className="w-full border border-primary rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:text-white"
        />

        {/* Deadline */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium dark:text-gray-200">Deadline</label>
          <DatePicker
            selected={deadline}
            onChange={setDeadline}
            showTimeSelect
            dateFormat="Pp"
            required
            className="w-full border border-primary rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-[25%] btn rounded-2xl bg-primary text-white font-bold"
        >
          Add Contest
        </button>
      </form>
    </div>
  );
};

export default AddContest;
