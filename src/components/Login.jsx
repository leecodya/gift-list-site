import { useState } from "react";
import { checkUserAccessCode } from "../appwrite";

function Login({ users, setCurrentUser }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [accessCode, setAccessCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUserChange = (e) => {
        const user = users.find((user) => user.$id === e.target.value);

        setSelectedUser(user || null);
        setAccessCode("");
        setErrorMessage("");
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (!selectedUser) {
            setErrorMessage("Please select your name.");
            return;
        }

        try {
            setIsSubmitting(true);
            setErrorMessage("");

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
            console.error(error);
            setErrorMessage(
                "Something went wrong while signing in. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl sm:p-8">
                <form onSubmit={handleSignIn} className="space-y-5">
                    <p className="mt-2 text-sm text-slate-400">
                        Select your name and enter your access code.
                    </p>
                    <div>
                        <label
                            htmlFor="family-member"
                            className="mb-2 block text-sm font-semibold text-slate-200"
                        >
                            Who are you?*
                        </label>

                        <select
                            id="family-member"
                            value={selectedUser?.$id || ""}
                            onChange={handleUserChange}
                            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                        >
                            <option value="">Select your name</option>

                            {users.map((user) => (
                                <option key={user.$id} value={user.$id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="access-code"
                            className="mb-2 block text-sm font-semibold text-slate-200"
                        >
                            Access Code*
                        </label>

                        <input
                            required
                            type="password"
                            id="access-code"
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                            placeholder="Enter your access code"
                            autoComplete="current-password"
                            className="w-full rounded-lg border border-slate-600 bg-slate px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                        />
                    </div>

                    {selectedUser && (
                        <p className="text-sm text-slate-400">
                            Signing in as{" "}
                            <strong className="text-white">
                                {selectedUser.name}
                            </strong>
                        </p>
                    )}

                    {errorMessage && (
                        <div
                            role="alert"
                            className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                        >
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="sign-in-btn w-full rounded-lg bg-[#912827] py-3 font-semibold text-white transition-all duration-200 hover:bg-[#FB7461] hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Signing In..." : "Sign In"}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Login;