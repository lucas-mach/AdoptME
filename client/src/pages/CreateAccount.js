import { useState } from 'react';

const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // For showing error message
    const [successMessage, setSuccessMessage] = useState(''); // For showing success message

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username, // Sending username
                    password, // Sending password
                    phone,    // Sending phone number
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // If the response is not OK (e.g., status 400), show the error message
                throw new Error(data.error); // Use error message from the backend
            }

            // If successful, display success message
            setSuccessMessage('Account created successfully!');
            setErrorMessage(''); // Clear any previous error messages
            setUsername('');      // Clear the form fields
            setPassword('');
            setPhone('');
        } catch (err) {
            // Catch the error and display the error message from the backend
            setErrorMessage(err.message);
            setSuccessMessage(''); // Clear the success message
        }
    };

    return (
        <div>
            <h1>Create Account</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display success message */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label htmlFor="phone">Phone:</label>
                <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <button type="submit">Create Account</button>
            </form>
        </div>
    );
};

export default CreateAccount;