import { useEffect, useState } from 'react';
import Gift from './Gift';
import AddGift from './AddGift';
import Spinner from './Spinner';
import { getGiftsByUser } from '../appwrite';

function GiftList({ selectedUser }) {
    const [openAddGiftModal, setOpenAddGiftModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [giftList, setGiftList] = useState([]);

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

                            <button onClick={() => setOpenAddGiftModal(true)}>
                                Add Gift
                            </button>
                        </header>

                        {isLoading ? (
                            <Spinner />
                        ) : giftList.length > 0 ? (
                            <ul className="gift-list">
                                {giftList.map((gift) => (
                                    <Gift key={gift.$id} gift={gift} />
                                ))}
                            </ul>
                        ) : (
                            <p>No gifts have been added for {selectedUser.name}.</p>
                        )}
                    </>
                ) : (
                    <p className="no-selected-user">No user has been selected yet.</p>
                )}
            </section>

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