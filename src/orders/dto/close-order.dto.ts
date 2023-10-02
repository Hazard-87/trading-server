import { ApiProperty } from '@nestjs/swagger'
import { Column } from 'typeorm'

export class CloseOrderDto {
  @ApiProperty()
  @Column('float')
  closePrice: number

  @ApiProperty()
  @Column()
  closeDate: Date

  @ApiProperty()
  @Column({ nullable: true })
  images: number[]
}
