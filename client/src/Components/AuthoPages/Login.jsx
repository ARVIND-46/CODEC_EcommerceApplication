import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../../styles/Arutho.css'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/authentication/login", { email, password });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.isAdmin) {
      window.location.href = "/admin"; 
    } else {
      window.location.href = `/home/${user._id}`;
    }
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
  };

  return (
    <div className="auth-container">
    <form onSubmit={handleSubmit} className="auth-form">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
    </div>
  );
};

export default Login;
