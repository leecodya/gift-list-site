import { useEffect, useState } from 'react'
import './App.css'
import User from './components/User'
import GiftList from './components/GiftList';
import { getUsers } from './appwrite';
import Spinner from './components/Spinner';
// import { GiftProvider } from './contexts/GiftContext';

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

   // const dummy_users = [
   //    {
   //       id: "1",
   //       name: "Cody"
   //    },
   //    {
   //       id: "2",
   //       name: "Sammi Jo"
   //    },
   //    {
   //       id: "3",
   //       name: "Nicole"
   //    },
   //    {
   //       id: "4",
   //       name: "Sophia"
   //    },
   //    {
   //       id: "5",
   //       name: "Mike"
   //    },
   //    {
   //       id: "6",
   //       name: "Mom"
   //    },
   // ]

   return (
      <>
         <header className='mb-5'>
            <img src="./vite.svg" alt="" />
            <h1 className='mt-3 text-6xl font-bold'>Family Gift Lists</h1>
         </header>
         <section className='wrapper'>
            <section className='users-section'>
               <ul className='users-list'>
                  {isLoading ? (
                     <Spinner />
                  ) : users.map((user) => (
                     <User key={user.$id} user={user} setSelectedUserID={setSelectedUserID} />
                  ))}
               </ul>
            </section>

            <GiftList selectedUserID={selectedUserID} users={users} />
         </section>
      </>
   )
}

export default App
