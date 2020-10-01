import { controller, interfaces } from "inversify-express-utils";
import { TYPES } from "../../constants/types";

export function authorizedController(
  url: string,
  ...middleWares: interfaces.Middleware[]
) {
  return (target: any) =>
    controller(url, TYPES.Authorization, ...middleWares)(target);
}
