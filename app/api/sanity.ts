import { client } from "@/lib/sanity";
import { Order } from "./interface";

// Fetch all products
async function getData() {
    const query = "*[_type == 'product']";
    const data = await client.fetch(query);
    return data;
}

async function getCountryData() {
    const query = "*[_type == 'country']";
    const data = await client.fetch(query);
    return data;
}

// Fetch product by slug
async function getDataBySlug(slug: string) {
    const query = `*[_type == "product" && slug.current == "${slug}"][0]{
        _id,
        name,
        img,
        price,
        description,
        size,
        "slug": slug.current,
        category,
        discount,
        features,
        color,
        hot
    }`;

    const data = await client.fetch(query);
    return data;
}

// Fetch user by ID
async function getUserDataById(userId: string) {
    const query = `*[_type == "user" && _id == $userId][0]{
        _id,
        firstname,
        lastname,
        email,
        username,
        phonenumber,
        address,
        city,
        state,
        country
    }`;

    const params = { userId }; // Create parameters for the query
    const data = await client.fetch(query, params); // Pass parameters to the query
    return data; // Return the fetched user data
}

// Fetch orders by user ID
async function getOrdersByUserId(userId: string): Promise<Order[]> {
    const query = `*[_type == 'order' && userId == $userId]{
        _id,
        firstname,
        lastname,
        email,
        phone,
        address,
        city,
        state,
        country,
        paymentMethod,
        totalAmount,
        status,
        orderDetails[]{
            _id,
            name,
            description,
            quantity,
            price,
            img,
            color
        }
    }`;
    
    const params = { userId };
    const data = await client.fetch(query, params);
    
    // Cast the fetched data to Order[]
    return data as Order[];
}

async function displayUserOrders(userId: string): Promise<Order[]> {
    const orders = await getOrdersByUserId(userId);
    return orders;
}
export {
    getData,
    getDataBySlug,
    getUserDataById,
    getCountryData,
    displayUserOrders

}
