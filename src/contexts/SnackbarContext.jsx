import React, { createContext, useState } from 'react';
export const SnackbarContext = createContext();
const SnackbarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const handleClose = () => {
        setIsOpen(false);
    };
    const handleOpen = (msg, delay) => {
        setMessage(msg);
        setIsOpen(true);
        setTimeout(() => {
            handleClose();
        }, delay);
    };
    return <SnackbarContext.Provider value={{ isOpen, message, handleOpen }}>
        {children}
    </SnackbarContext.Provider>;
};

export default SnackbarProvider;
