import { ApiProperty } from '@nestjs/swagger'

export class UpdateImageDto {
  @ApiProperty({ nullable: true })
  url: string
}
