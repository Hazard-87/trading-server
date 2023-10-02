import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { DepositsService } from './deposits.service'
import { CreateDepositDto } from './dto/create-deposit.dto'
import { UpdateDepositDto } from './dto/update-deposit.dto'
import { UsersService } from '../users/users.service'
import { QueryArg } from '../orders/dto/create-order.dto'
import { DepositEntity } from './entities/deposit.entity'

@Controller('deposits')
@ApiTags('deposits')
export class DepositsController {
  constructor(
    private readonly depositsService: DepositsService,
    readonly usersService: UsersService
  ) {}

  @Post()
  async create(@Req() req, @Body() dto: CreateDepositDto) {
    const user = await this.usersService.findOneById(req.user.userId)
    return this.depositsService.create(dto, user)
  }

  @ApiOkResponse({
    type: [DepositEntity]
  })
  @Get()
  async findByParams(@Req() req, @Query() query?: QueryArg) {
    const user = await this.usersService.findOneById(req.user.userId)
    if (query.id) {
      return this.depositsService.findOne(query.id)
    } else {
      return this.depositsService.findAll(query, user.id)
    }
  }

  @Get('current')
  async findCurrent(@Req() req) {
    const user = await this.usersService.findOneById(req.user.userId)
    return this.depositsService.findCurrent(user.id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDepositDto) {
    return this.depositsService.update(+id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.depositsService.remove(+id)
  }
}
