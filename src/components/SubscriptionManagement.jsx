// frontend/src/components/SubscriptionManagement.jsx
import React, { useState, useEffect } from 'react';

//const API_URL = import.meta.env.REACT_APP_API_URL;
const API_URL = "http://localhost:5000/api";

const SubscriptionManagement = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [newTopic, setNewTopic] = useState('');

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const fetchSubscriptions = async () => {
        const response = await fetch(`${API_URL}/subscriptions`);
        const data = await response.json();
        setSubscriptions(data.subscriptions);
    };

    const handleAddSubscription = async () => {
        if (newTopic) {
            const response = await fetch(`${API_URL}/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: newTopic }),
            });
            const data = await response.json();
            if (data.status === 'success') {
                fetchSubscriptions();
                setNewTopic('');
            } else {
                alert(data.message);
            }
        }
    };

    const handleRemoveSubscription = async (topic) => {
        const response = await fetch(`${API_URL}/unsubscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic }),
        });
        const data = await response.json();
        if (data.status === 'success') {
            fetchSubscriptions();
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="subscription-management">
            <h2>Subscription Management</h2>
            <div className="subscription-list">
                <ul>
                    {subscriptions.map((topic, index) => (
                        <li key={index} className="subscription-item">
                            <strong>Topic:</strong> {topic}
                            <button onClick={() => handleRemoveSubscription(topic)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="add-subscription">
                <input
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="Enter new topic..."
                />
                <button onClick={handleAddSubscription}>Add Subscription</button>
            </div>
        </div>
    );
};

export default SubscriptionManagement;
