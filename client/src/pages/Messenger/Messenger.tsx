import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { axiosRequest } from "../../api/axios";
import Conversation from "../../components/Conversation/Conversation";
import Message from "../../components/Message/Message";
import { SocketContext } from "../../context/socketContext";
import ChatOnline from "../../components/ChatOnline/ChatOnline";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<any>([]);
  const [userChat, setUserChat] = useState<any>(null);
  const [allUsers, setAllUsers] = useState<any>(null);
  const scrollRef = useRef<any>();
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axiosRequest.get("/user");
        setAllUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);
  console.log(allUsers);

  useEffect(() => {
    socket.emit("add-user", user._id);
    socket.on("get-users", (data: any) => {
      setOnlineUsers(data);
    });
  }, [user]);

  const getConversations = async () => {
    try {
      const res = await axiosRequest.get(`/conversation/${user._id}`);
      console.log(res.data);

      setConversations(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    socket.on("getMessage", (data: any) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket]);
  useEffect(() => {
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const friendId = currentChat?.members.find((m: any) => m !== user?._id);
        const getUser = async () => {
            try {
                const res = await axiosRequest.get(`/user/getUserById?userId=${friendId}`);
                setUserChat(res.data);
                
            } catch (error) {
                console.log(error);
                
            }
        }
        getUser();
  }, [currentChat])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axiosRequest.get(`/message/${currentChat?._id}`);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev: any) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat?.members?.find(
      (member: any) => member !== user._id
    );

    socket.emit("send-message", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axiosRequest.post("message/newMessage", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userChat);
  
  return (
    <>
      <div className="flex h-[calc(100vh-50px)]">
        <div className="flex-[3] p-2 border-r-[1px] overflow-y-scroll">
          {conversations?.map((c: any, index) => (
            <div className={`mb-3 py-1 px-2 rounded-xl ${currentChat?._id === c?._id && ` bg-gray-200`}`} onClick={() => setCurrentChat(c)} key={index}>
              <Conversation 
                conversation={c} 
                currentUser={user} 
    
              />
            </div>
          ))}
        </div>

        <div className="flex-[7]">
          <div className="flex flex-col justify-between h-[95%] relative">
          {currentChat ? (
            <>
              <div className="bg-slate-100 min-h-[50px] p-2">
                <div className="flex items-center">
                  <img
                  className="h-[30px] w-[30px] object-cover rounded-[50%]"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBWcPocTLeayR_TpVy7oRjP8U4y9xQTlgPfg&usqp=CAU"
                  alt=""
                />
                  <span className="ml-3 font-bold">
                  {userChat?.username}
                  </span>  
                </div>  
              </div>
              <div className="px-2 py-2 overflow-y-scroll h-full">
                {messages?.map((m: any, index: number) => (
                  <div key={index} ref={scrollRef}>
                    <Message message={m} own={m.sender === user._id} />
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <form onSubmit={handleSubmit} className="flex items-center">
                  <input
                    className="w-[100%] px-1 py-[5px] border-[1px] border-blue-300 rounded-md focus:outline-none"
                    type="text"
                    name="message"
                    id=""
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  <button className="ml-2 px-2 py-1 border border-collapse bg-blue-500 text-white rounded-[10px]">
                    Send
                  </button>
                </form>
              </div>
            </>
          ) : (
            <>
              <span className="text-center">
                Open a conversation to start a chat.
              </span>
            </>
          )}
          </div>
        </div>

        <div className="flex-[3.5] p-2 border-l-[1px]">
          <div className="flex flex-col">
            {allUsers
              ?.filter((u: any) => u._id !== user._id)
              .map((u: any, index: number) => (
                <ChatOnline
                  key={index}
                  onlineUsers={onlineUsers}
                  user={u}
                  currentId={user._id}
                  setCurrentChat={setCurrentChat}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
