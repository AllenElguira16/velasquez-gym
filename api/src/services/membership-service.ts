import { getRepository } from "typeorm";
import { MembershipEntity } from "~/entities/membership-entity";
import { UserEntity } from "~/entities/user-entity";
import { ResponseError } from "~/helpers/response-error";

const membershipRepository = getRepository(MembershipEntity);
const userRepository = getRepository(UserEntity);

export const getMembership = async () => {
  try {
    return await membershipRepository.find();
  } catch (error) {
    console.log(error);
  }
}


export const membershipPayment = async (userId: string) => {
  const user = await userRepository.findOne(userId, {
    relations: ['membership']
  });

  if (user.membership) 
    throw new ResponseError(500, 'User already have membership');

  user.membership = await membershipRepository.save({ user_id: userId, paid: true });


  await userRepository.save(user);
}
