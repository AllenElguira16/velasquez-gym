import { Between, getRepository, LessThan, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
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
  try {
    // const user = await userRepository.findOne(userId, {
    //   relations: ['memberships'],
    //   where: {
    //     memberships: {
    //       paid: true
    //     }
    //   }
    // });
    const user = await userRepository.findOne({
      relations: ['memberships'],
      where: {
        id: userId
      }
    });

    const membership = await membershipRepository.findOne({
      where: {
        paid: true,
        user,
        endDate: MoreThanOrEqual(new Date())
      }
    }) 

  
    if (membership) 
      throw new ResponseError(500, 'User already have membership');
  
    const newMembership = await membershipRepository.save({ user_id: userId, paid: true });    
    
    user.memberships = [...user.memberships, newMembership];
  
    await userRepository.save(user);
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
}

export const totalIncome = async (rangeFrom: string, rangeTo: string) => {
  const memberships = await membershipRepository.find({
    where: {
      startDate: Between(rangeFrom, rangeTo)
    }
  });

  return memberships.reduce((prevAmount, currentMembership) => currentMembership.paid ? prevAmount + 200 : prevAmount, 0);
}
