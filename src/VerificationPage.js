import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function VerificationPage() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState('');

    useEffect(() => {
        verifyEmail();
    }, []);

    const verifyEmail = () => {
        fetch(`/api/verify/${token}`)
            .then(response => {
                if (response.ok) {
                    setVerificationStatus('Email verification successful. You can now log in.');
                } else {
                    setVerificationStatus('Invalid verification token.');
                }
            })
            .catch(error => {
                console.error('Error verifying email:', error);
                setVerificationStatus('Error verifying email. Please try again later.');
            });
    };

    const handleLoginClick = () => {
        navigate('/login'); // Use navigate to redirect to login page
    };

    return (
        <div>
            <h2>Email Verification</h2>
            <p>{verificationStatus}</p>
            <button onClick={handleLoginClick}>Login</button>
        </div>
    );
}

export default VerificationPage;
