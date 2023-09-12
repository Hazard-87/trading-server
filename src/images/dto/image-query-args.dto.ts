import { ApiProperty } from '@nestjs/swagger'

export class TextileImageQueryArg {
  @ApiProperty({
    required: false,
    oneOf: [{ type: 'number' }, { type: 'all' }]
  })
  limit: number

  @ApiProperty({ required: false })
  offset: number

  @ApiProperty({ required: false })
  order: 'ASC' | 'DESC'
}
