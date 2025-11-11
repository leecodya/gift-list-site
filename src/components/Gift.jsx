import React, { useEffect, useState } from 'react'
import { updatePurchasedGift,hasThisGiftBeenPurchased } from '../appwrite';

function Gift({ gift }) {
    const [hasBeenPurchased, setHasBeenPurchased] = useState(false)
    
    const giftPurchased = async (giftID) => {
        try {
            await updatePurchasedGift(giftID);
            
            // setHasBeenPurchased(true)
        } catch (error) {
            console.log(error)
        }
    }

    const hasGiftBeenPurchased = async (giftID) => {
        try {
            const res = await hasThisGiftBeenPurchased(giftID)

            if (res === true) {
                setHasBeenPurchased(true)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        hasGiftBeenPurchased(gift.$id)
    }, [])
    
    useEffect(() => {
        document.body.addEventListener('click', () => {
            if (hasBeenPurchased == true) {
                giftPurchased(gift.$id)
            }
        })
    }, [hasBeenPurchased])
    
    return (
        <li className='gift'>
            {hasBeenPurchased
                ? <h2 className='text-3xl font-bold'><s>{gift.title}</s></h2>
                : <h2 className='text-3xl font-bold'>{gift.title}</h2>}


            {gift.gift_url && <a href={gift.gift_url} className="block mt-1" target='_blank'>{gift.gift_url}</a>}
        
            {hasBeenPurchased
                ? ''
                : <p className='actions mt-4'>
                    <button onClick={() => setHasBeenPurchased(true)} className='text-white'>Purchased</button>
                </p>}
        </li>
    )
}

export default Gift