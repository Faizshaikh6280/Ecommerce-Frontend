import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { useSignupMutation } from "../redux/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types/type";
import { v4 as uuidv4 } from "uuid";
import { NavLink } from "react-router-dom";

const Signup = () => {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [signup] = useSignupMutation();

  async function signupHandlerByProvider() {
    try {
      const provider = new GoogleAuthProvider();

      const { user } = await signInWithPopup(auth, provider);

      const res = await signup({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        id: user.uid,
        dob: date,
        gender,
        isByProvider: true,
      });
      if ("data" in res) {
        toast.success(res.data.message);
        setDate("");
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
      }
    } catch (error) {
      toast.error("Sign up Fail.");
    }
  }

  async function signupHandler(e) {
    try {
      e.preventDefault();
      const res = await signup({
        name,
        email,
        id: uuidv4(),
        dob: date,
        gender,
        password,
        confirmPassword,
      });
      if ("data" in res) {
        console.log(res.data);
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setDate("");
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
      }
    } catch (error) {
      toast.error("Sign up Fail.");
    }
  }

  return (
    <div className="login">
      <main>
        <h1 className="heading">Signup</h1>
        <form action="" onSubmit={signupHandler}>
          <div>
            <label>Date of birth</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              required
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="text"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <button type="submit">Sign up</button>
          </div>
        </form>
        <div>
          <button onClick={signupHandlerByProvider}>
            <FcGoogle /> <span>Sign in with Google</span>
          </button>
        </div>
        <div>
          <span>Already have account? </span>
          <NavLink to="/auth/login">Login </NavLink>
        </div>
      </main>
    </div>
  );
};

export default Signup;
