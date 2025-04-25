const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://umairsaeed789:Um%40ir7121@db1.zm8nqta.mongodb.net/?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
    const catData = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

    global.food_items = fetched_data;
    global.foodCategory = catData;

  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = mongoDB;
