const { MongoClient } = require("mongodb");

async function main() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB server");

    const db = client.db("libraryDB");
    const booksCollection = db.collection("books");

    // insert many books
    const books = [
      { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
      { title: "1984", author: "George Orwell", year: 1949 },
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
      { title: "Brave New World", author: "Aldous Huxley", year: 1932 },
      { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 },
      { title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951 },
      { title: "Pride and Prejudice", author: "Jane Austen", year: 1813 },
      { title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954 },
      { title: "Animal Farm", author: "George Orwell", year: 1945 },
      { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
      { title: "Moby Dick", author: "Herman Melville", year: 1851 },
      { title: "Wuthering Heights", author: "Emily Brontë", year: 1847 }
    ];

    const result = await booksCollection.insertMany(books);
    console.log(`${result.insertedCount} books were successfully inserted.`);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
