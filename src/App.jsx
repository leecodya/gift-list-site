import { useEffect, useState } from 'react'
import './App.css'
import User from './components/User'
import GiftList from './components/GiftList';
import { getUsers } from './appwrite';
import Spinner from './components/Spinner';

function App() {
   const [selectedUserID, setSelectedUserID] = useState();
   // const [giftList, setGiftList] = useState([])
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
      <>
         <header className='mb-7 md:mb-9'>
            <img src="./site-icon.png" className='icon' alt="simple gift icon animation" />
            <h1 className='mt-3 text-4xl font-bold md:text-6xl'>Family Gift Lists</h1>
         </header>
         <section className='wrapper'>
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

            <GiftList selectedUserID={selectedUserID} users={users} />
         </section>
      </>
   )
}

export default App
