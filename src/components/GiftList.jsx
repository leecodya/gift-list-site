import React, { useEffect } from 'react'
import { useState } from 'react';
import Gift from './Gift'
import AddGift from './AddGift';
import Spinner from './Spinner';
import { getGiftsByUser } from '../appwrite';

function GiftList({ selectedUserID, users }) {
    const [openAddGiftModal, setOpenAddGiftModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [giftList, setGiftList] = useState([])

    const getGiftList = async (selectedUserID) => {
        setIsLoading(true)
        try {
            const gifts = await getGiftsByUser(selectedUserID);

            setGiftList(gifts)
        } catch (error) {
            console.log(`Error getting gifts by user: ${error}`)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getGiftList(selectedUserID);
    }, [selectedUserID, openAddGiftModal])

    /*const dummy_gifts = [
        {
            id: 1,
            userID: "2",
            title: "Hairspray",
            url: "https://google.com",
            date_added: "2025-11-07",
            has_been_purchased: false
        },
        {
            id: 2,
            userID: "1",
            title: "Rugby shirt",
            url: "https://google.com",
            date_added: "2025-11-02",
            has_been_purchased: false
        },
        {
            id: 3,
            userID: "2",
            title: "Curtains",
            url: "https://google.com",
            date_added: "2025-11-03",
            has_been_purchased: false
        },
        {
            id: 4,
            userID: "3",
            title: "Dog shampoo",
            url: "https://google.com",
            date_added: "2025-11-04",
            has_been_purchased: false
        },
        {
            id: 5,
            userID: "1",
            title: "Water filter",
            url: "https://google.com",
            date_added: "2025-11-05",
            has_been_purchased: false
        },
    ]*/

    function getUserNameByID(id) {
        return users.filter(user => user.$id == id)[0].name
    }

    return (
        <>
            <section className='gift-list-section'>
                {selectedUserID
                    &&
                    <header>
                        <h2 className='text-4xl font-bold'>{getUserNameByID(selectedUserID)}'s Gift List</h2>
                        <button onClick={() => setOpenAddGiftModal(true)}>Add Gift</button>
                    </header>
                }
                {isLoading ? (
                    <Spinner />
                ) : selectedUserID
                    ? <ul className='gift-list'>
                        {giftList.length > 0 
                        ? (giftList.map((updated_gift) => (
                            <Gift key={updated_gift.$id} gift={updated_gift} />
                        ))) : <p>No gifts have been added for {getUserNameByID(selectedUserID)}</p>}
                    </ul>
                    : <p className='no-selected-user'>No user has been selected yet.</p>
                }
            </section>
            {openAddGiftModal && <AddGift selectedUserID={selectedUserID} openAddGiftModal={openAddGiftModal} setOpenAddGiftModal={setOpenAddGiftModal} />}
        </>
    )
}

export default GiftList