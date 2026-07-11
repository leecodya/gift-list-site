import { useState } from 'react';
import { updateGiftItem } from '../appwrite';

function EditGift({
    gift,
    openEditGiftModal,
    setOpenEditGiftModal,
    onGiftUpdated
}) {
    const [giftName, setGiftName] = useState(gift.title);
    const [giftURL, setGiftURL] = useState(gift.gift_url || '');
    const [giftPrice, setGiftPrice] = useState(gift.price);
    const [giftNotes, setGiftNotes] = useState(gift.notes || '');
    const [addURL, setAddURL] = useState(Boolean(gift.gift_url));
    const [errorMessage, setErrorMessage] = useState('');

    function closeModal() {
        setOpenEditGiftModal(false);
    }

    const editGiftItem = async (e) => {
        e.preventDefault();

        try {
            setErrorMessage('');

            const updatedGift = {
                title: giftName,
                gift_url: addURL ? giftURL : null,
                price: Number(giftPrice),
                notes: giftNotes,
            };

            const response = await updateGiftItem(gift.$id, updatedGift);

            if (response?.$id) {
                onGiftUpdated(response);
                closeModal();
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(`Error editing gift: ${error.message}`);
        }
    };

    return (
        <>
            {openEditGiftModal && (
                <>
                    <div className="backdrop" onClick={closeModal}></div>

                    <dialog open>
                        <h2 className="text-3xl font-bold text-white">Edit Gift</h2>

                        <form onSubmit={editGiftItem}>
                            <p className="mt-2">
                                <label htmlFor="edit-gift-name">Gift Name*</label>
                                <input
                                    required
                                    type="text"
                                    id="edit-gift-name"
                                    value={giftName}
                                    onChange={(e) => setGiftName(e.target.value)}
                                />
                            </p>

                            <p className="mt-2">
                                <label htmlFor="edit-gift-price">Gift Price*</label>
                                <input
                                    required
                                    type="number"
                                    id="edit-gift-price"
                                    min="0"
                                    step="0.01"
                                    value={giftPrice}
                                    onChange={(e) => setGiftPrice(e.target.value)}
                                />
                            </p>

                            <p className="mt-2">
                                <label htmlFor="edit-add-url">Add URL?</label>
                                <input
                                    type="checkbox"
                                    id="edit-add-url"
                                    checked={addURL}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setAddURL(checked);

                                        if (!checked) {
                                            setGiftURL('');
                                        }
                                    }}
                                />
                            </p>

                            {addURL && (
                                <p className="mt-2">
                                    <label htmlFor="edit-gift-url">Gift URL</label>
                                    <input
                                        type="url"
                                        id="edit-gift-url"
                                        value={giftURL}
                                        onChange={(e) => setGiftURL(e.target.value)}
                                    />
                                </p>
                            )}

                            <p className="mt-2">
                                <label htmlFor="edit-gift-notes">Gift Notes</label>
                                <textarea
                                    id="edit-gift-notes"
                                    value={giftNotes}
                                    onChange={(e) => setGiftNotes(e.target.value)}
                                />
                            </p>

                            {errorMessage && <p>{errorMessage}</p>}

                            <p className="actions">
                                <button type="button" onClick={closeModal}>
                                    Cancel
                                </button>

                                <button type="submit">
                                    Save Changes
                                </button>
                            </p>
                        </form>
                    </dialog>
                </>
            )}
        </>
    );
}

export default EditGift;