import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Loader from "../../Components/Loading/Loader";
import Swal from "sweetalert2";

const EditContest = () => {
    const { id } = useParams()
    const  axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm();

    const { data: contest = {}, isLoading, refetch } = useQuery({
        queryKey: ["contestsTask", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${id}/task`);
            return res.data;
        },
    });

    const onSubmit =async (data) => {
        const {name, contestType, image, price, prizeMoney, description, taskInstruction} = data;
        const contestEditInfo = {
            name,
            contestType,
            image,
            price: Number(price),
            prizeMoney: Number(prizeMoney),
            description,
            taskInstruction,
        };
        try {
            Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Conform Update"
            }).then(async (result) => {
                if (result.isConfirmed) {
                await axiosSecure.patch(`/contests/${id}/contest`, contestEditInfo);
                Swal.fire({
                    title: "Contest updated",
                    text: "Your Contest has been updated",
                    icon: "success"
                });
                    refetch()
                }
            });
        } catch (err) {
            toast.error("Error",err.data.message);
        }
    };

    if(isLoading) return <Loader></Loader>

  return (
    <div className="w-full px-2 md:px-6 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        Edit Contest
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-secondary dark:bg-[#261B25] rounded-2xl shadow-lg p-6 md:p-10 space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            {...register("name")}
            placeholder="Contest Name"
            defaultValue={contest.name}
            required
            className="w-full border border-primary rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:text-white"
          />
          <select
            {...register("contestType")}
            defaultValue={contest.contestType}
            required
            className="w-full border border-primary rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select Contest Type</option>
            <option value="Design">Design</option>
            <option value="Writing">Writing</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        <input
          {...register("image")}
          placeholder="Image URL"
          defaultValue={contest.image}
          required
          className="w-full border border-primary rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:text-white"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="number"
            {...register("price")}
            defaultValue={contest.price}
            placeholder="Entry Fee"
            required
            className="w-full border border-primary rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:text-white"
          />
          <input
            type="number"
            {...register("prizeMoney")}
            defaultValue={contest.prizeMoney}
            placeholder="Prize Money"
            required
            className="w-full border border-primary rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:text-white"
          />
        </div>

        <textarea
          {...register("description")}
          defaultValue={contest.description}
          placeholder="Contest Description"
          rows={3}
          required
          className="w-full border border-primary rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:text-white"
        />

        <textarea
          {...register("taskInstruction")}
          defaultValue={contest.taskInstruction}
          placeholder="Task Instruction"
          rows={2}
          required
          className="w-full border border-primary rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          className="w-full md:w-[25%] btn rounded-2xl bg-primary text-white font-bold"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditContest;