import React, { useContext } from "react";
import { axiosRequest } from "../../api/axios";
import { SocketContext } from "../../context/socketContext";

type PropsType= {
    onlineUsers: any;
    user: any;
    currentId: any;
    setCurrentChat: any
}

const ChatOnline = ({onlineUsers, user, currentId, setCurrentChat}: PropsType) => {
    const {socket} = useContext(SocketContext);
    console.log(onlineUsers);
    
    console.log(onlineUsers.some((u: any) => u.userId === user._id));
    const handleClick = async(e: any, user: any) => {
        e.preventDefault();
        const res = await axiosRequest(`/conversation/${currentId}/${user._id}`);
        if(!res.data) {
            console.log("haha");
            
            socket.emit("add-conversation", {
                firstUserId: currentId,
                secondUserId: user._id
            })
            socket.on('get-conversation', (data: any) => {
                setCurrentChat(data)
            })
            return;
        } 
        setCurrentChat(res.data);
    }
  return (
    <div onClick={(e) => handleClick(e, user)} className="flex items-center cursor-pointer mt-[10px]">
      <div className="relative">
        <img
          className="h-[30px] w-[30px] object-cover rounded-[50%]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBWcPocTLeayR_TpVy7oRjP8U4y9xQTlgPfg&usqp=CAU"
          alt=""
        />
        {
            onlineUsers.some((u: any) => u.userId === user._id) && <i className={"bg-green-500 w-[10px] h-[10px] rounded-[50%] absolute top-[1px] right-[1px] chatOnlineBadge"}></i>
        }
      </div>
      <span className="ml-2">{user.username}</span>
    </div>
  );
};

export default ChatOnline;
