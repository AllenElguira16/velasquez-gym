import Express from "express";
import path from "path";
import fs from "fs";
import { ResponseError } from "./response-error";

const oRouter = Express.Router();

/**
 * Registers Controller to Express Router
 *
 * Note: Don't edit this file unless you know what you're doing
 *
 * @author Michael Allen Elguira <michael01@simplexi.com.ph>
 */
const registerController = (sControllerDirectory: string) => {
  const aControllerFilenames = getFilenames(sControllerDirectory);

  aControllerFilenames.forEach((sControllerFilename: string) => {
    const [sFilename] = sControllerFilename.split(".");

    const oHandler = require(path.join(
      sControllerDirectory,
      sControllerFilename
    ));

    const sUri = sFilename
      .replace(
        /\[([\w\-. ]+)\]/gm,
        (sMatchedString) => ":" + sMatchedString.slice(1, -1)
      )
      .replace(/\\/gm, "/")
      .replace("/index", "");

    Object.keys(oHandler).forEach((sMethod: string) => {
      type TExpressMethods = "get" | "post" | "put" | "delete";
      oRouter[sMethod.toLocaleLowerCase() as TExpressMethods](
        sUri,
        async (...oArgs) => {
          const [, oResponse] = oArgs;
          try {
            await oHandler[sMethod](...oArgs);
          } catch (oError) {
            if (oError instanceof ResponseError) {
              oResponse.status(oError.code).json({
                success: false,
                status: oError.code,
                message: oError.message,
              });
            } else if (oError instanceof Error) {
              oResponse.status(500).json({
                success: false,
                status: 500,
                message: oError.message,
              });
            }
          }
        }
      );
    });
  });

  return oRouter;
};

/**
 * Get all filenames in directories and sub-directories
 *
 * @author Michael Allen Elguira <michael01@simplexi.com.ph>
 */
function getFilenames(sRootDirectory: string) {
  let aFiles: string[] = [];

  const recursiveFilenameGrepper = (sDirectory: string) => {
    fs.readdirSync(sDirectory).forEach((sFilename) => {
      const sFilepath = path.resolve(sDirectory, sFilename);

      if (fs.statSync(sFilepath).isDirectory())
        recursiveFilenameGrepper(sFilepath);
      else aFiles.push(sFilepath.replace(sRootDirectory, ""));
    });
  };

  recursiveFilenameGrepper(sRootDirectory);

  return aFiles;
}

export default registerController;
