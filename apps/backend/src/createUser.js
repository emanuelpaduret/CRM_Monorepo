const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Connection error:', err);
    process.exit(1);
  });

// Function to generate random password
function generatePassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

async function createUsers() {
  try {
    // Clear existing users (optional - comment out if you want to keep existing)
    await User.deleteMany({});
    console.log('Cleared existing users');

    const users = [
      {
        name: 'Emanuel Paduret',
        email: 'emanuel.paduret@hotmail.com',
        password: generatePassword(),
        role: 'admin'
      },
      {
        name: 'Valeriu Paduret',
        email: 'demenagementalex@gmail.com',
        password: generatePassword(),
        role: 'manager'
      },
      {
        name: 'Ghenadie Tabirta',
        email: 'demelina.ca@gmail.com',
        password: generatePassword(),
        role: 'manager'
      }
    ];

    console.log('\n=== CREATING USERS ===\n');
    
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      console.log(`Created ${userData.role}:`);
      console.log(`  Name: ${userData.name}`);
      console.log(`  Email: ${userData.email}`);
      console.log(`  Password: ${userData.password}`);
      console.log(`  Role: ${userData.role}`);
      console.log('---');
    }

    console.log('\n✅ All users created successfully!');
    console.log('\n⚠️  SAVE THESE PASSWORDS - THEY CANNOT BE RECOVERED!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating users:', error);
    process.exit(1);
  }
}

createUsers();