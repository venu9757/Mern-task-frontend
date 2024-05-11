import { useState } from "react";
import axios from "axios";
const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const config = {
        url: "/login/userlogin",
        method: "post",
        baseURL: "http://localhost:8080/api",
        headers: { "content-type": "application/json" },
        data: {
          UserName: userName,
          Password: Password,
        },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert(res.data.success);
          sessionStorage.setItem("user", JSON.stringify(res.data.details));
          window.location.assign("/");
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
    console.log(userName, Password);
  };

  return (
    <div className="container">
      <form action="" className="login-form">
        <h1 className="login-text">Login</h1>
        <div>
          <label htmlFor="username">UserName:</label>
          <input
            type="text"
            id="username"
            requried="true"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            requried="true"
            id="password "
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button id="submit" className="login-btn"  onClick={loginUser}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
