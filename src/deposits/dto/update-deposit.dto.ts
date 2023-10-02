import { ApiProperty } from '@nestjs/swagger'
import { Column } from 'typeorm'

export class UpdateDepositDto {
  @ApiProperty()
  @Column('float', { nullable: true })
  count: number

  @ApiProperty()
  @Column({ nullable: true })
  date: Date
}
