import User from "./User";

function UsersList({ users, isLoading, setSelectedUser }) {
    if (isLoading) {
        return <p>Loading users...</p>;
    }

    return (
        <section className="users-list">
            <h2 className="text-3xl font-bold mb-4 text-center md:text-left">Family Members</h2>

            {users.length === 0 ? (
                <p>No family members found.</p>
            ) : (
                <ul className="flex flex-wrap md:flex-col gap-2 justify-center">
                    {users.map((user) => (
                        <User
                            key={user.$id}
                            user={user}
                            setSelectedUser={setSelectedUser}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
}

export default UsersList;