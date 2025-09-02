import mongoose from 'mongoose';
import { Product } from '../models/product.model';

const products = [
    {
      name: "iPhone 15 Pro",
      category: "Electronics",
      price: 1299,
      stock: 50,
      ratings: [5, 4, 5, 4],
      tags: ["smartphone", "apple", "premium"],
    },
    {
      name: "Samsung Galaxy S24",
      category: "Electronics",
      price: 1099,
      stock: 80,
      ratings: [4, 4, 3, 5],
      tags: ["smartphone", "android", "flagship"],
    },
    {
      name: "Sony WH-1000XM5",
      category: "Electronics",
      price: 399,
      stock: 120,
      ratings: [5, 5, 5, 4],
      tags: ["headphones", "audio", "wireless"],
    },
    {
      name: "Nike Air Max",
      category: "Fashion",
      price: 150,
      stock: 200,
      ratings: [4, 5, 4],
      tags: ["shoes", "sports"],
    },
    {
      name: "Levi's 501 Jeans",
      category: "Fashion",
      price: 80,
      stock: 300,
      ratings: [5, 4, 3, 4],
      tags: ["clothing", "denim"],
    },
    {
      name: "Kitchen Mixer",
      category: "Home Appliances",
      price: 250,
      stock: 40,
      ratings: [4, 4, 4],
      tags: ["kitchen", "cooking"],
    },
  ];

  
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL as string);
        // await Product.deleteMany(); // Clear existing products
        // await Product.insertMany(products); // Insert sample products

        console.log(`MongoDB connected: ${connection.connection.host}`);
    }catch (error) {
        console.error(`Mongodb connection Failed: ${error}`);
        process.exit(1);
    }
}

export default connectDB;