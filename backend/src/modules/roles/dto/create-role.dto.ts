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
    example: JSON.stringify(['users.create', 'users.read', 'users.update', 'users.delete']),
    description: 'JSON string of permissions assigned to the role',
  })
  @IsString()
  @IsOptional()
  permissions?: string;
}