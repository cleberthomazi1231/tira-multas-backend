import 'dotenv/config';
import logger from './app/logger';
import server from './app/server';

const app = server.listen(process.env.APP_PORT, () => {
    logger.Info(`[APP]: Started on port: ${process.env.APP_PORT}`);
});
  
process.on('SIGTERM', () => { 
    app.close(() => logger.Info('SIGTERM'));
    process.exit(0);
});  

process.on('SIGINT', () => {  
    app.close(() => logger.Info('SIGINT'));
    process.exit(0);
});
 
process.on('uncaughtException', (error) => {
    logger.Error('uncaughtException');
    logger.Error(error.message);
    app.close();
});
process.on('unhandledRejection', (error) => {
    logger.Error('unhandledRejection');
    logger.Error(error as Error);
    app.close();
}); 