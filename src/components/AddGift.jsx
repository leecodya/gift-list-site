import React, { useEffect, useState } from 'react'
import { createGiftItem } from '../appwrite';

function AddGift({ selectedUserID, openAddGiftModal, setOpenAddGiftModal }) {
    const [dateAdded, setDateAdded] = useState('');
    const [giftName, setGiftName] = useState('');
    const [giftURL, setGiftURL] = useState('');
    const [giftPrice, setGiftPrice] = useState('');
    const [giftNotes, setGiftNotes] = useState('');
    const [addURL, setAddURL] = useState(false)
    // const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    function closeModal() {
        setOpenAddGiftModal(false)
    }

    useEffect(() => {
        const formattedDate = new Date().toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        setDateAdded(formattedDate)
    }, [])

    const addGiftItem = async (e) => {
        e.preventDefault();

        try {
            // setIsLoading(true)
            setErrorMessage('')
            var res = null;

            if (giftURL) {
                res = await createGiftItem(selectedUserID, giftName, giftURL, Number(giftPrice), giftNotes);
            } else {
                res = await createGiftItem(selectedUserID, giftName, null, Number(giftPrice), giftNotes);
            }


            if (res.$id) {
                return
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(`Error adding gift: ${error}`)
        } finally {
            // setIsLoading(false)
            closeModal();
        }
    }

    return (
        <>
            {openAddGiftModal && (
                <>
                    <div className='backdrop' onClick={closeModal}></div>
                    <dialog open>
                        <h2 className='text-3xl font-bold text-white'>Add Gift</h2>
                        <form onSubmit={addGiftItem}>
                            <p className='mt-2'>
                                <label htmlFor="gift-name">Gift Name*</label>
                                <input required type="text" id="gift-name" name="gift-name"
                                    value={giftName}
                                    onChange={(e) => setGiftName(e.target.value)} />
                            </p>
                            <p className='mt-2'>
                                <label htmlFor="gift-price">Gift Price* </label>
                                <input required type="number" id="gift-price" name="gift-price"
                                    value={giftPrice}
                                    onChange={(e) => setGiftPrice(e.target.value)} />
                            </p>
                            <p className='mt-2'>
                                <label htmlFor="add-url">Add URL?*</label>
                                <input type="checkbox" id="add-url" name="add-url"
                                    checked={addURL}
                                    onChange={(e) => setAddURL(e.target.checked)} />
                            </p>
                            {addURL &&
                                <p className='mt-2'>
                                    <label htmlFor="gift-url">Gift URL</label>
                                    <input type="url" id="gift-url" name="gift-url"
                                        value={giftURL}
                                        onChange={(e) => setGiftURL(e.target.value)} />
                                </p>
                            }
                            <p className='mt-2'>
                                <label htmlFor="gift-notes">Gift Notes</label>
                                <textarea placeholder="i.e. If red isn't available, then do green...or Size: XL" id="gift-notes" name="gift-notes"
                                    value={giftNotes}
                                    onChange={(e) => setGiftNotes(e.target.value)} />
                            </p>
                            <input type="hidden" id="gift-date-added" name="gift-date-added" value={dateAdded} />
                            <input type="hidden" id="gift-user-id" name="gift-user-id" value={selectedUserID} />

                            <p className="actions">
                                <button type="button" onClick={closeModal}>Cancel</button>
                                <button type="submit">Create</button>
                            </p>
                        </form>
                    </dialog>
                    {errorMessage && <p>{errorMessage}</p>}
                </>
            )}
        </>
    )
}

export default AddGift