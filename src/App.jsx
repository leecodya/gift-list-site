import { useEffect, useState } from 'react';
import './App.css';
import GiftList from './components/GiftList';
import UsersList from './components/UsersList';
import { getUsers } from './appwrite';
import Login from './components/Login';
import Header from './components/Header';

function App() {
   const [selectedUser, setSelectedUser] = useState(null);
   const [currentUser, setCurrentUser] = useState(null);
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
         <Header currentUser={currentUser} />

         {!currentUser ? (
            <>
               <Login
                  users={users}
                  setCurrentUser={setCurrentUser}
               />
            </>
         ) : (
            <section className='wrapper'>
               <UsersList
                  users={users}
                  isLoading={isLoading}
                  setSelectedUser={setSelectedUser}
               />

               <GiftList
                  currentUser={currentUser}
                  selectedUser={selectedUser}
               />
            </section>
         )}
      </>
   );
}

export default App;