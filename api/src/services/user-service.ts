import { ResponseError } from "express-controller";
import { getRepository } from "typeorm";
import { UserEntity } from "~/entities/UserEntity";

const userRepository = getRepository(UserEntity);

export const registerUser = async (user: IUser) => {

  const countUserByUsername = await userRepository.count({ where: { username: user.username } });
  const countUserByEmail = await userRepository.count({ where: { email: user.email } });

  if (countUserByUsername > 0) 
    throw new ResponseError(404, 'E-mail already exists');

  if (countUserByEmail > 0) 
    throw new ResponseError(404, 'Username already exists');

  await userRepository.save(user);
}

export const loginUser = async ({username, password, type}: Pick<IUser, 'username'|'password'|'type'>) => {
  const user = await userRepository.findOne({
    where: {
      username,
      password,
      type
    }
  });

  if (!user) {
    throw new ResponseError(404, 'Incorrect Username or Password');
  }

  return user;
}
