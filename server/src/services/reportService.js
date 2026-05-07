import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';
import { Op } from 'sequelize';
import { Product } from '../models/Product.js';
import { Movement } from '../models/Movement.js';

export const reportService = {
  generateInventoryPdf: async (res) => {
    const products = await Product.findAll();
    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=inventory.pdf');

    doc.pipe(res);
    doc.fontSize(20).text('Inventory Report', { align: 'center' });
    doc.moveDown();

    products.forEach(product => {
      doc.fontSize(12).text(`SKU: ${product.sku}, Name: ${product.name}, Stock: ${product.stock}`);
    });

    doc.end();
  },

  generateInventoryExcel: async (res) => {
    const products = await Product.findAll();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Inventory');

    worksheet.columns = [
      { header: 'SKU', key: 'sku' },
      { header: 'Name', key: 'name' },
      { header: 'Stock', key: 'stock' },
      { header: 'Min Stock', key: 'minStock' },
      { header: 'Price', key: 'price' },
    ];

    products.forEach(product => {
      worksheet.addRow(product.toJSON());
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=inventory.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  },

  generateMovementPdf: async (query, res) => {
    const where = {};
    if (query.startDate && query.endDate) {
      where.createdAt = { [Op.between]: [new Date(query.startDate), new Date(query.endDate)] };
    }

    const movements = await Movement.findAll({ where, include: [Product] });
    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=movements.pdf');

    doc.pipe(res);
    doc.fontSize(20).text('Movements Report', { align: 'center' });
    doc.moveDown();

    movements.forEach(movement => {
      doc.fontSize(12).text(`Product: ${movement.Product?.name}, Type: ${movement.type}, Quantity: ${movement.quantity}, Date: ${movement.createdAt}`);
    });

    doc.end();
  },
};