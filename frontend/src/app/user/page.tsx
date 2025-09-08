'use client';

import TaskList from "@/components/TaskList";
import { useEffect, useState } from "react";
import Paginate from "@/components/Paginate";
import TaskCreate from "@/components/TaskCreate";
import TaskSkeleton from "@/components/TaskSkeleton";

export default function Home() {
    const url = process.env.NEXT_PUBLIC_API_BACKEND + '/api/tasks';
    const [isLoading, setIsLoading] = useState(true);
    const [tasklist, setTaskList] = useState([]);
    const [paginate, setPaginate] = useState({});
    const fetchData = async function (url: string) {
        try {
            const response = await fetch(url);

            if (response.ok) {
                const responseJson = await response.json();
                setTaskList(responseJson.data || []);
                setPaginate(responseJson || {});
                return setIsLoading(! response.ok);
            } 

            setTaskList([]);
            setPaginate({
                    prev_page_url: null,
                    next_page_url: null
                });
            setIsLoading(response.ok);
        } catch (error) {
            setTaskList([]);
            setPaginate({
                prev_page_url: null,
                next_page_url: null
            });
            setIsLoading(false);
        }
    };
    const handleCreate = () => fetchData(url);
    const handleListPage = (url: string) => {
        setIsLoading(true);
        fetchData(url);
    };

    useEffect(() => { fetchData(url) }, []);

    return (
        <div className="w-screen">
            <TaskCreate title="Nova Task" trigger={ handleCreate }/>
            {isLoading 
                ? (<TaskSkeleton />) 
                : ( 
                    <div>
                        <TaskList title="Tarefas" taskListItems={ tasklist } />
                        <Paginate paginate={ paginate } trigger={ handleListPage } />
                    </div>
                )}
        </div>
    );
}
