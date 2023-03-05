import { CreateWaterIntakeRecord } from '@/dtos/waterIntakeRecord.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import WaterIntakeService from '@/services/waterIntake.service';
import { MESSAGES } from '@/utils/constants';
import { User } from '@prisma/client';
import { NextFunction, Response } from 'express';

class WaterIntakeController {
  private waterIntakeService = new WaterIntakeService();

  public getWaterIntake = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id: userId } = req.user satisfies User;
      const userWaterIntakeData = await this.waterIntakeService.findWaterIntakeRecordsByUserId(userId);

      res.status(201).json({ data: userWaterIntakeData, message: MESSAGES.success });
    } catch (error) {
      next(error);
    }
  };

  public createWaterIntake = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: CreateWaterIntakeRecord = req.body;
      const { id: userId } = req.user satisfies User;

      const waterIntake = await this.waterIntakeService.createWaterIntakeRecord(userId, body);

      res.status(200).json({ data: waterIntake, message: MESSAGES.success });
    } catch (error) {
      next(error);
    }
  };
}

export default WaterIntakeController;
