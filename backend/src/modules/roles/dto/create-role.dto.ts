import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'Admin',
    description: 'Role name',
  })
  @IsString()
  @IsNotEmpty({ message: 'Role name is required' })
  name: string;

  @ApiProperty({
    example: ['users.create', 'users.read', 'users.update', 'users.delete'],
    description: 'List of permissions assigned to the role',
  })
  @IsArray()
  @IsOptional()
  permissions?: string[];
}