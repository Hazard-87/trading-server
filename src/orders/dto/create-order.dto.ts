import { ApiProperty } from '@nestjs/swagger'
import { Column } from 'typeorm'

export class CreateOrderDto {
  @ApiProperty()
  @Column()
  ticker: string

  @ApiProperty()
  @Column()
  direction: 'long' | 'short'

  @ApiProperty()
  @Column()
  takeProfit: number

  @ApiProperty()
  @Column()
  stopLoss: number

  @ApiProperty()
  @Column()
  lot: number

  @ApiProperty()
  @Column()
  buyPrice: number

  @ApiProperty()
  @Column()
  commission: number

  @ApiProperty()
  @Column()
  buyDate: Date

  @ApiProperty()
  @Column()
  currentStopLoss: number

  @ApiProperty()
  @Column({ nullable: true })
  sellPrice: number

  @ApiProperty()
  @Column({ nullable: true })
  sellDate: Date

  @ApiProperty()
  @Column({ nullable: true })
  images: number[]
}

export class QueryArg {
  @ApiProperty({ required: false, type: Number })
  id: number

  @ApiProperty({
    required: false,
    oneOf: [{ type: 'number' }, { type: 'all' }]
  })
  limit: number

  @ApiProperty({ required: false })
  offset: number
}
