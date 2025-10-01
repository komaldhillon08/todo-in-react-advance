import React, { useEffect, useContext, useState, createContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
    }, [])

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const root = document.documentElement;
        if (theme === "light") {
            root.setAttribute("data-theme", "light");
            root.classList.remove("dark");
        }
        else {
            root.setAttribute("data-theme", "dark");
            root.classList.add("dark"); 
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)