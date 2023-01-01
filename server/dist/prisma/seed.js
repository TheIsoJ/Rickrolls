import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    await prisma.user.create({
        data: {
            name: "Jesse Keskelä",
            email: "juiceneblueyt@gmail.com",
            username: "@theisoj",
            api_key: "1A4mgi2rBHCJdqggsYVx",
            profile_picture: "https://images.jesunmaailma.ml/rickrolls-api-images/rickroll.jpg",
            password: "$2y$12$5XvO/wJu7JI6EVfBIriEQuVc7QbAYbanNt7ZjnybHqkYhmD8o8MNC",
            stripe_secret_key: "sk_test_51HNy68CaxnPGJuSEv2FG0jsRVV1ipcTdS4l8ob921bUATAzqdxtunTV8rOBNodxudGY4f5qRp12HDhEYZVaxBw9Q00KRUj9x9v",
            stripe_publishable_key: "pk_test_51HNy68CaxnPGJuSEqz9tYZXnD07BWyn3X1E2el4yXCeaU7fBR7xaMohlkUdgQuV80SVQFnINaB9QBqkytfjKv5rM00zNJ8QW8O"
        },
    });
    await prisma.rickroll.create({
        data: {
            name: "Eka rickroll",
            description: "Eka rickroll",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            rickroll_cta_link: "https://images.jesunmaailma.ml/rickrolls-api-images/risitas.jpg"
        },
    });
    await prisma.subscriptions.create({
        data: {
            name: "Rickrolls+",
            description: "Kuukausimaksullinen tilaus. Palvelulla on 14 päivän kokeilujakso.",
            image: "https://files.stripe.com/links/MDB8YWNjdF8xSE55NjhDYXhuUEdKdVNFfGZsX3Rlc3RfVVpJYTVpUkM1eFRUODNxaHZ6dm1QaW5G005Yy3FSv2",
            price: 699,
            priceId: "price_1MDn1RCaxnPGJuSES0ufryQs",
            productId: "prod_MxiS1KWXlhMJ4S"
        },
    });
}
main()
    .catch(async (e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map