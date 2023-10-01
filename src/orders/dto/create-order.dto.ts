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
  @Column('decimal', { precision: 6, scale: 2 })
  takeProfit: number

  @ApiProperty()
  @Column('decimal', { precision: 6, scale: 2 })
  stopLoss: number

  @ApiProperty()
  @Column()
  lot: number

  @ApiProperty()
  @Column('decimal', { precision: 6, scale: 2 })
  openPrice: number

  @ApiProperty()
  @Column()
  commission: number

  @ApiProperty()
  @Column()
  openDate: Date

  @ApiProperty()
  @Column('decimal', { precision: 6, scale: 2, nullable: true })
  closePrice: number

  @ApiProperty()
  @Column({ nullable: true })
  closeDate: Date

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
