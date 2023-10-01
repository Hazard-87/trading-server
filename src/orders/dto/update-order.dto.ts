import { ApiProperty } from '@nestjs/swagger'
import { Column } from 'typeorm'

export class UpdateOrderDto {
  @ApiProperty()
  @Column('decimal', { precision: 6, scale: 2 })
  currentStopLoss: number

  @ApiProperty()
  @Column({ nullable: true })
  images: number[]
}
