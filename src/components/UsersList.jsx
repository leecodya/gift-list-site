import React from 'react'
import { getUsers } from '../appwrite';
import Spinner from './Spinner';
import User from './User';
import { useEffect, useState } from 'react'

function UsersList({ setSelectedUserID }) {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([])

    const getAllUsers = async () => {
        setIsLoading(true)
        try {
            const allUsers = await getUsers();

            setUsers(allUsers)
        } catch (error) {
            console.log(`Error getting users: ${error}`)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <section className='users-section'>
            <ul className='users-list'>
                {isLoading ? (
                    <Spinner />
                ) : users.map((user) => (
                    <User
                        key={user.$id}
                        user={user}
                        value={user.name}
                        onClick={() => console.log(user.name)}
                        setSelectedUserID={setSelectedUserID} />
                ))}
            </ul>
        </section>
    )
}

export default UsersList