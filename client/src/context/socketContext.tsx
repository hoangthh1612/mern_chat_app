import { createContext, useEffect, useMemo, useState } from "react";
import {io} from "socket.io-client";
const SOCKET_URL='http://localhost:9090'

export const SocketContext = createContext<any>(null);

export const SocketProvider = ({children}: {children : any}) => {
    const socket = useMemo(() => io(SOCKET_URL), []);
    
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}