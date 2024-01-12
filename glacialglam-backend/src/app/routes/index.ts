import { Router } from 'express';
import { UserRouters } from '../modules/user/user.route';
import { ProductsRoutes } from '../modules/product/product.route';
import { ReviewRouters } from '../modules/review/review.route';
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
  {
    path: '/api',
    route: ReviewRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
