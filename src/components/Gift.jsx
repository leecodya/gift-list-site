import React, { useState } from 'react';
import { updatePurchasedGift } from '../appwrite';
import EditGift from './EditGift';

function Gift({ gift, currentUser, onGiftUpdated }) {
    const [openEditGiftModal, setOpenEditGiftModal] = useState(false);

    const handlePurchase = async () => {
        try {
            const updatedGift = await updatePurchasedGift(
                gift.$id,
                currentUser.$id,
                currentUser.name
            );

            onGiftUpdated(updatedGift)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <li className="gift">
                <div className="title-area">
                    <h3 className="text-2xl md:text-3xl font-bold">
                        {gift.has_been_purchased ? <s>{gift.title}</s> : gift.title}
                    </h3>

                    <span className="text-2xl">${gift.price}</span>

                    {currentUser.$id === gift.user_id && !gift.has_been_purchased && (
                        <button
                            type="button"
                            onClick={() => setOpenEditGiftModal(true)}
                        >
                            Edit
                        </button>
                    )}
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

                <span className="gift-priority font-bold italic">
                    Priority: {gift.priority ?? 3}
                </span>

                {gift.purchased_by_user_id &&
                    currentUser.$id !== gift.user_id && (
                        <p>
                            Purchased by:{' '}
                            <strong>{gift.purchased_by_name}</strong>
                        </p>
                    )}

                {!gift.has_been_purchased &&
                    currentUser.$id !== gift.user_id && (
                        <div className="actions mt-4">
                            <p className="text-lg font-bold">
                                Have you bought this gift?
                            </p>

                            <button
                                onClick={handlePurchase}
                                className="text-white mt-2"
                            >
                                Yes
                            </button>
                        </div>
                    )}
            </li>

            {openEditGiftModal && !gift.has_been_purchased && (
                <EditGift
                    gift={gift}
                    openEditGiftModal={openEditGiftModal}
                    setOpenEditGiftModal={setOpenEditGiftModal}
                    onGiftUpdated={onGiftUpdated}
                />
            )}
        </>
    );
}

export default Gift;