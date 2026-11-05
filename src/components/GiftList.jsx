import { useEffect, useState } from 'react';
import Gift from './Gift';
import AddGift from './AddGift';
import EditGift from './EditGift';
import Spinner from './Spinner';
import { getGiftsByUser } from '../appwrite';

function GiftList({ currentUser, selectedUser }) {
    const [openAddGiftModal, setOpenAddGiftModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [giftList, setGiftList] = useState([]);
    var isOwnList = '';

    // Check if currentUser logged in is the selected user
    if (selectedUser) {
        isOwnList = currentUser.$id === selectedUser.$id;
    }

    const handleGiftUpdated = (updatedGift) => {
        setGiftList((currentGifts) =>
            currentGifts.map((gift) =>
                gift.$id === updatedGift.$id ? updatedGift : gift
            )
        );
    };

    // Creates two lists and sorts each by created date
    const sortGifts = (a, b) => {
        const priorityDifference = a.priority - b.priority;

        if (priorityDifference !== 0) {
            return priorityDifference;
        }

        return new Date(b.$createdAt) - new Date(a.$createdAt);
    };


    const availableGifts = giftList
        .filter((gift) => !gift.has_been_purchased)
        .sort(sortGifts);

    const purchasedGifts = giftList
        .filter((gift) => gift.has_been_purchased)
        .sort(sortGifts);

    useEffect(() => {
        if (!selectedUser?.$id) return;

        const getGiftList = async () => {
            setIsLoading(true);

            try {
                const gifts = await getGiftsByUser(selectedUser.$id);
                setGiftList(gifts);
            } catch (error) {
                console.log(`Error getting gifts by user: ${error}`);
            } finally {
                setIsLoading(false);
            }
        };

        getGiftList();
    }, [selectedUser?.$id, openAddGiftModal]);

    return (
        <>
            <section className="gift-list-section">
                {selectedUser?.$id ? (
                    <>
                        <header>
                            <h2 className="text-2xl md:text-4xl font-bold">
                                {selectedUser.name}'s Gift List
                            </h2>

                            {currentUser.$id === selectedUser.$id && (
                                <button onClick={() => setOpenAddGiftModal(true)}>
                                    Add Gift
                                </button>
                            )}
                        </header>

                        {isOwnList ? (
                            // Render all gifts together
                            <section>
                                <section>
                                    {isLoading ? (
                                        <Spinner />
                                    ) : giftList.length > 0 ? (
                                        <ul className="gift-list">
                                            {giftList.map((gift) => (
                                                <Gift
                                                    key={gift.$id}
                                                    gift={gift}
                                                    currentUser={currentUser}
                                                    onGiftUpdated={handleGiftUpdated}
                                                    isOwnList={isOwnList}
                                                />
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No available gifts.</p>
                                    )}
                                </section>
                            </section>
                        ) : (
                            // Render Available and Purchased sections
                            <>
                                <section>
                                    <h3 className="text-xl mb-3.5 md:text-3xl font-bold">Available Gifts</h3>
                                    {isLoading ? (
                                        <Spinner />
                                    ) : availableGifts.length > 0 ? (
                                        <ul className="gift-list">
                                            {availableGifts.map((gift) => (
                                                <Gift
                                                    key={gift.$id}
                                                    gift={gift}
                                                    currentUser={currentUser}
                                                    onGiftUpdated={handleGiftUpdated}
                                                />
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No available gifts.</p>
                                    )}
                                </section>
                                <section>
                                    <h3 className="text-xl mb-3.5 mt-7 md:text-3xl font-bold">Purchased Gifts</h3>
                                    {isLoading ? (
                                        <Spinner />
                                    ) : purchasedGifts.length > 0 ? (
                                        <ul className="gift-list">
                                            {purchasedGifts.map((gift) => (
                                                <Gift
                                                    key={gift.$id}
                                                    gift={gift}
                                                    currentUser={currentUser}
                                                    onGiftUpdated={handleGiftUpdated}
                                                />
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No purchased gifts.</p>
                                    )}
                                </section>
                            </>
                        )}
                    </>
                ) : (
                    <p className="no-selected-user">No user has been selected yet.</p>
                )
                }
            </section >

            {openAddGiftModal && (
                <AddGift
                    selectedUserID={selectedUser.$id}
                    openAddGiftModal={openAddGiftModal}
                    setOpenAddGiftModal={setOpenAddGiftModal}
                />
            )}
        </>
    );
}

export default GiftList;