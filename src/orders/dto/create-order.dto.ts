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
  @Column('float')
  takeProfit: number

  @ApiProperty()
  @Column('float')
  stopLoss: number

  @ApiProperty()
  @Column()
  lot: number

  @ApiProperty()
  @Column('float')
  openPrice: number

  @ApiProperty()
  @Column()
  commission: number

  @ApiProperty()
  @Column()
  openDate: Date

  @ApiProperty()
  @Column('float', { nullable: true })
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

  @ApiProperty({ required: false })
  status: 'OPENED' | 'CLOSED'
}
