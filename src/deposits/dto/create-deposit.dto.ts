import { ApiProperty } from '@nestjs/swagger'
import { Column } from 'typeorm'

export class CreateDepositDto {
  @ApiProperty()
  @Column('float', { nullable: true })
  count: number

  @ApiProperty()
  @Column()
  date: Date
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
