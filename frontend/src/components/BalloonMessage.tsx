import { FunctionComponent } from "react";

type Props = {
    message: string,
    isVisible: boolean,
    setIsVisible?: any,
    isSuccess: boolean,
    timeout?: number
}

const BalloonMessage: FunctionComponent<Props> = ({ 
    message, 
    isVisible, 
    setIsVisible, 
    isSuccess, 
    timeout = 3000
 }) => {
    if (isVisible) {
        setTimeout(() => { 
            setIsVisible(false);
        }, timeout);
    }

    return (
        <div className={`transition-opacity duration-500 fixed top-5 right-1/12 flex items-end justify-end mb-4 ${ isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className={(isSuccess ? 'bg-green-500' : 'bg-red-500') + ` text-white rounded-lg p-3 max-w-xs`}>
                <p className="text-sm"> { message } </p>
            </div>
        </div>
    );
}

export default BalloonMessage;