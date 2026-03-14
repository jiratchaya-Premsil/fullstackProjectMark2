import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
const navigate = useNavigate();
const { login } = useAuthStore();

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = (e) => {
e.preventDefault();


let role = "user";

if (username.toLowerCase().includes("admin")) {
  role = "admin";
}

login({
  username: username,
  role: role,
});

navigate("/profile");


};

return ( <div className="flex flex-col gap-4 p-6 w-full justify-center items-center"> <h2 className="text-xl font-bold">Login</h2>


  <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-1/2">

    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="border p-2 rounded"
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="border p-2 rounded"
    />

    <button
      type="submit"
      className="bg-primary text-white p-3 rounded-lg"
    >
      Login
    </button>

  </form>
  <div className = "flex gap-2">
    dont have account?
  <Link to="/register/step-1">
    <button className="underline text-primary">Create New Account</button>
  </Link>
  </div>

</div>


);
};

export default LoginPage;
