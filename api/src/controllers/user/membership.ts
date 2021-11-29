import { ResponseError } from "express-controller";
import { TController } from "~/api";
import { membershipPayment, getMembership } from "~/services/membership-service";

/**
 * Login with GEt request
 * 
 * @author Michael Allen Elguira <michael01@simplexi.com.ph>
 */
export const Get: TController = async (request, response) => {

  response.status(200).json({
    success: true,
    status: 200,
    membership: await getMembership()
  });
};

/**
 * Login with GEt request
 * 
 * @author Michael Allen Elguira <michael01@simplexi.com.ph>
 */
export const Post: TController = async (request, response) => {

  await membershipPayment(request.session.userId);

  response.status(200).json({
    success: true,
    status: 200
  });
};
