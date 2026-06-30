import { useEffect, useState } from 'react';
import './App.css';
import GiftList from './components/GiftList';
import UsersList from './components/UsersList';
import { getUsers } from './appwrite';

function App() {
   const [selectedUser, setSelectedUser] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [users, setUsers] = useState([]);

   useEffect(() => {
      const getAllUsers = async () => {
         setIsLoading(true);

         try {
            const allUsers = await getUsers();
            setUsers(allUsers);
         } catch (error) {
            console.log(`Error getting users: ${error}`);
         } finally {
            setIsLoading(false);
         }
      };

      getAllUsers();
   }, []);

   return (
      <>
         <header className="mb-7 md:mb-9">
            <img src="./site-icon.png" className="icon" alt="simple gift icon animation" />
            <h1 className="mt-3 text-4xl font-bold md:text-6xl">Family Gift Lists</h1>
         </header>

         <section className="wrapper">
            <UsersList
               users={users}
               isLoading={isLoading}
               setSelectedUser={setSelectedUser}
            />

            <GiftList selectedUser={selectedUser} />
         </section>
      </>
   );
}

export default App;