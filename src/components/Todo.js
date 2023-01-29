import React, { useEffect, useRef, useState } from 'react'
import todo from '../images/todo-icon.png'
import './Todo.css';
import Popup from './Popup';

const getLocalStorage1 = () => {
    let list1 = localStorage.getItem('tasksInProgress');

    if (list1) {
        return JSON.parse(list1)
    }
    else {
        return []
    }
}
const getLocalStorage2 = () => {
    let list2 = localStorage.getItem('tasksCompleted');
    if(list2){
        return JSON.parse(list2)
    }
    else{
        return []
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState('')
    // const [newData, setNewData] = useState('')

    const [items, setItems] = useState(getLocalStorage1())
    const [completedItems, setCompletedItems] = useState(getLocalStorage2())

    const [removePopupTrigger, setRemovePopupTrigger] = useState(false)
    const [completePopupTrigger, setCompletePopupTrigger] = useState(false)
    const [removeEmptyListTrigger, setRemoveEmptyListTrigger] = useState(false)
    const [completeEmptyListTrigger, setCompleteEmptyListTrigger] = useState(false)
    // const [editTaskTrigger, setEditTaskTrigger] = useState(false)

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
    // const activateEdit = (id) => {
    //     setEditTaskTrigger(true)
    //     editTask(id)
    // }
    
    const completeItem = (id) => {
        const updatedItems = items.filter((element, index) => {
            return index === id
        })
        setCompletedItems([...completedItems, updatedItems])
        deleteItem(id)
    }

    useEffect(() => {
        localStorage.setItem('tasksInProgress', JSON.stringify(items))
    }, [items]);
    
    useEffect(() => {
        localStorage.setItem('tasksCompleted', JSON.stringify(completedItems))
    }, [completedItems])
    const deleteAllItems = () => {
        setItems([])
        setCompletedItems([])
        setRemovePopupTrigger(false)
    }
    const completeAllItems = () => {
        setCompletedItems([...completedItems, ...items])
        setItems([])
        setCompletePopupTrigger(false)
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
                            spellCheck='true' />
                        <button className='add-button' title='Add Item' onClick={() => addItem(inputData)}>Add</button>
                    </div>

                    <div className='showItems'>
                        <div className='task-in-progress-box' style={items.length !== 0 ? {display: 'block'} : {display:'none'}}>
                            <span className='task-status'>Task to perform</span>
                            {
                                items.map((element, index) => {
                                    return (
                                        <div className='eachItem' key={index}>
                                            <i className='far fa-square complete-icon' title='Mark as Complete' onClick={() => completeItem(index)}></i>
                                            <span>{element}</span>
                                            {/* <i className='fas fa-edit edit-icon' title='Edit task' onClick={() => activateEdit(index)}></i> */}
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
                                            <i className='fa fa-check-circle complete-icon' title='Mark as incomplete' onClick={() => undoComplete(index)}></i>
                                            <span>{element}</span>
                                            {/* <i className='fas fa-edit edit-icon' title='Edit task' onClick={() => activateEdit(index)}></i> */}
                                            <i className='far fa-trash-alt delete-icon' title='Delete Item' onClick={() => deleteCompletedItem(index)}></i>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className='showItems'>
                        <Popup trigger={removePopupTrigger}>
                            <h3>Are you sure?</h3>
                            <p>Would you like to remove all the items from the list? This action cannot be undone</p> <br />
                            <button className='remove-btn' style={{ width: '4rem', margin: '0 0.5rem' }} onClick={deleteAllItems}>Yes</button>
                            <button className='remove-btn' style={{ width: '4rem', margin: '0 0.5rem' }} onClick={() => setRemovePopupTrigger(false)}>No</button>
                        </Popup>
                        <Popup trigger={removeEmptyListTrigger}>
                            <h3>Empty list</h3>
                            <p>There is nothing in the list</p>
                            <button className='remove-btn' onClick={() => setRemoveEmptyListTrigger(false)}>Close</button>
                        </Popup>

                        <Popup trigger={completePopupTrigger}>
                            <h3>Are you sure?</h3>
                            <p>Would you like to complete all the items from the list?</p> <br />
                            <button className='remove-btn' style={{ width: '4rem', margin: '0 0.5rem' }} onClick={completeAllItems}>Yes</button>
                            <button className='remove-btn' style={{ width: '4rem', margin: '0 0.5rem' }} onClick={() => setCompletePopupTrigger(false)}>No</button>
                        </Popup>
                        <Popup trigger={completeEmptyListTrigger}>
                            <h3>Empty list</h3>
                            <p>There is no task in progress</p>
                            <button className='remove-btn' onClick={() => setCompleteEmptyListTrigger(false)}>Close</button>
                        </Popup>

                        {/* <Popup trigger={editTaskTrigger}>
                            <h3>Edit Task</h3>
                            <input type='text' id='input-field' placeholder='✍ Add Items...'
                            value={newData}
                            onChange={(e) => setInputData(e.target.value)}
                            ref={textInput}
                            autoFocus
                            autoComplete='off'
                            autoCorrect='false'
                            spellCheck='false' />

                            <button className='remove-btn' onClick={editTask}>Save</button>
                            <button className='remove-btn' onClick={() => setEditTaskTrigger(false)}>Close</button>
                        </Popup> */}


                        <button className='remove-btn' onClick={() => {
                            items.length !== 0 || completedItems.length !== 0
                                ? setRemovePopupTrigger(true)
                                : setRemoveEmptyListTrigger(true)
                        }} title='Remove all the tasks'>Remove All</button>

                        <button className='remove-btn' style={{ width: '8rem', margin: '0 0.5rem' }} onClick={() => {
                            items.length !== 0
                                ? setCompletePopupTrigger(true)
                                : setCompleteEmptyListTrigger(true)
                        }} title='Mark as complete all the tasks'>Complete All</button>

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