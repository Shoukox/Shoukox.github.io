import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../../../Models/TodoModel';
import SingeTodo from './SingleTodo';
import "../styles.css"

interface Properties {
    todos: Todo[];
    setTodos:  (todos: Todo[]) => void;
}

const TodoList: React.FC<Properties> = ({ todos, setTodos }: Properties) => {

    return (
        <div className="container container-taskify">
            <Droppable droppableId="TodosList">
                {
                    (provided, snapshot) => (
                        <div className={`todos ${snapshot.isDraggingOver ? "dragOnActive" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>

                            <span className="todos_heading">
                                Active Tasks
                            </span>
                            {todos.filter(m => !m.isDone).map((todo, index) => (
                                <SingeTodo
                                    index={index}
                                    todo={todo}
                                    key={todo.id}
                                    todos={todos}
                                    setTodos={setTodos} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>

            <Droppable droppableId="TodosListDone">
                {
                    (provided, snapshot) => (
                        <div className={`todos todos-done ${snapshot.isDraggingOver ? "dragOnDone" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>

                            <span className="todos_heading">
                                Completed Tasks
                            </span>
                            {todos.filter(m => m.isDone).map((todo, index) => (
                                <SingeTodo
                                    index={index}
                                    todo={todo}
                                    key={todo.id}
                                    todos={todos}
                                    setTodos={setTodos} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>

    )
}

export default TodoList