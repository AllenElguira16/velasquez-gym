import { TController } from "~/api";
import { updateUser } from "~/services/user-service";

/**
 * Choose Fitness
 * 
 * @param request 
 * @param response 
 */
export const Put: TController = async (request, response) => {

  await updateUser(request.session.userId, { fitness: request.body.fitness_id })

  response.status(200).json({
    success: true,
    message: 'Choose Fitness Success'
  });
}