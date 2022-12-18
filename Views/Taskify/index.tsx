import InputField from './components/InputField'
import TodoList from './components/TodoList'
import { Todo } from '../../Models/TodoModel';
import "./styles.css";
import { User } from '../../Models/UserModel';

interface Properties {
    user: User;
    todo: string;
    todos: Todo[];
    setUser:  (user: User) => void;
    setTodo: (todo: string) => void;
    setTodos:  (todos: Todo[]) => void;
}

const Index: React.FC<Properties> = ({ user, todo, todos, setUser, setTodo, setTodos }: Properties) => {
    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (todo) {
            setTodos([...todos, { userId:user.id, id: Date.now(), todo: todo, isDone: false }]);
            setTodo("");
        }
    };

    return (
        <>
            <span className="heading">Taskify [{user.name}]</span>
            <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
            <TodoList todos={todos} setTodos={setTodos} />
        </>
    )
}

export default Index