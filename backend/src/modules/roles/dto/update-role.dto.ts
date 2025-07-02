import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({
    example: 'Admin',
    description: 'Role name',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: ['users.create', 'users.read', 'users.update', 'users.delete'],
    description: 'List of permissions assigned to the role',
    required: false,
  })
  @IsArray()
  @IsOptional()
  permissions?: string[];
}