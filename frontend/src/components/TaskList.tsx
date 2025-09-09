'use client';

import { proxy } from "@/services/proxy";
import { useRouter } from "next/navigation";
import BalloonMessage from "./BalloonMessage";
import { FunctionComponent, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import SearchBar from "./SearchBar";

interface Task {
    id: number,
    title: string,
    status: string
}

type Props = {
    title: string,
    taskListItems: Task[],
    trigger: any,
    currentPage: string
}

const TaskList: FunctionComponent<Props> = ({ title, taskListItems, trigger, currentPage }) => {
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleEdit = function (id: number) {
        router.push(`/user/tasks/${id}`);
    };
    const handleDelete = async function (id: number) {
        try {
            setIsLoading(true);

            const response = await proxy(`/api/user/tasks/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                return trigger(currentPage);
            }

            const json = await response.json();
            setMessage(json.message);
            setIsSuccess(json.success);
            setIsVisible(true);
        } catch (error) {
            setMessage("Algo deu errado, tente novamente mais tarde.");
            setIsSuccess(false);
            setIsVisible(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-4xl mx-auto">

             <BalloonMessage 
                message={message} 
                isVisible={isVisible} 
                isSuccess={isSuccess} 
                setIsVisible={setIsVisible}
            />

            <h2 className="text-2xl dark:text-white mt-5">
                { title }
            </h2>

            <SearchBar trigger={ trigger }/>

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
                                            disabled={isLoading}
                                            title="Deletar Tarefa"
                                            onClick={ () => handleDelete(task.id) }
                                            className="shadow border text-sm rounded py-2 px-3 text-white dark:text-white hover:bg-red-600 bg-red-800">
                                            {isLoading ? <FontAwesomeIcon icon={ faSpinner } spin /> : <FontAwesomeIcon icon={ faTrash } />}
                                        </button>
                                        <button
                                            type="button"
                                            disabled={isLoading}
                                            title="Editar Tarefa"
                                            onClick={ () => handleEdit(task.id) }
                                            className="shadow border text-sm rounded py-2 px-3 text-white dark:text-white hover:bg-indigo-600 bg-indigo-800">
                                            {isLoading ? <FontAwesomeIcon icon={ faSpinner } spin /> : <FontAwesomeIcon icon={ faPenAlt } />}
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