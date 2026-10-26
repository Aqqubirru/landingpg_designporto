const bcrypt = require('bcryptjs');
const prisma = require('./prisma');

async function main() {
  const passwordHash = await bcrypt.hash('superadmin123', 12);

  const user = await prisma.user.upsert({
    where: { email: 'superadmin123@example.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'superadmin123@example.com',
      passwordHash,
      role: 'super_admin',
    },
  });

  console.log('Super admin created:', user.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());