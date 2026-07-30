const User = require('../models/userModel');

const seedAdmin = async () => {
    try {
        const adminEmail = 'Petadmin@example.com';
        const adminExists = await User.findOne({ email: adminEmail });

        if (!adminExists) {
            await User.create({
                name: 'Admin Vijay',
                email: adminEmail,
                password: 'Admin@52', // Will be hashed by the pre-save hook
                address: 'Admin Address',
                phone: '9876543210', // Valid Indian mobile number
                role: 'admin',
            });

            console.log('✅ Admin user created successfully');
        } else {
            console.log('✅ Admin user already exists');
        }
    } catch (error) {
        console.error('Error seeding admin user:', error);
    }
};

module.exports = seedAdmin;