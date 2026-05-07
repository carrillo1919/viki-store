import { reportService } from '../services/reportService.js';

export const inventoryPdf = async (req, res) => {
  return reportService.generateInventoryPdf(res);
};

export const inventoryExcel = async (req, res) => {
  return reportService.generateInventoryExcel(res);
};

export const movementsPdf = async (req, res) => {
  return reportService.generateMovementPdf(req.query, res);
};