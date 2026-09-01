const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const db = new PrismaClient();

(async () => {
  const passwordHash = await bcrypt.hash('CHANGE_THIS_PASSWORD', 10);
  const admin = await db.adminUser.create({
    data: { email: 'abhishek@trustivasetu.com', passwordHash, name: 'Abhishek Kashyap' },
  });
  console.log('Admin created:', admin.email);
})();
