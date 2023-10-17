'use client'

import { ToDoItem } from '@/app/data/types/todo/todoItem';
import React, { useEffect, useState } from 'react';
import './ToDoList.css';
import { Button, Checkbox, Modal } from 'flowbite-react';
import { getAllToDoItems, getToDo, deleteToDo, createToDo, updateToDo } from '@/app/data/services/toDoService';

export const ToDoListPage = () => {
    const [toDoList, setToDoList] = useState<ToDoItem[]>([]);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
    const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);
    const [toDoItem, setToDoItem] = useState<ToDoItem>();

    const [selectedDescription, setSelectedDescription] = useState<string>('');
    const [selectedIsDone, setSelectedIsDone] = useState<boolean>(false);

    const [newToDoDescription, setNewToDoDescription] = useState<string>('');
    const [newToDoIsDone, setNewToDoIsDone] = useState<boolean>(false);

    useEffect(() => {
        const data = async() => {
            const toDoItems = await getAllToDoItems();

            return toDoItems;
        };

        data().then((result) => {
            setToDoList(result![0]!.todoItems!.filter((item, 
                index) => result![0]!.todoItems!.indexOf(item) === index));
        });
    });

    const showToDoDetails = async(id: number) => {
        const data = await getToDo(id);

        if (data) {
            setToDoItem(data);

            setSelectedDescription(data.description);
            setSelectedIsDone(data.isDone);

            setIsDetailModalOpen(true);
        }
    }

    const deleteToDoItem = async(id: number) => {
        await deleteToDo(id);

        const data = async() => {
            const toDoItems = await getAllToDoItems();

            return toDoItems;
        };

        data().then((result) => {
            setToDoList(result![0]!.todoItems!.filter((item, 
                index) => result![0]!.todoItems!.indexOf(item) === index));
        });

        setIsDetailModalOpen(false);
    }

    const createToDoItem = async() => {
        await createToDo({
            description: newToDoDescription,
            isDone: newToDoIsDone
        });

        const data = async() => {
            const toDoItems = await getAllToDoItems();

            return toDoItems;
        };

        data().then((result) => {
            setToDoList(result![0]!.todoItems!.filter((item, 
                index) => result![0]!.todoItems!.indexOf(item) === index));
        });

        setIsNewModalOpen(false);
    }

    const updateToDoItem = async(id: number) => {
        await updateToDo(id, {
            description: selectedDescription,
            isDone: selectedIsDone
        });

        const data = async() => {
            const toDoItems = await getAllToDoItems();

            return toDoItems;
        };

        data().then((result) => {
            setToDoList(result![0]!.todoItems!.filter((item, 
                index) => result![0]!.todoItems!.indexOf(item) === index));
        });

        setIsDetailModalOpen(false);
    }

    return (
            <div className='mt-20 ml-10 w-[25%]'>
                <Modal id='detail-form' show={isDetailModalOpen} size="md" popup onClose={() => setIsDetailModalOpen(false)} className='text-center w-[100%]'>
                    <Modal.Header>
                        Details:
                    </Modal.Header>

                    <Modal.Body>
                        <div className="text-center bg-gray-50">
                            <form className='w-[100%]' onSubmit={async() => await updateToDoItem(toDoItem?.id as number)}>
                                <div className='w-[100%] float-right'>
                                    <label htmlFor="description">
                                        Description
                                    </label>

                                    <br/>

                                    <textarea id='description' value={selectedDescription} onChange={(e) => setSelectedDescription(e.target.value)} className="content-center" />
                                </div>

                                <br/>

                                <div className='w-[100%] float-right'>
                                    <label htmlFor="isDone" className='bg-black-200'>
                                        Is done
                                    </label>

                                    <input type='checkbox' id='isDone' className='ml-3' placeholder="Is done" checked={selectedIsDone} onChange={(e) => setSelectedIsDone(e.target.checked)} />
                                </div>

                                <br/>
                                    
                                <Button type="submit" color="default" outline>
                                    Save changes
                                </Button>

                                <Button color="red" outline onClick={async() => await deleteToDoItem(toDoItem?.id as number)}>
                                    Delete
                                </Button>
                             </form>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal id='create-todo-form' show={isNewModalOpen} size="md" popup onClose={() => setIsNewModalOpen(false)} className='text-center w-[100%]'>
                        <Modal.Header>
                            Create new ToDo item:
                        </Modal.Header>

                        <Modal.Body>
                            <div className="text-center bg-gray-50">
                            {/* onSubmit={async(event) => await handleSubmit(event)} */}
                                <form className='w-[100%]'>
                                    <div className='w-[100%] float-right'>
                                        <label htmlFor="description">
                                            Description
                                        </label>

                                        <br/>

                                        <textarea id='description' onChange={(e) => setNewToDoDescription(e.target.value)} className="content-center" />
                                    </div>

                                    <br/>

                                    <div className='w-[100%] float-right'>
                                        <label htmlFor="isDone">
                                            Is done
                                        </label>

                                        <Checkbox className='ml-3' placeholder="Is done" checked={newToDoIsDone} onChange={() => setNewToDoIsDone(!newToDoIsDone)} />
                                    </div>

                                    <br/>
                                    
                                    <Button color="default" outline onClick={async() => await createToDoItem()}>
                                        Save changes
                                    </Button>
                                </form>
                            </div>
                        </Modal.Body>
                </Modal>

                <Button color="default" className='outline mt-5'  onClick={() => setIsNewModalOpen(true)}>
                    Create new ToDo item
                </Button>

                {toDoList?.map(item => (
                    <div key={item.id} className='w-[100%]'>
                        <div>
                            <div className='bg-green-200'>
                                <div className='ml-5 mt-5'>
                                    {item.description}
                                </div>

                                <Checkbox placeholder="Is done" checked={item.isDone} />
                            </div>

                            <Button color="default" className='outline mt-5' onClick={async() => await showToDoDetails(item.id)}>
                                Details
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
    )
};