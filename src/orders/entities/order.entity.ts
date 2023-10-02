import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { ImageEntity } from '../../images/entities/image.entity'
import { UserEntity } from '../../users/entities/user.entity'

@Entity('orders')
export class OrderEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  ticker: string

  @ApiProperty()
  @Column()
  direction: 'long' | 'short'

  @ApiProperty()
  @Column()
  status: 'OPENED' | 'CLOSED'

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
  openDate: Date

  @ApiProperty()
  @Column('float')
  commission: number

  @ApiProperty()
  @Column('float')
  currentStopLoss: number

  @ApiProperty()
  @Column('float', { nullable: true })
  closePrice: number

  @ApiProperty()
  @Column({ nullable: true })
  closeDate: Date

  @ApiProperty()
  @Column('float')
  profit: number

  @ApiProperty({ type: [ImageEntity] })
  @OneToMany(() => ImageEntity, (image) => image.order)
  images: ImageEntity[]

  @ApiProperty({ type: UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity
}
