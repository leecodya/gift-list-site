import { useState } from 'react';
import { createGiftItem } from '../appwrite';

function AddGift({ selectedUserID, openAddGiftModal, setOpenAddGiftModal }) {
    const [giftName, setGiftName] = useState('');
    const [giftURL, setGiftURL] = useState('');
    const [giftPrice, setGiftPrice] = useState('');
    const [giftNotes, setGiftNotes] = useState('');
    const [addURL, setAddURL] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    function closeModal() {
        setOpenAddGiftModal(false);
    }

    const addGiftItem = async (e) => {
        e.preventDefault();

        try {
            setErrorMessage('');

            const res = await createGiftItem(
                selectedUserID,
                giftName,
                addURL ? giftURL : null,
                Number(giftPrice),
                giftNotes
            );

            if (res.$id) {
                closeModal();
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(`Error adding gift: ${error.message}`);
        }
    };

    return (
        <>
            {openAddGiftModal && (
                <>
                    <div className="backdrop" onClick={closeModal}></div>

                    <dialog open>
                        <h2 className="text-3xl font-bold text-white">Add Gift</h2>

                        <form onSubmit={addGiftItem}>
                            <p className="mt-2">
                                <label htmlFor="gift-name">Gift Name*</label>
                                <input
                                    required
                                    type="text"
                                    id="gift-name"
                                    name="gift-name"
                                    value={giftName}
                                    onChange={(e) => setGiftName(e.target.value)}
                                />
                            </p>

                            <p className="mt-2">
                                <label htmlFor="gift-price">Gift Price*</label>
                                <input
                                    required
                                    type="number"
                                    id="gift-price"
                                    name="gift-price"
                                    value={giftPrice}
                                    onChange={(e) => setGiftPrice(e.target.value)}
                                />
                            </p>

                            <p className="mt-2">
                                <label htmlFor="add-url">Add URL?</label>
                                <input
                                    type="checkbox"
                                    id="add-url"
                                    name="add-url"
                                    checked={addURL}
                                    onChange={(e) => {
                                        setAddURL(e.target.checked);
                                        if (!e.target.checked) setGiftURL('');
                                    }}
                                />
                            </p>

                            {addURL && (
                                <p className="mt-2">
                                    <label htmlFor="gift-url">Gift URL</label>
                                    <input
                                        type="url"
                                        id="gift-url"
                                        name="gift-url"
                                        value={giftURL}
                                        onChange={(e) => setGiftURL(e.target.value)}
                                    />
                                </p>
                            )}

                            <p className="mt-2">
                                <label htmlFor="gift-notes">Gift Notes</label>
                                <textarea
                                    placeholder="i.e. If red isn't available, then do green...or Size: XL"
                                    id="gift-notes"
                                    name="gift-notes"
                                    value={giftNotes}
                                    onChange={(e) => setGiftNotes(e.target.value)}
                                />
                            </p>

                            {errorMessage && <p>{errorMessage}</p>}

                            <p className="actions">
                                <button type="button" onClick={closeModal}>Cancel</button>
                                <button type="submit">Create</button>
                            </p>
                        </form>
                    </dialog>
                </>
            )}
        </>
    );
}

export default AddGift;