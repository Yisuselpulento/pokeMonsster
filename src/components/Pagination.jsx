import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";

const Pagination = () => {
    const { numberPages, currentPage, handlePageChange, loading } = useContext(PokemonContext);

    const handlePageClick = (pageNumber) => {
        handlePageChange(pageNumber);
    };

    const maxPageButtons = 6;
    let startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
    let endPage = startPage + maxPageButtons - 1;

    if (endPage > numberPages) {
        endPage = numberPages;
        startPage = Math.max(endPage - maxPageButtons + 1, 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className={`${loading && "hidden"}`}>
            <ul className="inline-flex -space-x-px text-sm">
                <li>
                    <button
                        onClick={() => handlePageClick(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center px-3 border-l border-neutral-800 h-8 leading-tight bg-neutral-700 hover:bg-neutral-800 rounded-tl-lg rounded-bl-lg
                            ${currentPage === 1 ? ' bg-neutral-800 ' : ' '}
                           `}
                    >
                        Back
                    </button>
                </li>

                {pageNumbers.map((pageNumber) => (
                    <li key={pageNumber}>
                        <button
                            onClick={() => handlePageClick(pageNumber)}
                            className={`flex items-center justify-center px-3 border-l border-neutral-800 h-8 w-[38px] leading-tight bg-neutral-700 hover:bg-neutral-800
                              ${currentPage === pageNumber ? ' bg-neutral-800 ' : ' '}
                              `}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}

                <li>
                    <button
                        onClick={() => handlePageClick(currentPage + 1)}
                        disabled={currentPage === numberPages}
                        className={`flex items-center justify-center px-3 border-l border-neutral-800 h-8 leading-tight bg-neutral-700 hover:bg-neutral-800 rounded-tr-lg rounded-br-lg
                            ${currentPage === numberPages ? ' bg-neutral-800 ' : ' '}`}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;