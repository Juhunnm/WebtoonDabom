import React, { createContext, useState } from 'react';

const LoadingContext = createContext({
    loading: false,
    spinner: () => { },
});

const LoadingContextProvider = ({ children }) => {
    const [loading, setIsLoading] = useState(false);
    const [loadingFinished, setLoadingFinished] = useState(false); 

    const spinner = {
        start: () => {
            setIsLoading(true)
            setLoadingFinished(false);
        },
        stop: () => {
            setIsLoading(false)
            setLoadingFinished(true);
        },
    };
    const value = { loading, loadingFinished, spinner };
    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}
export { LoadingContext, LoadingContextProvider };