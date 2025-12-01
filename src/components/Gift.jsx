import React, { useEffect, useState } from 'react'
import { updatePurchasedGift, hasThisGiftBeenPurchased } from '../appwrite';

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
            <div className='title-area'>
                {hasBeenPurchased
                    ? <h3 className='text-2xl md:text-3xl font-bold'><s>{gift.title}</s></h3>
                    : <h3 className='text-2xl md:text-3xl font-bold'>{gift.title}</h3>}

                <span className='text-2xl'>${gift.price}</span>
            </div>

            {gift.gift_url && <a href={gift.gift_url} className="block mt-1" target='_blank'>Click here for the specific gift page</a>}

            {gift.notes && (
                <>
                    <h4 className='text-2xl font-bold mt-2'>Notes:</h4>
                    <p className='notes'>{gift.notes}</p>
                </>
            )}

            {hasBeenPurchased
                ? ''
                : <div className='actions mt-4'>
                    <p className='text-lg font-bold'>Have you bought this gift?</p>
                    <button onClick={() => setHasBeenPurchased(true)} className='text-white mt-2'>Yes</button>
                </div>}
        </li>
    )
}

export default Gift