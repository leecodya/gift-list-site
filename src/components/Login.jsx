import { useState } from "react";
import { checkUserAccessCode } from "../appwrite";

function Login({ users, setCurrentUser }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [accessCode, setAccessCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (!selectedUser) {
            setErrorMessage("Please select your name.");
            return;
        }

        try {
            const valid = await checkUserAccessCode(
                selectedUser.$id,
                accessCode
            );

            if (valid) {
                setCurrentUser(selectedUser);
            } else {
                setErrorMessage(
                    "Incorrect access code. Please verify your name and try again."
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="login">
            <div className="container">
                <h2>Who are you?</h2>

                <select>
                    {users.map((user) => (
                        <option key={user.$id} onClick={() => setSelectedUser(user)}>
                            {user.name}
                        </option>
                    ))}
                </select>

                {selectedUser && (
                    <p>
                        Selected: <strong>{selectedUser.name}</strong>
                    </p>
                )}

                <form onSubmit={handleSignIn}>
                    <p className="mt-2">
                        <label htmlFor="access-code">
                            Access Code
                        </label>

                        <input
                            required
                            type="password"
                            id="access-code"
                            value={accessCode}
                            onChange={(e) =>
                                setAccessCode(e.target.value)
                            }
                        />
                    </p>

                    {errorMessage && (
                        <p>{errorMessage}</p>
                    )}

                    <button type="submit">
                        Continue
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Login;