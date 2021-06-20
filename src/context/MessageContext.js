import React, { createContext, useState } from 'react'

export const MessageContext = createContext()

const MessageContextProvider = ( props ) => {
    const [ message, setMessage ] = useState( {} )

    function handleSetMessage( type, text ) {
        setMessage( { type, text } )

        setTimeout( () => {
            setMessage( {} )
        }, 3000 )
    }
    return (
        <MessageContext.Provider value={{ message, handleSetMessage }}>
            {props.children}
        </MessageContext.Provider>
    )
}

export default MessageContextProvider


