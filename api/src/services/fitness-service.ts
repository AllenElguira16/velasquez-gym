import { ResponseError } from "express-controller";
import { getRepository } from "typeorm";
import { FitnessEntity } from "~/entities/fitness-entity";

const fitnessRepository = getRepository(FitnessEntity);

export const createFitness = async (fitness: Omit<IFitness, 'id'>) => {
  await fitnessRepository.save(fitness);
}

export const getFitness = async () => {
  return fitnessRepository.find();
}

export const deleteFitness = async (id: string) => {
  await fitnessRepository.delete(id);
}
