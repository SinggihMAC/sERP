import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new user
   * @param createUserDto User creation data
   * @returns Created user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if email already exists
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Set default role if not provided
    if (!createUserDto.roleId) {
      const userRole = await this.prisma.role.findFirst({
        where: { name: 'User' },
      });
      createUserDto.roleId = userRole?.id || 2; // Default to User role (ID 2)
    }

    // Create user
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  /**
   * Find all users
   * @param params Query parameters
   * @returns List of users
   */
  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        role: true,
      },
    });
  }

  /**
   * Find a user by ID
   * @param id User ID
   * @returns User or null
   */
  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
      },
    });
  }

  /**
   * Find a user by email
   * @param email User email
   * @returns User or null
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });
  }

  /**
   * Update a user
   * @param id User ID
   * @param updateUserDto User update data
   * @returns Updated user
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Check if user exists
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Hash password if provided
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Update user
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  /**
   * Remove a user
   * @param id User ID
   * @returns Removed user
   */
  async remove(id: string): Promise<User> {
    // Check if user exists
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Delete user
    return this.prisma.user.delete({
      where: { id },
    });
  }
}