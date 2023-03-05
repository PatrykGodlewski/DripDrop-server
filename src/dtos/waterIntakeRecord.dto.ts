import { IsNumber, Max, Min } from 'class-validator';

export class CreateWaterIntakeRecord {
  @IsNumber()
  @Min(0)
  @Max(100000)
  public amount: number;
}
