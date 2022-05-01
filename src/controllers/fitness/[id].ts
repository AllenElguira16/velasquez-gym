import { TController } from "~/types";
import {
  deleteFitness,
  getFitnessById,
  updateFitness,
} from "~/services/fitness-service";
import { createLog } from "~/services/log-service";

/**
 * Login with GEt request
 *
 * @author Michael Allen Elguira <michael01@simplexi.com.ph>
 */
export const Delete: TController = async (request, response) => {
  const { type } = await getFitnessById(request.params.id);
  await deleteFitness(request.params.id);
  await createLog(`Admin has Deleted Fitness (${type})`);

  response.status(200).json({
    success: true,
    status: 200,
  });
};

/**
 * Login with GEt request
 *
 * @author Michael Allen Elguira <michael01@simplexi.com.ph>
 */
export const Put: TController = async (request, response) => {
  const { type } = await getFitnessById(request.params.id);
  await updateFitness(request.params.id, {
    virtualAssistance: request.body.virtualAssistance,
  });
  await createLog(`Admin has Updated Fitness (${type})`);

  response.status(200).json({
    success: true,
    data: request.params,
    status: 200,
  });
};
