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
  openDate: Date

  @ApiProperty()
  @Column('decimal', { precision: 6, scale: 2 })
  commission: number

  @ApiProperty()
  @Column('decimal', { precision: 6, scale: 2 })
  currentStopLoss: number

  @ApiProperty()
  @Column('decimal', { precision: 6, scale: 2, nullable: true })
  closePrice: number

  @ApiProperty()
  @Column({ nullable: true })
  closeDate: Date

  @ApiProperty({ type: [ImageEntity] })
  @OneToMany(() => ImageEntity, (image) => image.order)
  images: ImageEntity[]

  @ApiProperty({ type: UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity
}
