import { TController } from "~/api";
import { ResponseError } from "~/helpers/response-error";
import { totalIncome } from "~/services/membership-service";
import { totalUsers } from "~/services/user-service";

/**
 * Login with GEt request
 * 
 * @author Michael Allen Elguira <michael01@simplexi.com.ph>
 */
export const Get: TController = async (request, response) => {

  const { range } = request.query;

  if (!range) throw new ResponseError(400, 'range is required'); 
  
  const [rangeFrom, rangeTo] = range.toLocaleString().split(',');

  response.status(200).json({
    success: true,
    status: 200,
    content: {
      totalIncome: await totalIncome(rangeFrom, rangeTo),
      totalUsers: await totalUsers(rangeFrom, rangeTo)
    }
  });
};