import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches;
    const storedDarkMode = localStorage.getItem('darkThemeUnsplash');
    console.log(storedDarkMode, 'storedDarkMode');
    console.log(prefersDarkMode, 'prefersDarkMode');
    if (storedDarkMode === 'true') {
        return true;
    } else {
        return prefersDarkMode;
    }
}

export const AppProvider = ({children}) => {
    const [isDarkTheme, setDarkTheme] = useState(getInitialDarkMode());
    const [searchValue, setSearchValue] = useState('cats');
    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setDarkTheme(newDarkTheme);
        localStorage.setItem('darkThemeUnsplash',!newDarkTheme);
        // console.log(newDarkTheme, 'toggleFn');
    }

    useEffect(()=>{
        const body = document.querySelector('body');
        // console.log(isDarkTheme, 'useEffect');
        body.classList.toggle('dark-theme', !isDarkTheme);
    },[isDarkTheme])
    return (
        <AppContext.Provider value={{isDarkTheme, toggleDarkTheme, searchValue, setSearchValue}}>
            {children}
        </AppContext.Provider>
    )

} 

export const useGlobalContext = () => useContext(AppContext);