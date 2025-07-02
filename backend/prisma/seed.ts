import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create default roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      permissions: [
        'user:read',
        'user:create',
        'user:update',
        'user:delete',
        'role:read',
        'role:create',
        'role:update',
        'role:delete',
        'admin:access'
      ],
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'User' },
    update: {},
    create: {
      name: 'User',
      permissions: [
        'user:read',
        'user:update:own',
      ],
    },
  });

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@serp.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@serp.com',
      password: hashedPassword,
      roleId: adminRole.id,
    },
  });

  console.log({ adminRole, userRole, adminUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });