import { useState } from "react"
import { ThemeProvider, useTheme } from "../theme/demo.jsx";
import MoonImg from "../../public/icon-moon.svg"
import SunImg from "../../public/icon-sun.svg"

export default function Todo() {
    const [list, setList] = useState([]);
    const [input, setInput] = useState("");
    const [listCC, setListCC] = useState("all")
    const { theme, setTheme } = useTheme()

    function handleAddList(e) {
        e.preventDefault();
        if (input.trim() === "") return;


        let newTodo = {
            id: Date.now(),
            text: input,
            isSelected: false,
        }
        setList([...list, newTodo])
        setInput("")
        console.log("koaml");

    }

    function removeList(id) {
        setList(list.filter((todo) => todo.id !== id));
    }

    // check function 

    function handleChack(id, e) {
        setList((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, isSelected: e.target.checked } : todo
            )
        )
        setInput("")
    }
    /*  function handleActive(filterType) {
         console.log("komal");
         const filterTodos = list.filter(todo => {
             if (filterType === "active") {
                 console.log("komal check ?", todo);
                 return !todo.isSelected === true
             }
 
             else if (filterType === "completed") {
                 return todo.isSelected === false
             }
             else {
                 return todo
             }
         })
         setList(filterTodos)
         console.log("check", filterTodos);
     } */



    const filterTodos = list.filter(todo => {
        if (listCC === "active") return !todo.isSelected;
        if (listCC === "completed") return todo.isSelected;
        return true; // all

    })

    function clearCompleted() {

        setList((prev) => prev.filter((clear) => !clear.isSelected))

    }



    return (
        <>
            <section className="dark:bg-gray-900 bg-white">
                <div className="bg-[url('../public/bg-desktop-light.jpg')] dark:bg-[url('../public/bg-desktop-dark.jpg')] bg-cover h-70 pt-17 ">
                    <div className="  lg:w-1/3 mx-auto sm:w-1/2  w-1/2 ">
                        <div className="flex flex-wrap  justify-between  mx-auto items-center mb-12">
                            <h1 className="text-4xl text-white tracking-widest">TODO</h1>
                            {/* <span className="cursor-pointer"> <img src="../public/icon-moon.svg" alt="moon-icon" /></span> */}


                            {
                                theme === 'light' ? (
                                    <div className='p-2 cursor-pointer' onClick={() => setTheme('dark')}>
                                        <img src={MoonImg} alt="moon Mode" />

                                    </div>
                                ) : (
                                    <div className='p-2 cursor-pointer' onClick={() => setTheme('light')}>
                                        <img src={SunImg} alt="sun Mode" />


                                    </div>
                                )
                            }
                        </div>
                        <form onSubmit={handleAddList}>
                            <input
                                className="p-4 w-full bg-white rounded dark:bg-gray-800 dark:border-amber-50 dark:text-white"
                                type="text"
                                onChange={(e) => setInput(e.target.value)}
                                value={input}
                            />
                        </form>
                    </div>
                </div>
                <ul className="lg:w-1/3 mx-auto   w-1/2 flex-wrap 
                 flex justify-center flex-col border-0  outline-0 
                 rounded-2xl -mt-10 dark:bg-black bg-white ">
                    {/* {list.map((todo) => ( */}
                    {filterTodos.map((todo) => (
                        <li
                            key={todo.id}
                            className="  border-b p-4 w-full bg-white text-lg flex items-center 
                            justify-between rounded-t-sm cursor-pointer dark:bg-gray-800
                             dark:border-amber-50 dark:text-white"
                        >
                            <div className="flex items-center ">
                                <span className="flex items-center">
                                    <input
                                        type="checkbox"
                                        // onClick={() => handleChack(todo.id)}
                                        onChange={(e) => handleChack(todo.id, e)}
                                        //  onChange={(e)=> handleChack(e.target.checked, todo.id)}
                                        checked={todo.isSelected}
                                        className="appearance-none w-5 h-5 rounded-full border-1 border-gray-500 mr-3
                                        checked:bg-blue-500 checked:border-blue-500 cursor-pointer
                                        checked:after:content-['✓'] checked:after:text-white 
                                        checked:after:block checked:after:text-center checked:after:leading-5"
                                    />
                                </span>
                                <span
                                    className={todo.isSelected ? "line-through text-gray-500" : undefined}>{todo.text}</span>
                            </div>
                            <span className="cursor-pointer " onClick={() => removeList(todo.id)}>
                                <img src="../public/icon-cross.svg" alt="cross-img" />
                            </span>
                        </li>
                    ))}
                    {list.length > 0 && (
                        <li className="border-b-1 p-4 w-full bg-white flex rounded-b-sm dark:bg-gray-800 dark:border-amber-50 dark:text-white ">
                            {/* < span className="w-1/3  text-sm">{list.length} items left </span> */}
                            < span className="lg:w-1/3 mx-auto sm:w-1/2 md:w-1/3 w-1/2  lg:text-sm flex-wrap  text-sm ">{list.length} items left </span>
                            <ul className="flex text-sm justify-end  lg:justify-start   ">
                                <li className="px-2 lg:pl-0 cursor-pointer sm:block hidden " onClick={() => setListCC("all")} >All</li>
                                <li className="px-2 lg:pl-0 cursor-pointer " onClick={() => setListCC("active")}>Active</li>
                                <li className="px-2 lg:pl-0 cursor-pointer " onClick={() => setListCC("completed")}>Completed</li>
                                <li className="pl-3 cursor-pointer " onClick={clearCompleted}>Clear completed</li>
                            </ul>
                        </li>
                    )
                    }



                </ul >
            </section >
        </>
    )
}


// add the fon-family not add 
