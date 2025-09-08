'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TaskEdit from "@/components/TaskEdit";
import { proxy } from "@/services/proxy";

export default function Task() {
    const params = useParams();
    let [task, setTask] = useState({
        id: 0,
        title: "",
        status: ""
    });

    useEffect(() => {
        const fetchTask = async () => {
            const response = await proxy(`/api/user/tasks/${params.id}`);
            const json = await response.json();
            setTask(json.task);
        }

        fetchTask();
    }, [])

    return (
        <div className="w-screen">
            <div className="w-4xl mx-auto">
                <TaskEdit title="Editar Tarefa" task={ task } setTask={ setTask } />
            </div>
        </div>
    );
}