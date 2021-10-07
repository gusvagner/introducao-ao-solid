import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const userEmailIsTaken = this.usersRepository.findByEmail(email);

    if (userEmailIsTaken) {
        throw new Error("Email já está em uso!");
    }

    return this.usersRepository.create({ name, email });
  }
}

export { CreateUserUseCase };
