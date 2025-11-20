import express from "express";

import userRoutes from "./user.route.js";
import emailTemplateRoutes from "./emailTemplate.route.js";

const appRouter = express.Router();

const appRoutes = [
  { path: "/users", router: userRoutes },
  { path: "/emailTemplate", router: emailTemplateRoutes },
];

appRoutes.forEach(({ path, router }) => appRouter.use(path, router));

export default appRouter;
