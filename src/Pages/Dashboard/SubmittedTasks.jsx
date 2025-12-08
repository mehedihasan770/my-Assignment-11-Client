import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loader from '../../Components/Loading/Loader';
import Swal from 'sweetalert2';

const SubmittedTasks = () => {
    const axiosSecure = useAxiosSecure();
    const [modalData, setModalData] = useState({})
    const {id} = useParams()
    const { data: tasks = {}, isLoading, refetch } = useQuery({
        queryKey: ["contestsTask", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${id}/task`);
            return res.data;
        },
    });

    const handleViewTask = (description, fileUrl, title ) => {
        const task = {description, fileUrl, title}
        setModalData(task)
    }

    const handleDeclareWinner =async (email, id) => {
        Swal.fire({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Conform Declare"
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axiosSecure.patch(`/contests/${id}/${email}/winner`)
            Swal.fire({
              title: "Winner Declared",
              text: "Your Winner has been Declared",
              icon: "success"
            });
            refetch()
          }
        });
    }

    const hasWinner = tasks?.submissionsTask?.some(t => t.isWinner)

    console.log(tasks.submissionsTask)
    if(isLoading) return <Loader></Loader>
    return (
      <div className="shadow-md md:px-6 py-8 rounded-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">
          participant Contest Task
        </h2>
        <div className="overflow-x-scroll">
          <table className="min-w-full bg-white dark:bg-gray-900 text-sm sm:text-xs">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Contest Name</th>
                <th className="px-4 py-2 text-left">Winner Status</th>
                <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">
                  Participant Name
                </th>
                <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">
                  Participant Email
                </th>
                <th className="px-4 py-2 text-left">Submitted At</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.submissionsTask.map((task, index) => (
                <tr key={task._id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {task.contestName}
                  </td>
                  <td className={`px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis`}>
                    <p className={`${task.isWinner ? 'bg-green-500' : 'bg-amber-300'} w-fit rounded-2xl py-1 px-3`}>{task.isWinner ? "Winner" : "Not Winner"}</p>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {task.participant.name}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {task.participant.email}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {new Date(task.submittedAt).toLocaleString()}
                  </td>
                  <td className="space-x-2 flex items-center">
                    <label htmlFor="my_modal_6" onClick={() => handleViewTask(task.task.description, task.task.fileUrl, task.task.title)} className="bg-green-500 text-white px-2 py-1 btn w-30 rounded-2xl my-2">
                      View Task
                    </label>
                    <button disabled={hasWinner} onClick={() => handleDeclareWinner(task.participant.email, tasks._id)} className={hasWinner ? ' px-2 rounded-2xl py-1 btn w-30 text-black bg-gray-300' : "bg-red-500 text-white px-2 py-1 btn w-30 rounded-2xl"}>Declare Winner</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box space-y-3">
            <h3 className="text-lg font-bold">{modalData.title}</h3>
            <Link to={modalData.fileUrl} className='btn'>File URL</Link>
            <p>{modalData.description}</p>
            <div className="modal-action">
              <label htmlFor="my_modal_6" className="btn">
                Close!
              </label>
            </div>
          </div>
        </div>
        
      </div>
    );
};

export default SubmittedTasks;