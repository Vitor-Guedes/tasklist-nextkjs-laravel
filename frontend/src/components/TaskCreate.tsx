'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormEvent, FunctionComponent, useState } from "react";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import BalloonMessage from "./BalloonMessage";
import { proxy } from "@/services/proxy";

interface Task {
    title: string,
    status: string
}

type Props = {
    title: string,
    trigger?:  any
}

const TaskCreate: FunctionComponent<Props> = ({ title, trigger }) => {
    const initialStatusTask: Task = {title: "", status: ""};
    const [task, setTask] = useState(initialStatusTask);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async function (event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const response = await proxy('/api/user/tasks', {
                method: "POST",
                body: JSON.stringify(task)
            });

            if (response.ok) {
                const json = await response.json();
                setIsVisible(true);
                setMessage(json.message || 'Criado com sucesso.');
                setIsSuccess(json.success);
                return trigger();
            }
        } catch (error) {
            setMessage("Algo deu errado, tente novamente mais tarde.");
            setIsVisible(true);
            setIsSuccess(false);
        } finally {
            setTask(initialStatusTask);
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
                <form onSubmit={handleSubmit}>
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
                            value={task.status}
                            required
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
                    <div className="mb-4">
                        <button 
                            title="Cria nova tarefa"
                            className="shadow border rounded py-2 px-3 dark:text-gray-100 hover:bg-gray-500" type="submit">
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskCreate;

