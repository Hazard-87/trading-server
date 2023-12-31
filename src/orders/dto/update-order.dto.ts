import { ApiProperty } from '@nestjs/swagger'
import { Column } from 'typeorm'

export class UpdateOrderDto {
  @ApiProperty()
  @Column('float')
  currentStopLoss: number

  @ApiProperty()
  @Column({ nullable: true })
  images: number[]
}
