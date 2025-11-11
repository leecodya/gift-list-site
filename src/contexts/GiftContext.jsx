import { createContext, useState, useEffect, useContext } from "react";

const GiftContext = createContext()

export const useGiftContext = () => useContext(GiftContext)

export const GiftProvider = ({ children }) => {
    const [gifts, setGifts] = useState()


    useEffect(() => {
        const storedGifts = localStorage.getItem("gifts")

        if (storedGifts) setGifts(JSON.parse(storedGifts))
    }, [])

    useEffect(() => {
        localStorage.setItem('gifts', JSON.stringify(gifts))
    }, [gifts])

    const addToGifts = (gift) => {
        setGifts(prev => [...prev, gift])
    }

    const removeFromGifts = (giftId) => {
        setGifts(prev => prev.filter(gift => gift.id !== giftId))
    }

    // const isFavorite = (giftId) => {
    //     return gifts.some(gift => gift.id === giftId)
    // }

    const value = {
        gifts,
        addToGifts,
        removeFromGifts,
        // isFavorite
    }

    return <GiftContext.Provider value={value}>{children}</GiftContext.Provider>;
};