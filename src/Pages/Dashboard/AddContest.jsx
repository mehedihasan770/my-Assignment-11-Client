import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import useDashboardRole from "../../Hooks/useDashboardRole";
import { useAuth } from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AddContest = () => {
    const { user } = useAuth();
    const  axiosSecure = useAxiosSecure();
    const dashboardRole = useDashboardRole()
    const { register, handleSubmit, reset } = useForm();
    const [deadline, setDeadline] = useState(new Date());

    const onSubmit =async (data) => {
        const {name, contestType, image, price, prizeMoney, description, taskInstruction} = data;
        const contestInfo = {
            name,
            contestType,
            image,
            price: Number(price),
            prizeMoney: Number(prizeMoney),
            description,
            taskInstruction,
            deadline,
            status: 'pending',
            participantsCount : 0,
            winnerDetails: {},
            submissionsTask: [],
            creator_email: user.email,
            creator_name: user.displayName,
            creator_img: user.photoURL,
            created_at: new Date().toLocaleString()
        };
        try {
        await axiosSecure.post(`/contests/${user?.email}/${dashboardRole?.roleData?.role}`, contestInfo);
          toast.success("Contest added successfully!");
          reset();
        } catch (err) {
            toast.error("Error: " + err.data.message);
        }
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
            <option value="Image Design">Image Design</option>
            <option value="Article Writing">Article Writing</option>
            <option value="Business Idea">Business Idea</option>
            <option value="Logo Design">Logo Design</option>
          </select>
        </div>

        <input
          {...register("image")}
          placeholder="Image URL"
          required
          className="w-full border border-primary rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:text-white"
        />

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

        <textarea
          {...register("description")}
          placeholder="Contest Description"
          rows={3}
          required
          className="w-full border border-primary rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:text-white"
        />

        <textarea
          {...register("taskInstruction")}
          placeholder="Task Instruction"
          rows={2}
          required
          className="w-full border border-primary rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:text-white"
        />

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
