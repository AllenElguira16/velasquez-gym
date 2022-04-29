import { TController } from "~/types";
import { getAllLog } from "~/services/log-service";

/**
 * Get Users
 *
 * @param request
 * @param response
 */
export const Get: TController = async (...[, response]) => {
  response.status(200).json({
    success: true,
    logs: await getAllLog(),
  });
};
