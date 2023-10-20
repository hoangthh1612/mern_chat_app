import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosRequest } from "../../api/axios";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState<any>(null);
    const [uploadImg, setUploadImg] = useState(false);
    const [imagePreview, setImagePreview] = useState<any>(null);
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: ''
    });

    const uploadImage = async (image:any) => {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'qgxrg9uu');
      try {
        setUploadImg(true);
        let res = await fetch('http://api.cloudinary.com/v1_1/hoangthh1612/image/upload', {
          method: "POST",
          body: data
        })
        const urlData = await res.json();
        setUploadImg(false);
        return urlData.url;
        
      } catch (error) {
        setUploadImg(false);
        console.log(error);
        
      }

    }

    const handleRegister = async (e: any) => {
        e.preventDefault();
        if(!image) alert('Please upload your picture');
        const url = await uploadImage(image); 
        console.log(url);
        const values = {...formValues, profilePicture: url};
        console.log(values);
        
        try {
            await axiosRequest.post('/auth/register', values);
            navigate('/login');

        } catch (error) {
            console.log(error);
        }
    }
    const handleChange = (e: any) => {
        const {value, name} = e.target;
        setFormValues((pre) => ({...pre, [name]: value}));
    }
  const validateImg = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    
  }
  return (
    <div className="bg-gradient-to-tr from-fuchsia-300 to-sky-500">
      <div className="p-5 flex flex-col justify-center min-h-screen max-w-[500px] mx-auto">
        <div className="h-4/5 px-5 py-12 bg-sky-100 rounded">
          <div className="flex justify-center mb-7">
            <p className="text-2xl text-blue-500">Create account</p>
          </div>
          <form onSubmit={handleRegister} className="flex flex-col px-2 py-2">
          <div className="flex items-center mb-3">
              <p className="text-[16px] font-medium  mr-5">Picture</p>
              <div className="relative border-[1px] w-[80px] h-[80px] rounded-[50%] border-gray-500  ">
                {image && (<img className="absolute w-full h-full rounded-[50%]" src={imagePreview} alt="picture"/>)}
                <input
                  className="hidden"
                  type="file"
                  name="picture"
                  id="picture"
                  onChange={validateImg}

                />
                <label className="absolute cursor-pointer bottom-[30%] left-[40%] text-red-400" htmlFor="picture">+</label>
              </div>
            </div>

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
