import { Router } from 'express';
import { UserRouters } from '../modules/user/user.route';
import { ProductsRoutes } from '../modules/product/product.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/api/auth',
    route: UserRouters,
  },
  {
    path: '/api',
    route: ProductsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
