import { FunctionComponent } from "react";

const TaskSkeleton: FunctionComponent = () => {
    return (
        <div className="w-4xl mx-auto animate-pulse">
            <div className="mb-4 h-8 w-full rounded bg-gray-300"></div>
            <div className="space-y-2">
                <div className="h-6 w-full rounded bg-gray-200"></div>
                <div className="h-6 w-full rounded bg-gray-200"></div>
                <div className="h-6 w-full rounded bg-gray-200"></div>
            </div>
        </div>
    );
}

export default TaskSkeleton;