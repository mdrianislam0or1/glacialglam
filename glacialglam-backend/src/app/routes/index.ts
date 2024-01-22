import { Router } from 'express';
import { UserRouters } from '../modules/user/user.route';
import { ProductsRoutes } from '../modules/product/product.route';
import { ReviewRouters } from '../modules/review/review.route';
import { OrderRoutes } from '../modules/order/order.route';
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
    path: '/api/orders',
    route: OrderRoutes,
  },
  {
    path: '/api',
    route: ReviewRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
