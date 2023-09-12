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
  takeProfit: number

  @ApiProperty()
  @Column()
  stopLoss: number

  @ApiProperty()
  @Column()
  lot: number

  @ApiProperty()
  @Column()
  buyPrice: number

  @ApiProperty()
  @Column()
  buyDate: Date

  @ApiProperty()
  @Column()
  commission: number

  @ApiProperty()
  @Column()
  currentStopLoss: number

  @ApiProperty()
  @Column({ nullable: true })
  sellPrice: number

  @ApiProperty()
  @Column({ nullable: true })
  sellDate: Date

  @ApiProperty({ type: [ImageEntity] })
  @OneToMany(() => ImageEntity, (image) => image.order)
  images: ImageEntity[]

  @ApiProperty({ type: UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity
}
