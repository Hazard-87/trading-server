import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { UpdateUserDto } from '../users/dto/update-user.dto'

@Injectable()
export class AuthService {
  constructor(private repository: UsersService, private jwtService: JwtService) {}

  saltOrRounds = 10

  async signIn(email: string, pass: string, res: any): Promise<any> {
    const user = await this.repository.findOneByEmail(email)
    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль')
    }

    const isMatch = await bcrypt.compare(pass, user.password)
    if (!isMatch) {
      throw new UnauthorizedException('Неверный email или пароль')
    }

    const payload = { userId: user.id, username: user.email }
    await this.setCookie(res, payload, user.id)
    return {
      result: {
        access_token: await this.jwtService.signAsync(payload)
      }
    }
  }

  async refresh(req: any, res: any): Promise<any> {
    const token = req.cookies['refreshToken']
    const decode = this.jwtService.decode(token) as any
    const currentTime = Date.now() / 1000
    if (decode.exp - currentTime < 0) {
      throw new UnauthorizedException('Невалидная сессия')
    }
    const user = await this.repository.findOneByToken(token)
    if (!user) {
      throw new UnauthorizedException('Невалидная сессия')
    }

    const payload = { userId: user.id, username: user.email }
    await this.setCookie(res, payload, user.id)
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async signOut(dto: CreateUserDto, res: any): Promise<any> {
    if (!dto.email) {
      throw new NotFoundException(`Поле email обязательное`)
    } else if (!dto.password) {
      throw new NotFoundException(`Поле password обязательное`)
    }
    const candidate = await this.repository.findOneByEmail(dto.email)
    if (candidate) {
      throw new NotFoundException(
        `Пользователь с почтовым адресом ${dto.email} уже зарегистрирован`
      )
    }

    const hashPassword = await bcrypt.hash(dto.password, this.saltOrRounds)
    const user = await this.repository.create({ ...dto, password: hashPassword })
    const payload = { userId: user.id, username: user.email }
    await this.setCookie(res, payload, user.id)
    return {
      result: {
        access_token: await this.jwtService.signAsync(payload)
      }
    }
  }

  async update(token: string, dto: UpdateUserDto) {
    const user = await this.repository.findOneByToken(token)
    if (!user) {
      throw new UnauthorizedException('Невалидная сессия')
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, this.saltOrRounds)
    }

    return this.repository.update(user.id, dto)
  }

  async setCookie(res: any, payload: any, userId: number) {
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '600s'
    })
    await this.repository.updateRT(userId, {
      refresh_token: token
    })

    res.cookie('refresh_token', token, {
      sameSite: 'http://127.0.0.1:3000',
      httpOnly: true
    })
  }
}
