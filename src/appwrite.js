import { Client, Databases, Account, Query, ID } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const GIFTS_ID = import.meta.env.VITE_APPWRITE_GIFTS_TABLE_ID;
const USERS_ID = import.meta.env.VITE_APPWRITE_USERS_TABLE_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

const database = new Databases(client);

export const createGiftItem = async (userID, title, url, price, notes) => {
    try {
        const response = await database.createDocument(
            DATABASE_ID,
            GIFTS_ID,
            ID.unique(),
            {
                title,
                gift_url: url,
                user_id: userID,
                price,
                notes
            }
        );

        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getUsers = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, USERS_ID);

        return result.documents;
    } catch (error) {
        console.log(error);
    }
};

export const getGiftsByUser = async (userID) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, GIFTS_ID);

        return result.documents.filter((gift) => gift.user_id == userID);
    } catch (error) {
        console.log(error);
    }
};

export const updatePurchasedGift = async (giftID) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, GIFTS_ID, [
            Query.equal("$id", giftID),
        ]);

        if (result.documents.length > 0) {
            const doc = result.documents[0];

            await database.updateDocument(DATABASE_ID, GIFTS_ID, doc.$id, {
                has_been_purchased: true,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const hasThisGiftBeenPurchased = async (giftID) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, GIFTS_ID, [
            Query.equal("$id", giftID),
            Query.equal("has_been_purchased", true)
        ]);

        if (result.documents.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};
