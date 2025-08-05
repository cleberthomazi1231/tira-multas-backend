import { Router } from 'express';
import appConfig from '../config/app';
import AuthController from '../presentation/controllers/AuthController';
import BuyerController from '../presentation/controllers/BuyerController';
import DealerController from '../presentation/controllers/DealerController';
import QuestionController from '../presentation/controllers/QuestionController';
import ResourceController from '../presentation/controllers/ResourceController';
import SaleController from '../presentation/controllers/SaleController';
import UserController from '../presentation/controllers/UserController';
import ensureAuthenticated from '../presentation/middlewares/ensureAuthenticated';
import ContactController from '../presentation/controllers/ContactController';

const routes = Router();

routes.post('/users', UserController.create(appConfig.services));
routes.put('/users/:id', ensureAuthenticated, UserController.update(appConfig.services));
routes.delete('/users/:id', ensureAuthenticated, UserController.delete(appConfig.services));
routes.get('/users', ensureAuthenticated, UserController.list(appConfig.services));
routes.get('/users/:id', ensureAuthenticated, UserController.find(appConfig.services));

routes.post('/buyers', BuyerController.create(appConfig.services));
routes.put('/buyers/:id',  BuyerController.update(appConfig.services));
routes.delete('/buyers/:id', BuyerController.delete(appConfig.services));
routes.get('/buyers', BuyerController.list(appConfig.services)); 
routes.get('/buyers/:id', BuyerController.find(appConfig.services));
routes.get('/buyers/:buyer_id/sales', SaleController.listByBuyerId(appConfig.services));

routes.post('/dealers', ensureAuthenticated, DealerController.create(appConfig.services));
routes.put('/dealers/:id', ensureAuthenticated, DealerController.update(appConfig.services));
routes.delete('/dealers/:id', ensureAuthenticated, DealerController.delete(appConfig.services));
routes.get('/dealers', ensureAuthenticated, DealerController.list(appConfig.services)); 
routes.get('/dealers/:id', ensureAuthenticated, DealerController.find(appConfig.services));

routes.post('/questions', ensureAuthenticated, QuestionController.create(appConfig.services));
routes.put('/questions/:id', ensureAuthenticated, QuestionController.update(appConfig.services));
routes.delete('/questions/:id', ensureAuthenticated, QuestionController.delete(appConfig.services));
routes.get('/questions', QuestionController.list(appConfig.services));
routes.get('/questions/:id', QuestionController.find(appConfig.services));

routes.post('/resources', ensureAuthenticated, ResourceController.create(appConfig.services));
routes.put('/resources/:id', ensureAuthenticated, ResourceController.update(appConfig.services));
routes.delete('/resources/:id', ensureAuthenticated, ResourceController.delete(appConfig.services));
routes.get('/resources', ResourceController.list(appConfig.services));
routes.get('/resources/:id', ResourceController.find(appConfig.services));

routes.post('/auth/user', AuthController.authenticate(appConfig.services));
routes.post('/auth/dealer', AuthController.authDealer(appConfig.services));
routes.post('/auth/buyer', AuthController.authBuyer(appConfig.services));
routes.post('/auth/user/refresh_token', AuthController.refreshToken(appConfig.services));

routes.post('/sales', ensureAuthenticated, SaleController.create(appConfig.services));
routes.post('/sales/buy', SaleController.buy(appConfig.services));
routes.get('/sales', ensureAuthenticated, SaleController.list(appConfig.services));
routes.get('/sales/:id.html', SaleController.generateHTML(appConfig.services));
routes.get('/sales/:id/preview.html', SaleController.generateHTMLPreview(appConfig.services));
routes.get('/sales/:id', SaleController.find(appConfig.services));
routes.get('/sales/:id/pdf', SaleController.generatePDF(appConfig.services));
routes.get('/sales/:id/pdf/preview', SaleController.generatePDFPreview(appConfig.services));

routes.post('/contact', ContactController.send(appConfig.services));

routes.post('/mercadopago/:id', SaleController.updateStatusMercadoPago(appConfig.services));

export default routes;  