import React, { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

const Message = () => {
    const { message } = useContext(MessageContext);
    const getStyle = () => {
        let baseClass = "alert ";

        if (message.message.msgError) {
            baseClass = baseClass + "alert-danger";
        } else {
            baseClass = baseClass + "alert-success";
        }
        return baseClass;
    } 
    return (
            <div className={getStyle()} role="alert">
                { message.message.msgBody }
            </div>
    )
}

export default Message;