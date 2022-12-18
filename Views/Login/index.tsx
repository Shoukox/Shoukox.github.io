import { NavigateFunction } from 'react-router-dom';
import { User } from '../../Models/UserModel';
import LoginWindow from './components/LoginWindow'
import "./styles.css"

interface Properties{
    user: User;
    setUser: (user: User) => void;
    navigate: NavigateFunction;
}

const Index:React.FC<Properties> = ({user, setUser, navigate}:Properties) => {
    return (
        <>
            <span className="heading">Taskify - Login</span>
            <LoginWindow user={user} setUser={setUser} navigate={navigate}/>
        </>
    )
}

export default Index