const User = require('../models/userModel');

const seedAdmin = async () => {
    try {
<<<<<<< HEAD
        const adminEmail = 'vijayjp10085@gmail.com';
=======
        const adminEmail = 'Petadmin@example.com';
>>>>>>> f14cd24f7d9b6405e2995b9998ed043d01f3d6c2
        const adminExists = await User.findOne({ email: adminEmail });

        if (!adminExists) {
            await User.create({
                name: 'Admin Vijay',
                email: adminEmail,
<<<<<<< HEAD
                password: 'Patil@652', // Will be hashed by the pre-save hook
=======
                password: 'Admin@52', // Will be hashed by the pre-save hook
>>>>>>> f14cd24f7d9b6405e2995b9998ed043d01f3d6c2
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