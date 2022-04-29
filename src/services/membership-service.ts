import { Between, getRepository, MoreThanOrEqual } from "typeorm";
import { MembershipEntity } from "~/entities/membership-entity";
import { UserEntity } from "~/entities/user-entity";
import { ResponseError } from "~/helpers/response-error";
import moment from "moment";
import { totalUsers } from "./user-service";

const membershipRepository = getRepository(MembershipEntity);
const userRepository = getRepository(UserEntity);

export const getMembership = async () => {
  try {
    return await membershipRepository.find();
  } catch (error) {
    console.log(error);
  }
};

export const membershipPayment = async (userId: string) => {
  try {
    const user = await userRepository.findOneOrFail({
      relations: ["memberships"],
      where: {
        id: userId,
      },
    });

    const membership = await membershipRepository.findOne({
      where: {
        paid: true,
        user,
        endDate: MoreThanOrEqual(new Date()),
      },
    });

    if (membership)
      throw new ResponseError(500, "User already have membership");

    const newMembership = await membershipRepository.save({
      user: await userRepository.findOne(userId),
      paid: true,
    });

    user.memberships = [...user.memberships, newMembership];

    await userRepository.save(user);
  } catch (error) {
    if (error instanceof Error) {
      throw new ResponseError(500, error.message);
    }
  }
};

export const incomeSummary = async (type: "week" | "month" | "year") => {
  let data: { [key: string]: { users: number; income: number } } = {};

  if (type === "week") {
    for (let i = 0; i < 7; i++) {
      const currentDate = moment().startOf("week").add(i, "day");

      const memberships = await membershipRepository.find({
        where: {
          startDate: Between(
            moment(currentDate).startOf("day").toISOString(),
            moment(currentDate).endOf("day").toISOString()
          ),
        },
      });

      const key = currentDate.format("dddd").toString();

      data[key] = {
        users: await totalUsers(
          currentDate.startOf("day").toISOString(),
          currentDate.endOf("day").toISOString()
        ),
        income: memberships.reduce(
          (prevAmount, currentMembership) =>
            currentMembership.paid ? prevAmount + 500 : prevAmount,
          0
        ),
      };
    }
  } else if (type === "month") {
    const weekLength =
      moment().endOf("month").isoWeek() -
      moment().startOf("month").isoWeek() +
      1;

    for (let i = 0; i < weekLength; i++) {
      const currentDate = moment().startOf("month").add(i, "week");

      const memberships = await membershipRepository.find({
        where: {
          startDate: Between(
            moment(currentDate).startOf("week").toISOString(),
            moment(currentDate).endOf("week").toISOString()
          ),
        },
      });

      data[`Week ${i + 1}`] = {
        users: await totalUsers(
          currentDate.startOf("week").toISOString(),
          currentDate.endOf("week").toISOString()
        ),
        income: memberships.reduce(
          (prevAmount, currentMembership) =>
            currentMembership.paid ? prevAmount + 500 : prevAmount,
          0
        ),
      };
    }
  } else if (type === "year") {
    for (let i = 0; i < 12; i++) {
      const currentDate = moment().startOf("year").add(i, "month");

      const memberships = await membershipRepository.find({
        where: {
          startDate: Between(
            currentDate.startOf("month").toISOString(),
            currentDate.endOf("month").toISOString()
          ),
        },
      });

      data[currentDate.format("MMMM").toString()] = {
        users: await totalUsers(
          currentDate.startOf("month").toISOString(),
          currentDate.endOf("month").toISOString()
        ),
        income: memberships.reduce(
          (prevAmount, currentMembership) =>
            currentMembership.paid ? prevAmount + 500 : prevAmount,
          0
        ),
      };
    }
  }

  return data;
};
