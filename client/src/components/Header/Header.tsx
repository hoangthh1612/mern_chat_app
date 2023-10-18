import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <header className="bg-gradient-to-tr from-fuchsia-200 to-sky-300 h-[50px]">
      <div className="h-full flex items-center justify-between px-3">
        <p>Logo</p>
        <div className="flex items-center h-full">
          {!user && (
            <Link className="cursor-pointer" to="Login">
              Login
            </Link>
          )}
          <div className="mr-2 h-full flex items-center border-[1px]">
            <Link className="text-[#000080] px-2" to="/messenger">Messenger</Link>
          </div>
          {user && (
            <div className="relative inline-block hover:block dropdown">
              <div className="flex items-center cursor-pointer">
                <img className="h-[30px] w-[30px] rounded-[50%]" src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.2.155057169.1697441056&semt=ais" alt="picture-cover" />
                <span className="ml-2">{user && user.username}</span>
              </div>
              <div className="bg-white hidden absolute z-10 min-w-[160px] top-[32px] dropdown-content">
                <Link className="block pl-3 py-2 hover:bg-gray-200 hover:text-blue-500" to='/'>Account</Link>
                <Link className="block pl-3 py-2 hover:bg-gray-200 hover:text-blue-500" to='/'>Logout</Link>

              </div>
          </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
