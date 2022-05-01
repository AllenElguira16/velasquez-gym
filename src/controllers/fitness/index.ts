import { ResponseError } from "~/helpers/response-error";
import { IFitness, TController } from "~/types";
import { createFitness, getFitness } from "~/services/fitness-service";
import { createLog } from "~/services/log-service";

/**
 * Login with GEt request
 *
 * @author Michael Allen Elguira <michael01@simplexi.com.ph>
 */
export const Get: TController = async (_request, response) => {
  response.status(200).json({
    success: true,
    status: 200,
    fitness: await getFitness(),
  });
};

/**
 * Login with GEt request
 *
 * @author Michael Allen Elguira <michael01@simplexi.com.ph>
 */
export const Post: TController = async (request, response) => {
  const { img, type } = request.body as Omit<IFitness, "id">;

  if ((img !== null && !img.length) || !type.length) {
    throw new ResponseError(401, "Form Inputs are Required");
  }

  await createFitness({ img, type });
  await createLog(`Admin has Created Fitness (${type})`);

  response.status(200).json({
    success: true,
    status: 200,
    fitness: request.body,
  });
};
