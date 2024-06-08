import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {auth} from "../../firebase";
import toast from "react-hot-toast";
import { useLoginMutation } from "../redux/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types/type";

const Login = () => {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  // const [password, setPassword] = useState("");
  // const [conifrmPassword, setConifrmPassword] = useState("");

  const [login] = useLoginMutation();

  async function loginHandler(){
    try {
      const provider = new GoogleAuthProvider();
      const {user} = await signInWithPopup(auth,provider);

    const res = await login({
        name : user.displayName,
        email : user.email,
        photo : user.photoURL,
        id : user.uid,
        dob : date,
        gender,
        isByProvider : true,
      });

    if("data" in res){
      toast.success(res.data.message);
    }else{
      const error = res.error as FetchBaseQueryError;
      const message = (error.data as MessageResponse).message
      toast.error(message);
    }
    } catch (error) {
      toast.error("Sign In Fail.")
    }
  }

  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>

        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label>Date of birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        {/* <div>
          <label>Password</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Date of birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div> */}

        <div>
          <p>Already Signed In Once</p>
          <button onClick={loginHandler}>
            <FcGoogle /> <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
