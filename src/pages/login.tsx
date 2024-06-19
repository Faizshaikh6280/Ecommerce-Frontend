import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { useLoginMutation } from "../redux/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types/type";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useLoginMutation();

  async function loginHandlerByProvider() {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      console.log(user);
      const res = await login({
        id: user.uid,
        isByProvider: true,
      });

      if ("data" in res) {
        console.log(res);
        dispatch(setUser(res.data.data));
        navigate("/");
        toast.success(`Welcom ${res.data.data.name}!`);
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
      }
    } catch (error) {
      toast.error("Sign in Fail.");
    }
  }

  async function loginHandler(e) {
    try {
      e.preventDefault();
      const res = await login({
        email,
        password,
      });

      if ("data" in res) {
        console.log(res);
        setEmail("");
        setPassword("");
        dispatch(setUser(res.data.data));
        navigate("/");
        toast.success(`Welcom ${res.data.data.name}`);
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
      }
    } catch (error) {
      toast.error("Login in Fail.");
    }
  }

  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>
        <form action="" onSubmit={loginHandler}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button type="submit">
              <span>Log in </span>
            </button>
          </div>
        </form>
        <div>
          <button onClick={loginHandlerByProvider}>
            <FcGoogle /> <span>Log in with Google</span>
          </button>
        </div>
        <div>
          <span>Don't have account?</span>
          <NavLink to="/auth/signup">Signup </NavLink>
        </div>
      </main>
    </div>
  );
};

export default Login;
