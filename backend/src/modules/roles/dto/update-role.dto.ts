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
    example: JSON.stringify(['users.create', 'users.read', 'users.update', 'users.delete']),
    description: 'JSON string of permissions assigned to the role',
    required: false,
  })
  @IsString()
  @IsOptional()
  permissions?: string;
}