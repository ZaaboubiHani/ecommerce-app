import React, { useContext } from 'react';
import { SnackbarContext } from '../contexts/SnackbarContext';

const Snackbar = () => {
    const { message, isOpen } = useContext(SnackbarContext);
    return <div className={`fixed z-50 ${isOpen ? 'bottom-4' : '-bottom-12'} w-full flex justify-center items-center transition-all duration-300`}>
        <div className='w-min-[300px] h-12 bg-green-500 flex justify-center items-center rounded-lg px-4 text-white'>
            {message}
        </div>
    </div>;
};

export default Snackbar;
