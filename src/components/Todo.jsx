import { useState } from "react"

export default function Todo() {
    const [list, setList] = useState([]);
    const [input, setInput] = useState("");
    // const [checkBox , setCheckBox] = useState(false);

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

    function handleChack(id) {
        setList((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, isSelected: !todo.isSelected } : todo
            )
        )
    }
   



    return (
        <>
            <section className="">
                <div className="bg-[url('../public/bg-desktop-light.jpg')] bg-cover h-70 pt-17">
                    <div className="w-1/3 mx-auto">
                        <div className="flex  justify-between  mx-auto items-center mb-12">
                            <h1 className="text-4xl text-white tracking-widest">TODO</h1>
                            <span className="cursor-pointer"> <img src="../public/icon-moon.svg" alt="moon-icon" /></span>
                        </div>
                        <form onSubmit={handleAddList}>
                            <input
                                className="p-4 w-full bg-white rounded"
                                type="text"
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </form>
                    </div>
                </div>
                <ul className="w-1/3  flex justify-center mx-auto flex-col border-0  outline-0 rounded-2xl -mt-10">


                    {list.map((todo) => (
                        <li key={todo.id} className="border-b p-4 w-full bg-white text-lg flex items-center justify-between rounded-t-sm">
                            <div className="flex items-center">
                                
                                <span>
                                        {/* <input 
                                        type="checkbox" 
                                         onClick={() => handleChack(todo.id)}  
                                         className="rounded-full border-2 border-blue-100 w-6 h-6 flex items-center justify-center mr-5 bg-black  " /> */}

                                    <input
                                        type="checkbox"
                                        className="
                                            appearance-none w-6 h-6 rounded-full border-2 border-blue-500 mr-3
                                            checked:bg-blue-500 checked:border-blue-500
                                            checked:after:content-['✓'] checked:after:text-white checked:after:block checked:after:text-center checked:after:leading-5"
                                        />




                                </span>
                                    {todo.isSelected && (
                                        <img className="" src="../public/icon-check.svg" alt="check-box-img" />
                                    )  }
                                    {/* <input className type="checkbox" /> */}
                                
                                <span className={todo.isSelected ?  "line-through text-gray-500" : undefined}>{todo.text}</span>
                            </div>
                            <span className="cursor-pointer " onClick={() => removeList(todo.id)}>
                                <img src="../public/icon-cross.svg" alt="cross-img" />
                            </span>
                        </li>
                    ))}
                    {list.length > 0 && (
                        <li className="border-b-1 p-4 w-full bg-white flex rounded-b-sm">
                            < span className="w-1/3 text-sm">{list.length} items left</span>
                            <ul className="flex text-sm justify-end  ">
                                <li className="px-2"><a href="">All</a></li>
                                <li className="px-2"><a href="">Active</a></li>
                                <li className="px-2"><a href="">Completed</a></li>
                                <li className="pl-3"><a href="">Clear completed</a></li>
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
