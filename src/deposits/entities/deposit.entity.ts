import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { UserEntity } from '../../users/entities/user.entity'

@Entity('deposits')
export class DepositEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column('float')
  count: number

  @ApiProperty()
  @Column()
  date: Date

  @ManyToOne(() => UserEntity, (user) => user.deposits)
  user: UserEntity
}
