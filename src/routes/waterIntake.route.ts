import WaterIntakeController from '@/controllers/waterIntake.controller';
import { CreateWaterIntakeRecord } from '@/dtos/waterIntakeRecord.dto';
import authMiddleware from '@/middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class WaterIntakeRoute implements Routes {
  public path = '/water-intake';
  public router = Router();
  public waterIntakeController = new WaterIntakeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.waterIntakeController.getWaterIntake);
    this.router.post(
      `${this.path}/create`,
      [authMiddleware, validationMiddleware(CreateWaterIntakeRecord, 'body')],
      this.waterIntakeController.createWaterIntake,
    );
  }
}

export default WaterIntakeRoute;
