'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import BalloonMessage from '@/components/BalloonMessage';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Page() {
    const router = useRouter();    
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const handleSubmit = async function (event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const response = await fetch('/api/user/login', {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        });
        const data = await response.json();

        console.log(data, response);

        if (! response.ok) {
            setMessage(data.message);
            setIsVisible(true);
            return setIsSuccess(response.ok);
        }

        return router.push('/user');
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
                Login
            </h2>

            <div className="flex flex-col">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block dark:text-gray-100 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input 
                            type="text" 
                            id="email" 
                            required
                            value={credentials.email}
                            onChange={(event) => setCredentials({...credentials, email: event.target.value})}
                            className="shadow appearance-none border rounded w-full py-2 px-3 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"></input>
                        <p className="darktext-gray-100 text-xs italic mt-1">
                            Email do usuário.
                        </p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block dark:text-gray-100 text-sm font-bold mb-2">
                            Senha
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            required
                            value={credentials.password}
                            onChange={(event) => setCredentials({...credentials, password: event.target.value})}
                            className="shadow appearance-none border rounded w-full py-2 px-3 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"></input>
                        <p className="darktext-gray-100 text-xs italic mt-1">
                            Senha do usuário.
                        </p>
                    </div>
                    <div className="mb-4">
                        <button className="shadow border rounded py-2 px-3 dark:text-gray-100 hover:bg-gray-500" type="submit">
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}