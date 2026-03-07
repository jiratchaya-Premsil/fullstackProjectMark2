import {useAuthStore} from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const loginPage = () => {
    const Navigate = useNavigate();
   const {user, login} = useAuthStore();
    const handlesummit = (role) => {
        login({username: role + "User", role: role});
        Navigate('/profile');
    }
    return (
        <div className = "flex flex-col gap-4 p-6">
            Login
            <button onClick={() =>handlesummit('admin')} className = "bg-primary text-white p-4 rounded-lg"> login as admin </button>
            <button onClick={() => handlesummit('user')} className = "bg-primary text-white p-4 rounded-lg"> login as user </button>
            <Link to="/register/step-1">
                <button>Create New account</button>
            </Link>
            
        </div>

    )
}
export default loginPage;