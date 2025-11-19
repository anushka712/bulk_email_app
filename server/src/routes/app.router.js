import express from "express";

import userRoutes from "./user.route.js";

const appRouter = express.Router();

const appRoutes = [{ path: "/users", router: userRoutes }];

appRoutes.forEach(({ path, router }) => appRouter.use(path, router));

export default appRouter;
