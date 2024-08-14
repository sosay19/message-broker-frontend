// frontend/src/components/PublishMessageForm.jsx
import React, { useState } from 'react';

//const API_URL = import.meta.env.REACT_APP_API_URL;
const API_URL = "http://localhost:5000/api";

const PublishMessageForm = () => {
    const [topic, setTopic] = useState('');
    const [message, setMessage] = useState('');

    const handlePublish = async () => {
        if (topic && message) {
            const response = await fetch(`${API_URL}/publish`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, message }),
            });
            const data = await response.json();
            setTopic('');
            setMessage('');
        }
    };

    return (
        <div className="publish-message-form">
            <h2>Publish Message</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="topic">Topic:</label>
                    <input
                        type="text"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter topic..."
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <input
                        type="text"
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter message..."
                    />
                </div>
                <button type="button" onClick={handlePublish}>Publish Message</button>
            </form>
        </div>
    );
};

export default PublishMessageForm;
