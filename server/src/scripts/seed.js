import { sequelize } from '../config/database.js';
import { User, Role, Permission, Product, Movement } from '../models/index.js';
import bcrypt from 'bcrypt';

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');

    // Crear roles
    console.log('Creating roles...');
    const adminRole = await Role.findOrCreate({
      where: { name: 'ADMIN' },
      defaults: { description: 'Administrator with full access' },
    });

    const managerRole = await Role.findOrCreate({
      where: { name: 'MANAGER' },
      defaults: { description: 'Manager with inventory control' },
    });

    const staffRole = await Role.findOrCreate({
      where: { name: 'STAFF' },
      defaults: { description: 'Staff with limited access' },
    });

    const agentRole = await Role.findOrCreate({
      where: { name: 'AGENT_OPENCLAW' },
      defaults: { description: 'OpenClaw autonomous agent' },
    });

    // Crear usuarios de prueba
    console.log('Creating test users...');
    await User.findOrCreate({
      where: { username: 'admin' },
      defaults: {
        email: 'admin@vikistore.com',
        password: await bcrypt.hash('admin123', 10),
        roleId: adminRole[0].id,
        isActive: true,
      },
    });

    await User.findOrCreate({
      where: { username: 'manager' },
      defaults: {
        email: 'manager@vikistore.com',
        password: await bcrypt.hash('manager123', 10),
        roleId: managerRole[0].id,
        isActive: true,
      },
    });

    await User.findOrCreate({
      where: { username: 'staff' },
      defaults: {
        email: 'staff@vikistore.com',
        password: await bcrypt.hash('staff123', 10),
        roleId: staffRole[0].id,
        isActive: true,
      },
    });

    // Crear productos de prueba
    console.log('Creating test products...');
    const products = [
      {
        sku: 'PROD-001',
        name: 'Laptop Dell XPS 13',
        description: 'High-performance laptop',
        stock: 50,
        minStock: 5,
        price: 1299.99,
        category: 'Electronics',
      },
      {
        sku: 'PROD-002',
        name: 'USB-C Cable',
        description: 'Universal USB-C charging cable',
        stock: 200,
        minStock: 20,
        price: 15.99,
        category: 'Accessories',
      },
      {
        sku: 'PROD-003',
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse',
        stock: 3,
        minStock: 10,
        price: 29.99,
        category: 'Peripherals',
      },
      {
        sku: 'PROD-004',
        name: 'Monitor LG 27"',
        description: '4K Ultra HD monitor',
        stock: 15,
        minStock: 3,
        price: 399.99,
        category: 'Displays',
      },
      {
        sku: 'PROD-005',
        name: 'Mechanical Keyboard',
        description: 'RGB Mechanical Gaming Keyboard',
        stock: 25,
        minStock: 5,
        price: 129.99,
        category: 'Peripherals',
      },
    ];

    for (const productData of products) {
      await Product.findOrCreate({
        where: { sku: productData.sku },
        defaults: productData,
      });
    }

    console.log('✅ Database seeded successfully!');
    console.log('');
    console.log('Test users created:');
    console.log('  - Username: admin     | Password: admin123');
    console.log('  - Username: manager   | Password: manager123');
    console.log('  - Username: staff     | Password: staff123');
    console.log('');
    console.log('Test products:');
    products.forEach(p => {
      console.log(`  - ${p.sku}: ${p.name} (Stock: ${p.stock})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
