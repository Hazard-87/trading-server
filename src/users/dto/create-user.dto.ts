import { ApiProperty } from '@nestjs/swagger'
import { Column } from 'typeorm'

export class CreateUserDto {
  @ApiProperty()
  @Column()
  email: string

  @ApiProperty()
  @Column()
  password: string

  @ApiProperty()
  @Column({ nullable: true })
  firstName: string

  @ApiProperty()
  @Column({ nullable: true })
  lastName: string
}
