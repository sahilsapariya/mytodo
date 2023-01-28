import React, { useEffect, useRef, useState } from 'react'
import todo from '../images/todo-icon.png'
import './Todo.css';
import Popup from './Popup';

const getLocalStorage = () => {
    let list = localStorage.getItem('lists');

    if (list) {
        return JSON.parse(list)
    }
    else {
        return []
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState('')

    const [items, setItems] = useState(getLocalStorage())
    const [completedItems, setCompletedItems] = useState([])

    const [popupTrigger, setPopupTrigger] = useState(false)
    const [emptyListTrigger, setEmptyListTrigger] = useState(false)

    const textInput = useRef(null)

    const addItem = (x) => {
        if (!x) { }
        else {
            setItems([...items, x])
            setInputData('')
        }
    }
    const undoComplete = (id) => {
        const updatedItems = completedItems.filter((element, index) => {
            return index === id
        })
        addItem(updatedItems)
        deleteCompletedItem(id)
    }
    const deleteItem = (id) => {
        const updatedItems = items.filter((element, index) => {
            return index !== id
        })
        setItems(updatedItems)
    }
    const deleteCompletedItem = (id) => {
        const updatedItems = completedItems.filter((element, index) => {
            return index !== id
        })
        setCompletedItems(updatedItems)
    }
    const editTask = (id) => {

    }
    const completeItem = (id) => {
        const updatedItems = items.filter((element, index) => {
            return index === id
        })
        setCompletedItems([...completedItems, updatedItems])
        deleteItem(id)
    }

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);

    useEffect(() => {
        textInput.current.focus()
    }, [])

    const deleteAllItems = () => {
        setItems([])
        setCompletedItems([])
        setPopupTrigger(false)
    }
    const completeAllItems = () => {
        setCompletedItems(items)
        setItems([])
        setPopupTrigger(false)
    }

    return (
        <>
            <div className='main-div'>
                <div className='child-div' style={{ 'margin-bottom': '6rem' }}>
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
                            autoComplete='off'
                            autoCorrect='false'
                            spellCheck='false' />
                        <button className='add-button' title='Add Item' onClick={() => addItem(inputData)}>Add</button>
                    </div>

                    <div className='showItems'>
                        <div className='task-in-progress-box' style={items.length !== 0 ? {display: 'block'} : {display:'none'}}>
                            <span className='task-status'>Task to perform</span>
                            {
                                items.map((element, index) => {
                                    return (
                                        <div className='eachItem' key={index}>
                                            <span>{element}</span>
                                            <i className='fas fa-edit edit-icon' title='Edit task' onClick={() => editTask(index)}></i>
                                            <i className='far fa-square complete-icon' title='Mark as Complete' onClick={() => completeItem(index)}></i>
                                            <i className='far fa-trash-alt delete-icon' title='Delete Item' onClick={() => deleteItem(index)}></i>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='completed-task-box'
                            style={completedItems.length !== 0 ? { display: 'block' } : { display: 'none' }}>
                            <span className='task-status'>Completed Task</span>
                            {
                                completedItems.map((element, index) => {
                                    return (
                                        <div className='eachItem-completed' key={index}>
                                            <span>{element}</span>
                                            <i className='fas fa-edit edit-icon' title='Edit task' onClick={() => editTask(index)}></i>
                                            <i className='fa fa-check-circle complete-icon' title='Mark as incomplete' onClick={() => undoComplete(index)}></i>
                                            <i className='far fa-trash-alt delete-icon' title='Delete Item' onClick={() => deleteCompletedItem(index)}></i>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className='showItems'>
                        <Popup trigger={popupTrigger}>
                            <h3>Are you sure?</h3>
                            <p>Would you like to remove all the items from the list? This action cannot be undone</p> <br />
                            <button className='remove-btn' style={{ width: '4rem', margin: '0 0.5rem' }} onClick={deleteAllItems}>Yes</button>
                            <button className='remove-btn' style={{ width: '4rem', margin: '0 0.5rem' }} onClick={() => setPopupTrigger(false)}>No</button>
                        </Popup>
                        <Popup trigger={emptyListTrigger}>
                            <h3>Empty list</h3>
                            <p>There is no any items added to the list</p>
                            <button className='remove-btn' onClick={() => setEmptyListTrigger(false)}>Close</button>
                        </Popup>



                        <Popup trigger={popupTrigger}>
                            <h3>Are you sure?</h3>
                            <p>Would you like to complete all the items from the list?</p> <br />
                            <button className='remove-btn' style={{ width: '4rem', margin: '0 0.5rem' }} onClick={completeAllItems}>Yes</button>
                            <button className='remove-btn' style={{ width: '4rem', margin: '0 0.5rem' }} onClick={() => setPopupTrigger(false)}>No</button>
                        </Popup>
                        <Popup trigger={emptyListTrigger}>
                            <h3>Empty list</h3>
                            <p>There is no any items added to the list</p>
                            <button className='remove-btn' onClick={() => setEmptyListTrigger(false)}>Close</button>
                        </Popup>



                        <button className='remove-btn' onClick={() => {
                            items.length !== 0 || completedItems.length !== 0
                                ? setPopupTrigger(true)
                                : setEmptyListTrigger(true)
                        }} title='Remove all the tasks'>Remove All</button>
                        <button className='remove-btn' style={{ width: '8rem', margin: '0 0.5rem' }} title='Mark as complete all the tasks' onClick={() => {
                            items.length !== 0
                                ? setPopupTrigger(true)
                                : setEmptyListTrigger(true)
                        }}>Complete All</button>
                    </div>
                </div>

            </div>
                <footer>
                    Copyright &copy; 2023 | <a href='https://sahilsapariya03.netlify.app' rel="noreferrer" target='_blank'>Sahil Sapariya</a>
                </footer>
        </>
    )
}

export default Todo