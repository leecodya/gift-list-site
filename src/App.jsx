import { useState } from 'react'
import './App.css'
import GiftList from './components/GiftList';
import UsersList from './components/UsersList';

function App() {
   const [selectedUserID, setSelectedUserID] = useState();
   // const [giftList, setGiftList] = useState([])

   return (
      <>
         <header className='mb-7 md:mb-9'>
            <img src="./site-icon.png" className='icon' alt="simple gift icon animation" />
            <h1 className='mt-3 text-4xl font-bold md:text-6xl'>Family Gift Lists</h1>
         </header>
         <section className='wrapper'>
            <UsersList setSelectedUserID={setSelectedUserID} />

            <GiftList selectedUserID={selectedUserID} />
         </section>
      </>
   )
}

export default App
