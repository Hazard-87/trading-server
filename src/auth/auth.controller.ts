import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Request,
  Res,
  UnauthorizedException
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from '../decorators/public.decorator'
import { ApiTags } from '@nestjs/swagger'
import { UsersService } from '../users/users.service'
import { UpdateUserDto } from '../users/dto/update-user.dto'
import { LoginDto } from './dto/login.dto'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { log } from 'console'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @Public()
  @Post('registration')
  createProfile(@Request() req, @Body() dto: CreateUserDto, @Res({ passthrough: true }) res) {
    return this.authService.signOut(dto, res)
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Request() req, @Body() dto: LoginDto, @Res({ passthrough: true }) res) {
    return this.authService.signIn(dto.email, dto.password, res)
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Get('refresh')
  refresh(@Req() req, @Res({ passthrough: true }) res) {
    return this.authService.refresh(req, res)
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Get('checkAuth')
  checkAuth(@Req() req) {
    return this.authService.checkAuth(req)
  }

  @Get('profile')
  @Public()
  getProfile(@Req() req) {
    const token = req.cookies['refresh_token']
    const user = this.userService.findOneByToken(token)
    if (!user) {
      throw new UnauthorizedException('Невалидная сессия')
    }

    return user
  }

  @Patch('profile')
  updateProfile(@Request() req, @Body() dto: UpdateUserDto) {
    const token = req.cookies['refresh_token']
    return this.authService.update(token, dto)
  }

  @Delete('profile')
  removeProfile(@Request() req) {
    const token = req.cookies['refresh_token']
    return this.userService.remove(token)
  }
}
