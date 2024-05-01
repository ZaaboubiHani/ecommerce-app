import React, { createContext, useState, useEffect } from 'react';
export const PaginationContext = createContext();

const PaginationProvider = ({ children }) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(0);

    const increasePagination = () => {
        setPage(page + 1);
    };

    const assignLimit = (limit) => {
        setLimit(limit);
    };

    const decreasePagination = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return <PaginationContext.Provider value={{
        page,
        limit,
        increasePagination,
        decreasePagination,
        assignLimit,
    }}>
        {children}
    </PaginationContext.Provider>;
};

export default PaginationProvider;
