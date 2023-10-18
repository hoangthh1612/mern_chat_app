import React, { useEffect, useState } from "react";
import { axiosRequest } from "../../api/axios";

// type UserType = {
//   email: string;
//   followerins: Array;
//   followers: Array;
//   isAdmin: boolean;

// }
type PropsType = {
  conversation: any;
  currentUser: any;
}

const Conversation = ({ conversation, currentUser }: PropsType) => {
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        const friendId = conversation.members.find((m: any) => m !== currentUser._id);
        const getUser = async () => {
            try {
                const res = await axiosRequest.get(`/user/getUserById?userId=${friendId}`);
                setUser(res.data);
                
            } catch (error) {
                console.log(error);
                
            }
        }
        getUser();
        
    }, [currentUser, conversation])
    console.log(user);
    
  
    return (
    <div className="flex items-center cursor-pointer">
      <img
        className="h-[30px] w-[30px] rounded-[50%]"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7-d5qr9WzS926jiHDPlYrCL01Eb0M8C8c4w&usqp=CAU"
        alt=""
      />
      <p className="pl-2">{user?.username}</p>
    </div>
  );
};

export default Conversation;
