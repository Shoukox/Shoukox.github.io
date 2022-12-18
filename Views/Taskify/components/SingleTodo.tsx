import React, { useEffect, useRef, useState } from 'react'
import "../styles.css"
import { Todo } from '../../../Models/TodoModel'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd'
interface Properties {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos:  (todos: Todo[]) => void;
}

const SingleTodo: React.FC<Properties> = ({ index, todo, todos, setTodos }: Properties) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);


    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)
        )
    };

    const handleDelete = (id: number) => {
        setTodos(
            todos.filter((todo) => (todo.id !== id))
        )
    }
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setTodos(todos.map((todo) => (
            todo.id === id ? { ...todo, todo: editTodo } : todo
        )));
        setEdit(false);
    };

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided, snapshot) => (
                    <form
                        className={`todos__single ${snapshot.isDragging ? "dragging": "" }`}
                        onSubmit={(e) => handleEdit(e, todo.id)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}>

                        {
                            edit ? (
                                <input className="todos__single_text" ref={inputRef} value={editTodo} onChange={(e) => setEditTodo(e.target.value)} />
                            ) :
                                todo.isDone ? (
                                    <s className="todos__single_text">{todo.todo}</s>
                                ) : (
                                    <span className="todos__single_text">{todo.todo}</span>
                                )
                        }

                        <div className="todos__single_icons">
                            <span className="todos__single_icons_icon"
                                onClick={() => {
                                    if (!edit && !todo.isDone) {
                                        setEdit(!edit);
                                    }
                                }}>
                                <AiFillEdit />
                            </span>
                            <span className="todos__single_icons_icon" onClick={() => handleDelete(todo.id)}>
                                <AiFillDelete />
                            </span>
                            <span className="todos__single_icons_icon" onClick={() => handleDone(todo.id)}>
                                <MdDone />
                            </span>
                        </div>
                    </form >
                )
            }

        </Draggable>
    )
}

export default SingleTodo