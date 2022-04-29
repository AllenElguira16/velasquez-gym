import { getRepository } from "typeorm";
import { LogEntity } from "~/entities/log-entity";

const logRepository = getRepository(LogEntity);

export const createLog = async (message: string) => {
  await logRepository.save({ message });
};

export const getAllLog = async () => {
  return logRepository.find({ order: { createdAt: "DESC" } });
};
