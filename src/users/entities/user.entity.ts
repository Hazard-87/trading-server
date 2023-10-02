import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { OrderEntity } from '../../orders/entities/order.entity'
import { DepositEntity } from '../../deposits/entities/deposit.entity'

@Entity('users')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

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

  @ApiProperty()
  @Column({
    nullable: true
  })
  refresh_token: string

  @ApiProperty({ type: [OrderEntity] })
  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[]

  @ApiProperty({ type: [DepositEntity] })
  @OneToMany(() => DepositEntity, (deposit) => deposit.user)
  deposits: DepositEntity[]
}
