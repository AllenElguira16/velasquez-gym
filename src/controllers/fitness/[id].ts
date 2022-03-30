import { TController } from "~/types";
import { deleteFitness, updateFitness } from "~/services/fitness-service";

/**
 * Login with GEt request
 * 
 * @author Michael Allen Elguira <michael01@simplexi.com.ph>
 */
export const Delete: TController = async (request, response) => {

  await deleteFitness(request.params.id);

  response.status(200).json({
    success: true,
    status: 200
  });
};

/**
 * Login with GEt request
 * 
 * @author Michael Allen Elguira <michael01@simplexi.com.ph>
 */
export const Put: TController = async (request, response) => {

  await updateFitness(request.params.id, { virtualAssistance: request.body.virtualAssistance });

  response.status(200).json({
    success: true,
    data: request.params,
    status: 200
  });
};
