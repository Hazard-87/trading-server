import { Repository } from 'typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'
import { RefreshDto } from '../auth/dto/refresh.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

  create(dto: CreateUserDto) {
    return this.repository.save(dto)
  }

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return this.repository.findOneBy({
      email
    })
  }

  async findOneById(id: number): Promise<UserEntity | undefined> {
    return await this.repository.findOneById(id)
  }

  async findOneByRefreshToken(token: string): Promise<UserEntity | undefined> {
    const user = await this.repository.findOneBy({
      refresh_token: token
    })
    delete user.refresh_token
    return {
      ...user,
      password: null
    }
  }

  async update(id: number, dto: UpdateUserDto) {
    return this.repository.update(id, dto)
  }

  updateRT(id: number, dto: RefreshDto) {
    return this.repository.update(id, dto)
  }

  async remove(userId: number) {
    const user = await this.findOneById(userId)
    if (!user) {
      throw new NotFoundException('Такой пользователь не найден')
    }
    return this.repository.delete(user.id)
  }
}
