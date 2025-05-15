import { createContext,useContext,useState,useEffect, use } from "react";
const DarkModeContext= createContext();

export const DarkModeProvider=({children})=>{

    const [isdarkMode,setDarkMode]=useState(() => {
  return localStorage.getItem('darkMode') === 'true';
});

useEffect(()=>{
    if(isdarkMode){
        document.documentElement.classList.add("dark")
    }
    else{
        document.documentElement.classList.remove("dark")
    }
    localStorage.setItem('darkMode', isdarkMode);
},[isdarkMode])
return(
    <DarkModeContext.Provider value={{isdarkMode,setDarkMode}}>{children}</DarkModeContext.Provider>
)
}
export const useDarkMode=()=>useContext(DarkModeContext)