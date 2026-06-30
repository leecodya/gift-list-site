import React, { useState } from 'react';
import { updatePurchasedGift } from '../appwrite';

function Gift({ gift }) {
    const [hasBeenPurchased, setHasBeenPurchased] = useState(gift.has_been_purchased);

    const handlePurchase = async () => {
        try {
            await updatePurchasedGift(gift.$id);
            setHasBeenPurchased(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <li className="gift">
            <div className="title-area">
                <h3 className="text-2xl md:text-3xl font-bold">
                    {hasBeenPurchased ? <s>{gift.title}</s> : gift.title}
                </h3>

                <span className="text-2xl">${gift.price}</span>
            </div>

            {gift.gift_url && (
                <a
                    href={gift.gift_url}
                    className="block mt-1"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Click here for the specific gift page
                </a>
            )}

            {gift.notes && (
                <>
                    <h4 className="text-2xl font-bold mt-2">Notes:</h4>
                    <p className="notes">{gift.notes}</p>
                </>
            )}

            {!hasBeenPurchased && (
                <div className="actions mt-4">
                    <p className="text-lg font-bold">Have you bought this gift?</p>
                    <button onClick={handlePurchase} className="text-white mt-2">
                        Yes
                    </button>
                </div>
            )}
        </li>
    );
}

export default Gift;