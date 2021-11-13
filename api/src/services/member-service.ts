import { getRepository } from "typeorm";
import { UserEntity } from "~/entities/user-entity";

const userRepository = getRepository(UserEntity);

export const updateMember = async (id: string, userData: IUser) => {
  await userRepository.save({ 
    id,
    ...userData
  });
}
