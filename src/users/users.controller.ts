import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll(@Query('role') role?: "ADMIN" | "INTERN") {
    return this.userService.findAll(role);
  }

  @Get(':id')
  findOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneUser(id);
  }

  @Post('register')
  userRegistration(@Body(ValidationPipe) user: createUserDto) {
    return this.userService.userRegistration(user);
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) UpdatedUser: updateUserDto) {
    return this.userService.updateUser(id, UpdatedUser)
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number,) {
    return this.userService.deleteUser(id)
  }
}
