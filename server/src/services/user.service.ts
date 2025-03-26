import { UsersRepository } from "../repositories/users.repository";

export class UserService {
  constructor(private userRepository: UsersRepository) {}

  getUserByUsername = (username: string) => {
    return this.userRepository.getUserByUsername(username);
  };
}
