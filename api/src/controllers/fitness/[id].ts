import { TController } from "~/api";
import { deleteFitness } from "~/services/fitness-service";

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

