import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  age: number;
}

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  create(user: Omit<User, 'id'>): User {
    const newUser = { ...user, id: this.idCounter++ };
    this.users.push(newUser);
    return newUser;
  }
}
