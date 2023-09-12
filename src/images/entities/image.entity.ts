import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { OrderEntity } from '../../orders/entities/order.entity'

@Entity('images')
export class ImageEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  url: string

  @ApiProperty({ type: [Number] })
  @ManyToOne(() => OrderEntity, (order) => order.images)
  @JoinColumn()
  order: OrderEntity
}
