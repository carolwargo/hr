const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Album = require('./src/models/Album');

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Album.deleteMany({});
    console.log('Cleared existing users and albums');

    // Seed users
    const users = [
      {
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'jane.doe@example.com',
        password: 'password123', // Will be hashed by User model
      },
      {
        firstname: 'John',
        lastname: 'Smith',
        email: 'john.smith@example.com',
        password: 'password123',
      },
    ];

    const createdUsers = await User.insertMany(users);
    console.log('Seeded users:', createdUsers.map(u => u.email));

    // Seed albums
    const seedAlbums = [
      {
        title: 'Jane\'s Mountain Adventure',
        description: 'Jane\'s hiking trip in the mountains.',
        images: [
          'https://source.unsplash.com/800x600/?mountain',
          'https://source.unsplash.com/800x600/?peak',
        ],
        userId: createdUsers[0]._id,
        createdAt: new Date(),
      },
      {
        title: 'Jane\'s Beach Getaway',
        description: 'Jane\'s relaxing beach vacation.',
        images: [
          'https://source.unsplash.com/800x600/?beach',
          'https://source.unsplash.com/800x600/?ocean',
        ],
        userId: createdUsers[0]._id,
        createdAt: new Date(),
      },
      {
        title: 'John\'s City Lights',
        description: 'John\'s city nightlife photos.',
        images: [
          'https://source.unsplash.com/800x600/?city',
          'https://source.unsplash.com/800x600/?skyline',
        ],
        userId: createdUsers[1]._id,
        createdAt: new Date(),
      },
    ];

    await Album.insertMany(seedAlbums);
    console.log('Seeded albums');

    // Disconnect
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();