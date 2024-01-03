import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.interface';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users: User[] = [
        {
          id: 1,  
          name: 'john_doe',
          age: 12,
          email: 'john@example.com',
          password: 'alpaca',
          role: 'ADMIN'
        },
        {
          id: 2,  
          name: 'jane_smith',
          age: 50,
          email: 'jane@example.com',
          password: 'alpaca',
          role: 'ADMIN'
        },
        {
          id: 3, 
          name: 'alice_wonderland',
          age: 120,
          email: 'alice@example.com',
          password: 'alpaca',
          role: 'INTERN'

        },
      ];

    findAll(role?: "ADMIN" | 'INTERN') {
        if(role) {
            const roleArray = this.users.filter(user => user.role === role)

            if(roleArray.length === 0) throw new NotFoundException("User Not Found")
            return roleArray;
        }
        return this.users;
    };

    findOneUser(id: number) {
        const user = this.users.find(user => user.id === id)
        if(!user) throw new NotFoundException("User Not Found")
        return user;
    };

    userRegistration(user: createUserDto) {

        const generateId = (): number => {
            const timestamp = Date.now();
            const random = Math.floor(Math.random() * 1000);;

            return parseInt(`${timestamp}${random}`);
        };

        const newId: number = generateId();

        const newUser = {
            id: newId,
            ...user
        }
        this.users.push(newUser);
        return newUser;
    };

    updateUser(id: number, updatedUser: updateUserDto) {
        this.users = this.users.map(user => {
            if(user.id === id) {
                return {...user, ...updatedUser}
            }
            return user
        })

        return this.findOneUser(id)
    }

    deleteUser(id: number) {
        const removedUser = this.findOneUser(id);
        this.users = this.users.filter(user => user.id !== id)

        return removedUser;
    }
}
