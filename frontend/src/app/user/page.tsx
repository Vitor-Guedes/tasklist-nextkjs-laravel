'use client';

import TaskList from "@/components/TaskList";
import { useEffect, useState } from "react";
import Paginate from "@/components/Paginate";
import TaskCreate from "@/components/TaskCreate";
import TaskSkeleton from "@/components/TaskSkeleton";
import { proxy } from "@/services/proxy";
import { useRouter } from "next/navigation";

export default function Home() {
    const url = '/api/user/tasks';
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [tasklist, setTaskList] = useState([]);
    const [paginate, setPaginate] = useState({
        prev_page_url: null,
        next_page_url: null,
        current_page_url: ""
    });
    const fetchData = async function (url: string) {
        try {
            const response = await proxy(url);

            if (response.ok) {
                const responseJson = await response.json();
                setTaskList(responseJson.data || []);
                setPaginate(responseJson || {});
                return setIsLoading(! response.ok);
            }

            if (response.status === 401) {
                return router.push('/');
            }

            setTaskList([]);
            setPaginate({
                    prev_page_url: null,
                    next_page_url: null,
                    current_page_url: ""
                });
            setIsLoading(response.ok);
        } catch (error) {
            setTaskList([]);
            setPaginate({
                prev_page_url: null,
                next_page_url: null,
                current_page_url: ""
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
                        <TaskList 
                            title="Tarefas" 
                            taskListItems={ tasklist } 
                            trigger={ handleListPage } 
                            currentPage={ paginate?.current_page_url || "" }
                        />
                        <Paginate paginate={ paginate } trigger={ handleListPage } />
                    </div>
                )}
        </div>
    );
}
