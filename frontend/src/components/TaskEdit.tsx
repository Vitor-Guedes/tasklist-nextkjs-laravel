'use client';

import { proxy } from "@/services/proxy";
import { useRouter } from "next/navigation";
import BalloonMessage from "./BalloonMessage";
import { FormEvent, FunctionComponent, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faRotateBack, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface Task {
    id: number,
    title: string,
    status: string
}

type Props = {
    title: string,
    task: Task,
    setTask: any
}

const TaskEdit: FunctionComponent<Props> = ({ title, task, setTask }) => {
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleBack = function () {
        router.push('/user');
    }

    const handleSubmit = async function (event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        event.stopPropagation();

        setIsLoading(true);

        try {
            const response = await proxy(`/api/user/tasks/${task.id}`, {
                method: "PUT",
                body: JSON.stringify(task)
            });
            
            if (response.ok) {
                const json = await response.json();
                setMessage(json.message || 'Atualizado com sucesso.');
                setIsVisible(true);
                return setIsSuccess(json.success);
            }

        } catch (error) {
            setMessage("Algo deu errado, tente novamente mais tarde.");
            setIsVisible(true);
            setIsSuccess(false);
        } finally {
            setTask(task);
            setIsLoading(false);
        }
    }

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

            <div className="flex flex-col">
                <form onSubmit={ handleSubmit }>
                    <div className="mb-4">
                        <label htmlFor="title" className="block dark:text-gray-100 text-sm font-bold mb-2">
                            Titulo
                        </label>
                        <input 
                            type="text" 
                            id="title" 
                            required
                            value={task.title}
                            onChange={(event) => setTask({...task, title: event.target.value})}
                            className="shadow appearance-none border rounded w-full py-2 px-3 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"></input>
                        <p className="darktext-gray-100 text-xs italic mt-1">
                            Titulo da tarefa.
                        </p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="status" className="block dark:text-gray-100 text-sm font-bold mb-2">
                            Status
                        </label>
                        <select 
                            name="status" 
                            id="stauts" 
                            required
                            value={task.status}
                            onChange={(event) => setTask({...task, status: event.target.value})}
                            className="shadow appearance-none border rounded w-full py-2 px-3 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline">
                            <option className="dark:text-gray-700" value=""></option>
                            <option className="dark:text-gray-700" value="pending">Pendente</option>
                            <option className="dark:text-gray-700" value="in_progress">Em Andamento</option>
                            <option className="dark:text-gray-700" value="complete">Completa</option>
                        </select>
                        <p className="darktext-gray-100 text-xs italic mt-1">
                            Titulo da tarefa.
                        </p>
                    </div>
                    <div className="mb-4 flex flex-row justify-between">
                        <button type="submit"
                            disabled={isLoading}
                            className="shadow border rounded py-2 px-3 dark:text-gray-100 hover:bg-gray-500">
                            {isLoading ? <FontAwesomeIcon icon={ faSpinner } spin /> : <FontAwesomeIcon icon={ faCheck } />}
                        </button>
                        <button 
                            type="button"
                            onClick={ handleBack }
                            className="shadow border rounded py-2 px-3 dark:text-gray-100 hover:bg-gray-500">
                            <FontAwesomeIcon icon={ faRotateBack } />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskEdit;