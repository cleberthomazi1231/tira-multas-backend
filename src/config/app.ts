import AuthService from '../services/AuthService';
import BuyerService from '../services/BuyerService';
import ContactService from '../services/ContactService';
import DealerService from '../services/DealerService';
import QuestionService from '../services/QuestionService';
import ResourceService from '../services/ResourceService';
import SaleService from '../services/SaleService';
import UserService from '../services/UserService';

const appConfig = {
    services: { 
        authService: new AuthService(),
        contactService: new ContactService(),
        buyerService: new BuyerService(),
        dealerService: new DealerService(),
        questionService: new QuestionService(),
        resourceService: new ResourceService(),
        saleService: new SaleService(),
        userService: new UserService(),
    },
    secret: process.env.APP_SECRET as string
};

export type AppConfig = typeof appConfig;

export default appConfig;