import { FunctionComponent } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

type Props = {
    paginate: any,
    trigger: any
};

const Paginate: FunctionComponent<Props> = ({paginate, trigger}) => {
    const handleNextPage = () => trigger(paginate.next_page_url);
    const handlePreviousPage = () => trigger(paginate.prev_page_url);

    return (
        <nav className="flex items-center justify-center space-x-2 my-5">
            {paginate.prev_page_url !== null
                ? (<button 
                        onClick={ handlePreviousPage }
                        className="px-4 py-2 border rounded-md dark:text-white hover:bg-gray-500">
                        <FontAwesomeIcon icon={ faArrowLeft } />
                    </button>)
                : <></>}
                
            {paginate.next_page_url !== null
                ? (<button 
                    onClick={ handleNextPage }
                    className="px-4 py-2 border rounded-md dark:text-white hover:bg-gray-500">
                        <FontAwesomeIcon icon={ faArrowRight } />
                </button>)
                : <></>}
        </nav>
    )
};

export default Paginate;