import React, { useEffect, useRef, useState } from 'react'
import todo from '../images/todo-icon.png'
import '../Todo.css';


const getLocalStorage = () => {
    let list = localStorage.getItem('lists');

    if(list){
        return JSON.parse(list)
    }
    else{
        return []
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState('')
    const [items, setItems] = useState(getLocalStorage())
    const textInput = useRef(null)
    const addItem = () => {
        if (!inputData) { }
        else {
            setItems([...items, inputData])
            setInputData('')
        }
    }

    const deleteItem = (id) => {
        const updatedItems = items.filter((element, index) => {
            return index !== id
        })

        setItems(updatedItems)
    }

    const removeAll = () => {
        setItems([])
    }
    
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);

    useEffect(() => {
        textInput.current.focus()
    }, [])

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src={todo} alt="todo logo" />
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>

                    <div className='addItems'>
                        <input type='text' id='input-field' placeholder='✍ Add Items...'
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                            ref={textInput}
                            autoFocus
                            autoComplete='false'
                            autoCorrect='false'
                            spellCheck='false'
                        />
                        <button className='add-button' title='Add Item' onClick={() => addItem()}>Add</button>
                    </div>

                    <div className='showItems'>
                        {
                            items.map((element, index) => {
                                return (
                                    <div className='eachItem' key={index}>
                                        <span>{element}</span>
                                        <i className='far fa-trash-alt add-btn' title='Delete Item' onClick={() => deleteItem(index)}></i>
                                    </div>
                                )
                            })
                        }
                    </div>


                    <div className='showItems'>
                        <button className='remove-btn' onClick={removeAll} title='Remove all the tasks'>Remove All</button>
                    </div>

                </div>
            <footer>
                Copyright &copy; 2023 | <a href='https://sahilsapariya03.netlify.app' rel="noreferrer" target='_blank'>Sahil Sapariya</a> 
            </footer>
            </div>
        </>
    )
}

export default Todo