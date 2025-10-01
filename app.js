
const { MongoClient } = require("mongodb");

// Local MongoDB connection
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("libraryDB");
    const books = db.collection("books");

    // --------------------------
    // 1. CREATE - Insert a new book
    // --------------------------
    await books.insertOne({
      title: "The Clean Coder",
      author: "Robert C. Martin",
      year: 2011,
      genre: "Programming"
    });
    console.log("📌 Added new book: The Clean Coder");

    // --------------------------
    // 2. READ - Find all books by George Orwell
    // --------------------------
    const orwellBooks = await books.find({ author: "George Orwell" }).toArray();
    console.log("📖 Books by George Orwell:", orwellBooks);

    // --------------------------
    // 3. UPDATE - Update year of "The Hobbit"
    // --------------------------
    await books.updateOne(
      { title: "The Hobbit" },
      { $set: { year: 1938 } }
    );
    console.log("✏️ Updated 'The Hobbit' year to 1938");

    // --------------------------
    // 4. DELETE - Remove "Moby Dick"
    // --------------------------
    await books.deleteOne({ title: "Moby Dick" });
    console.log("🗑️ Deleted 'Moby Dick' from collection");

    // --------------------------
    // 5. AGGREGATION - Count books by author
    // --------------------------
    const aggregation = await books.aggregate([
      { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
      { $sort: { totalBooks: -1 } }
    ]).toArray();
    console.log("📊 Number of books by author:", aggregation);

    // --------------------------
    // 6. INDEXING - Create index on title
    // --------------------------
    await books.createIndex({ title: 1 });
    console.log("⚡ Created index on 'title' for faster searching");

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🔒 Connection closed");
  }
}

run();
