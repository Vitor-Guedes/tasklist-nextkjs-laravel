'use client';

import { FunctionComponent, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEraser, faSpinner } from '@fortawesome/free-solid-svg-icons';

type Props = {
    trigger: any
}

const SearchBar: FunctionComponent<Props> = ({ trigger }) => {
    const [search, setSearch] = useState({value: "", type: "title"});
    const [isLoading, setIsLoading] = useState(false);
    
    const loading = function (callback: any) {
        setIsLoading(true);
        callback();
        setIsLoading(false);
    }

    const handleSearch = async function () {
        loading(async () => {
            if (search.value && search.type) {
                const baseurl = window.location.origin;
                const url = new URL(baseurl + "/api/user/tasks/search");
                url.searchParams.append(search.type, search.value);
                trigger(url.toString());
            }
        });
    };

    const handleClearSearch = async function () {
        loading(async () => {
            const baseurl = window.location.origin;
            const url = new URL(baseurl + "/api/user/tasks");
            trigger(url.toString());
        });
    }

    return (
        <div className="flex flex-row my-5 justify-between w-full gap-5 px-1">
            <div className="mb-4 w-3/6">
                <label htmlFor="search" className="block dark:text-gray-100 text-sm font-bold mb-2">
                    Buscar
                </label>
                <input 
                    type="text" 
                    name="search" 
                    id="search"
                    value={ search.value }
                    onChange={ (event) => setSearch({...search, value: event.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline" 
                />
            </div>
            <div className="mb-4 w-2/6">
                <label htmlFor="search" className="block dark:text-gray-100 text-sm font-bold mb-2">
                    Por
                </label>
                <select 
                    name="status" 
                    id="stauts" 
                    value={ search.type }
                    onChange={ (event) => setSearch({...search, type: event.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline">
                    <option className="dark:text-gray-700" value="title">Titulo</option>
                    <option className="dark:text-gray-700" value="status">Status</option>
                </select>
            </div>
            <div className="mb-4 my-auto flex flex-row gap-3">
                <button
                    disabled={ isLoading }
                    type="button"
                    aria-label="Buscar"
                    title="Buscar"
                    onClick={ handleSearch }
                    className="shadow border rounded py-2 px-3 dark:text-gray-100 hover:bg-gray-500 text-sm"
                >
                    {isLoading ? <FontAwesomeIcon icon={ faSpinner } spin /> : <FontAwesomeIcon icon={ faSearch } />}
                </button>
                <button
                    disabled={ isLoading }
                    type="button"
                    aria-label="Limpar Filtros"
                    title="Limpar Filtros"
                    onClick={ handleClearSearch }
                    className="shadow border rounded py-2 px-3 dark:text-gray-100 hover:bg-gray-500 text-sm"
                >
                    {isLoading ? <FontAwesomeIcon icon={ faSpinner } spin /> : <FontAwesomeIcon icon={ faEraser } />}
                </button>
            </div>
        </div>
    )
}

export default SearchBar;