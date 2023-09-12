import { ApiProperty } from '@nestjs/swagger'
import { Column } from 'typeorm'

export class UpdateUserDto {
  @ApiProperty()
  @Column({ nullable: true })
  email: string

  @ApiProperty()
  @Column({ nullable: true })
  password: string

  @ApiProperty()
  @Column({ nullable: true })
  firstName: string

  @ApiProperty()
  @Column({ nullable: true })
  lastName: string
}
