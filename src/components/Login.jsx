import React, { useState } from 'react';
import { checkUserAccessCode } from '../appwrite';
import UsersList from './UsersList';
import User from './User';

function Login({ users, isLoading, setSelectedUser, setLoggedInUser, selectedUser }) {
    // const [userToBeSignedIn, setUserToBeSignedIn] = useState(selectedUser);
    const [accessCode, setAccessCode] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (!selectedUser) {
            console.log('Please select a user first.');
            return;
        }

        try {
            let result = await checkUserAccessCode(selectedUser.$id, accessCode);
            setLoggedInUser(result)
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <section className="login">
            <div className="container">
                {users.length === 0 ? (
                    <p>No family members found.</p>
                ) : (
                    <ul>
                        {users.map((user) => (
                            <User
                                key={user.$id}
                                user={user}
                                setSelectedUser={setSelectedUser}
                            />
                        ))}
                    </ul>
                )}
                <form onSubmit={handleSignIn}>
                    <p className="mt-2">
                        <label htmlFor="access-code">Access Code*</label>
                        <input
                            required
                            type="text"
                            id="access-code"
                            name="access-code"
                            value={accessCode}
                            style={{ border: '1px solid white', borderRadius: '5px', marginLeft: '10px' }}
                            onChange={(e) => setAccessCode(e.target.value)}
                        />
                    </p>
                    <p className="actions">
                        <button type="submit">Sign In</button>
                    </p>
                </form>
            </div>
        </section>
    )
}

export default Login