import { ApiProperty } from '@nestjs/swagger'
import { Column } from 'typeorm'

export class CloseOrderDto {
  @ApiProperty()
  @Column()
  sellPrice: number

  @ApiProperty()
  @Column()
  sellDate: Date

  @ApiProperty()
  @Column({ nullable: true })
  images: number[]
}
