import React from 'react'

function User({ user, setSelectedUserID }) {
    return (
        <li>
            <button onClick={() => setSelectedUserID(user.$id)}>
                {user.name}
            </button>
        </li>
    )
}

export default User