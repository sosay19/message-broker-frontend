import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const API_URL = "http://localhost:5000";
let socket;

const RecentMessages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket = io(API_URL, {
            transports: ['websocket'],  // Ensure WebSocket transport is used
            reconnection: true,         // Enable automatic reconnection
        });

        socket.on('new_message', (message) => {
            setMessages(prevMessages => [message, ...prevMessages].slice(0, 10));
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="recent-messages">
            <h2>Recent Messages</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index} className="message-item">
                        <strong>Topic:</strong> {msg.topic} <br />
                        <strong>Message:</strong> {msg.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentMessages;
