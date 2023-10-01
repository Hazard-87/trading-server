import { ApiProperty } from '@nestjs/swagger'
import { Column } from 'typeorm'

export class CloseOrderDto {
  @ApiProperty()
  @Column('decimal', { precision: 6, scale: 2 })
  closePrice: number

  @ApiProperty()
  @Column()
  closeDate: Date

  @ApiProperty()
  @Column({ nullable: true })
  images: number[]
}
