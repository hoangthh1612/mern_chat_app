import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosRequest } from "../../api/axios";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formvalues, setFormValues] = useState({
        username: '',
        email: '',
        password: ''
    });
    const handleRegister = async (e: any) => {
        e.preventDefault();
        try {
            await axiosRequest.post('/auth/register', formvalues);
            navigate('/login');

        } catch (error) {
            console.log(error);
        }
    }
    const handleChange = (e: any) => {
        const {value, name} = e.target;
        setFormValues((pre) => ({...pre, [name]: value}));
    }
  return (
    <div className="bg-gradient-to-tr from-fuchsia-300 to-sky-500">
      <div className="p-5 flex flex-col justify-center min-h-screen max-w-[500px] mx-auto">
        <div className="h-4/5 px-5 py-12 bg-sky-100 rounded">
          <div className="flex justify-center">
            <p className="text-2xl text-blue-500">Create account</p>
          </div>
          <form onSubmit={handleRegister} className="flex flex-col px-2 py-2">
            <div className="flex flex-col mb-3">
              <label className="text-[16px] font-medium" htmlFor="username">User name</label>
              <input
                className="px-1 py-1 border border-gray-400  rounded-[5px]
                                      shadow-sm
                                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                      "
                type="text"
                name="username"
                id="username"
                onChange={handleChange}

              />
            </div>
            <div className="flex flex-col mb-3">
              <label className="text-[16px] font-medium" htmlFor="email">Email</label>
              <input
                className="px-1 py-1 border border-gray-400  rounded-[5px]
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
                className="px-1 py-1 border border-gray-400  rounded-[5px]
                                      shadow-sm
                                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                      "
                type="password"
                name="password"
                id="password"
                onChange={handleChange}

              />
            </div>
            <div className="flex mt-5">
                <button className="px-3 py-1 border bg-blue-500 rounded-lg text-gray-100">Register</button>
            </div>
          </form>
          <div className="mt-3">
            <span>Do you already have an account ?</span>
            <Link className="text-blue-500 ml-2 underline" to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
