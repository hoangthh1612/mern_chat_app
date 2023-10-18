import React from "react";
import { format } from "timeago.js";


const Message = ({message, own} : {message: any, own: boolean}) => {
  
  return (
    <div className={`flex flex-col p-2 mb-3` + `${own && ` justify-end items-end`}`}>
      <div className="flex items-center">
        <img
          className="h-[30px] w-[30px] object-cover rounded-[50%]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7-d5qr9WzS926jiHDPlYrCL01Eb0M8C8c4w&usqp=CAU"
          alt=""
        />
        <p className={`${own ? `bg-blue-400 ` : "bg-gray-200 "}` +  `max-w-[300px] rounded-3xl px-2 py-3`}>
          {message.text}
        </p>
      </div>
      <span>{format(message.createdAt)}</span>
    </div>
  );
};

export default Message;
