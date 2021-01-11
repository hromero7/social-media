import React, { useState, createContext } from "react";

export const MessageContext = createContext();

export default ({ children }) => {
    const [message, setMessage] = useState("");

    return (
        <div>
            <MessageContext.Provider value={{
                message,
                setMessage
            }}>
                { children }
            </MessageContext.Provider>
        </div>
    )
}
