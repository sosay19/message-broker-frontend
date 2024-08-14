// src/App.jsx
import React from 'react';
import PublishMessageForm from './components/PublishMessageForm';
import RecentMessages from './components/RecentMessages';
import SubscriptionManagement from './components/SubscriptionManagement';
import './index.css'; // Import CSS for styling

const App = () => {
    return (
        <div className="app-container">
            <h1>Message Broker Dashboard</h1>
            <div className="content">
                <PublishMessageForm />
                <RecentMessages />
                <SubscriptionManagement />
            </div>
        </div>
    );
};

export default App;
