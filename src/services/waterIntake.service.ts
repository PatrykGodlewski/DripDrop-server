import { CreateWaterIntakeRecord } from '@/dtos/waterIntakeRecord.dto';
import { HttpException } from '@exceptions/HttpException';
import { PrismaClient, WaterIntake } from '@prisma/client';
import { isEmpty } from '@utils/util';

class WaterIntakeService {
  public waterIntake = new PrismaClient().waterIntake;

  public async findWaterIntakeRecordsByUserId(userId: number): Promise<WaterIntake[]> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findWaterIntake: WaterIntake[] = await this.waterIntake.findMany({ where: { userId } });
    if (!findWaterIntake) throw new HttpException(409, 'Any record was found');

    return findWaterIntake;
  }

  public async createWaterIntakeRecord(userId: number, waterIntakeData: CreateWaterIntakeRecord): Promise<WaterIntake> {
    if (isEmpty(waterIntakeData)) throw new HttpException(400, 'Data is empty');

    const createUserData = await this.waterIntake.create({ data: { ...waterIntakeData, userId } });

    return createUserData;
  }
}

export default WaterIntakeService;
