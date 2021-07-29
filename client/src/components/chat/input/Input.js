import React from 'react';
import './Input.css';

const Input = ({ message, setMessage, sendMessage }) => {
    return (
        <div>
            <form action="" onSubmit={sendMessage} className="form" >
                <input
                    type="text"
                    className="input"
                    placeholder="Type a message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
                />
                <button className="sendButton" >Send Message</button>
            </form>
        </div>
    )
}

export default Input
