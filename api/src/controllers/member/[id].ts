import { ResponseError } from "express-controller";
import { TController } from "~/api";
import { createFitness } from "~/services/fitness-service";
import { updateMember } from "~/services/member-service";

/**
 * Login with GEt request
 * 
 * @author Michael Allen Elguira <michael01@simplexi.com.ph>
 */
export const Put: TController = async (request, response) => {
   
  await updateMember(request.params.id as unknown as string, request.body as IUser);

  response.status(200).json({
    success: true,
    status: 200
});
};