import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    // permissions sudah dalam bentuk string sesuai dengan schema
    return this.prisma.role.create({
      data: {
        name: createRoleDto.name,
        permissions: createRoleDto.permissions || '',
      },
    });
  }

  async findAll() {
    return this.prisma.role.findMany();
  }

  async findOne(id: number) {
    const role = await this.prisma.role.findUnique({
      where: { id },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      // permissions sudah dalam bentuk string sesuai dengan schema
      const updateData: any = {};
      
      if (updateRoleDto.name !== undefined) {
        updateData.name = updateRoleDto.name;
      }
      
      if (updateRoleDto.permissions !== undefined) {
        updateData.permissions = updateRoleDto.permissions;
      }
      
      return await this.prisma.role.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.role.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
  }
}