import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginCall } from "../../api/apiCall";
import { AuthContext } from "../../context/authContext";
import { axiosRequest } from "../../api/axios";

const LoginPage = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });
    console.log(formValues);
    
    //const {isFetching, user, dispatch} = useContext(AuthContext);
    //console.log(user);
    const {isFetching, dispatch, user, error} = useContext(AuthContext);
    console.log(user);
    useEffect(() => {
      if(user) navigate('/');
    }, [user])
    const handleChange = (e:any) => {
        const {value, name} = e.target;
        setFormValues(pre => ({...pre, [name]: value}))
    }
    const handleLogin = async (e: any) => {
        e.preventDefault();
        
        await loginCall(formValues, dispatch);
        console.log(user);
        
        //if(user) navigate('/');
        
        // try {
        //   const res =  await axiosRequest.post('/auth/login', formValues);
        //   console.log(res.data);
          
        // } catch (error) {
        //   console.log(error);
          
        // }

        
    }
  return (
    <div className="bg-gradient-to-tr from-fuchsia-300 to-sky-500">
      <div className="p-5 flex flex-col justify-center min-h-screen max-w-md mx-auto">
        <div className="p-6 bg-sky-100 rounded">
          <div className="flex justify-center">
            <p className="text-2xl text-blue-500">Login account</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col px-2 py-2">
            <div className="flex flex-col mb-3">
              <label className="text-[16px] font-medium" htmlFor="email">Email</label>
              <input
                className="px-1 py-1 border border-gray-400 w-[90%] rounded-[5px]
                                      shadow-sm
                                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                      "
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-3">
              <label className="text-[16px] font-medium" htmlFor="password">Password</label>
              <input
                className="px-1 py-1 border border-gray-400 w-[90%] rounded-[5px]
                                      shadow-sm
                                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                      "
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <div className="flex">
                <button className="px-3 py-1 border bg-blue-500 rounded-lg text-gray-100">{isFetching ? "Loading" : "Login"}</button>
            </div>
          </form>

          <div className="mt-3">
            <span>Do not have an account ?</span>
            <Link className="text-blue-500 ml-2 underline" to="/register">Register</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
