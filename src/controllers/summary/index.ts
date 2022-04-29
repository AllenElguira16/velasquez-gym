import { TController } from "~/types";
import { ResponseError } from "~/helpers/response-error";
import { incomeSummary } from "~/services/membership-service";
import { totalUsers } from "~/services/user-service";

/**
 * Login with GEt request
 *
 * @author Michael Allen Elguira <michael01@simplexi.com.ph>
 */
export const Get: TController = async (request, response) => {
  response.status(200).json({
    success: true,
    status: 200,
    content: {
      daily: await incomeSummary("week"),
      weekly: await incomeSummary("month"),
      monthly: await incomeSummary("year"),
    },
  });
};
