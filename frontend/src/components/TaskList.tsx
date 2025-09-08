'use client';

import { FunctionComponent } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt } from '@fortawesome/free-solid-svg-icons';

interface Task {
    id: number,
    title: string,
    status: string
}

type Props = {
    title: string,
    taskListItems: Task[]
}

const TaskList: FunctionComponent<Props> = ({ title, taskListItems }) => {
    const router = useRouter();

    const handleEdit = function (id: number) {
        router.push(`/user/tasks/${id}`);
    };
    const handleDelete = function (id: number) {
        console.log('delete', id);
    };

    return (
        <div className="w-4xl mx-auto">
            <h2 className="text-2xl dark:text-white mt-5">
                { title }
            </h2>

            <div className="flex flex-col">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-800 dart:text-white text-white">
                            <th className="p-2 border dark:border-black text-left"> #Id </th>
                            <th className="p-2 border dark:border-black text-left"> Titulo </th>
                            <th className="p-2 border dark:border-black text-left"> Status </th>
                            <th className="p-2 border dark:border-black text-left"> Ações </th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskListItems.map((task, index) => (
                            <tr key={ task.id || index } className="dark:even:bg-gray-800">
                                <td className="p-2 border dark:border-gray-800">{ task.id }</td>                                
                                <td className="p-2 border dark:border-gray-800">{ task.title }</td>                                
                                <td className="p-2 border dark:border-gray-800">{ task.status }</td>                                
                                <td className="p-2 border dark:border-gray-800">
                                    <div className="flex flex-row gap-2 justify-around flex-row-reverse">
                                        <button 
                                            type="button"
                                            onClick={ () => handleDelete(task.id) }
                                            className="shadow border text-sm rounded py-2 px-3 text-white dark:text-white hover:bg-red-600 bg-red-800">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={ () => handleEdit(task.id) }
                                            className="shadow border text-sm rounded py-2 px-3 text-white dark:text-white hover:bg-indigo-600 bg-indigo-800">
                                            <FontAwesomeIcon icon={faPenAlt} />
                                        </button>
                                    </div>
                                </td>                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TaskList;