# Tira Multas Backend

A Node.js/TypeScript backend application for managing traffic ticket services, built with Express.js, Knex.js for database operations, and integrated with MercadoPago for payments.

## 🚀 Features

- **User Management**: Authentication and authorization system
- **Dealer Management**: CRUD operations for dealers
- **Buyer Management**: Customer management system
- **Sales Management**: Complete sales lifecycle with payment integration
- **Resource Management**: Dynamic document templates and resources
- **Question Management**: FAQ and support system
- **Payment Integration**: MercadoPago payment processing
- **Email Service**: AWS SES integration
- **File Storage**: Static file serving for documents and images

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- AWS account (for SES email service)
- MercadoPago account (for payment processing)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory with the following variables:

   ```env
   # Application
   NODE_ENV=development
   TIRA_MULTAS_APP_PORT=3000
   TIRA_MULTAS_APP_SECRET=your_jwt_secret_key
   TIRA_MULTAS_APP_HOST=http://localhost:3000

   # Database
   TIRA_MULTAS_DB_DRIVE=postgresql
   TIRA_MULTAS_DB_HOST=localhost
   TIRA_MULTAS_DB_PORT=5432
   TIRA_MULTAS_DB_NAME=tira_multas
   TIRA_MULTAS_DB_USER=your_db_user
   TIRA_MULTAS_DB_PASS=your_db_password

   # AWS SES (Email Service)
   TIRA_MULTAS_AWS_ACCESS_KEY=your_aws_access_key
   TIRA_MULTAS_AWS_SECRET_ACCESS_KEY=your_aws_secret_key

   # MercadoPago
   TIRA_MULTAS_MERCHANT_KEY_MP=your_mercadopago_access_token
   ```

## 🗄️ Database Setup

1. **Create PostgreSQL database**
   ```sql
   CREATE DATABASE tira_multas;
   ```

2. **Run database migrations**
   ```bash
   npm run db:migrate
   # or
   yarn db:migrate
   ```

   This will create the following tables:
   - `users` - User management
   - `address` - Address information
   - `dealers` - Dealer accounts
   - `buyers` - Customer information
   - `questions` - FAQ and support
   - `resources` - Document templates
   - `sales` - Sales transactions

## 🚀 Development

### Starting the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will start on `http://localhost:3000` (or the port specified in your `.env` file).

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:dev` - Run tests in watch mode
- `npm run db:migrate` - Run database migrations
- `npm run db:rollback` - Rollback database migrations

## 🏗️ Production Deployment

### 1. Build the Application

```bash
npm run build
```

This will compile TypeScript to JavaScript in the `build/` directory.

### 2. Environment Setup for Production

Create a production `.env` file with production values:

```env
NODE_ENV=production
TIRA_MULTAS_APP_PORT=3000
TIRA_MULTAS_APP_SECRET=your_production_jwt_secret
TIRA_MULTAS_APP_HOST=https://your-domain.com

# Production Database
TIRA_MULTAS_DB_DRIVE=postgresql
TIRA_MULTAS_DB_HOST=your_production_db_host
TIRA_MULTAS_DB_PORT=5432
TIRA_MULTAS_DB_NAME=tira_multas_prod
TIRA_MULTAS_DB_USER=your_production_db_user
TIRA_MULTAS_DB_PASS=your_production_db_password

# Production AWS SES
TIRA_MULTAS_AWS_ACCESS_KEY=your_production_aws_key
TIRA_MULTAS_AWS_SECRET_ACCESS_KEY=your_production_aws_secret

# Production MercadoPago
TIRA_MULTAS_MERCHANT_KEY_MP=your_production_mercadopago_token
```

### 3. Database Migration for Production

```bash
NODE_ENV=production npm run db:migrate
```

### 4. Start Production Server

```bash
npm start
```

### 5. Using PM2 (Recommended for Production)

Install PM2 globally:
```bash
npm install -g pm2
```

Create a `ecosystem.config.js` file:
```javascript
module.exports = {
  apps: [{
    name: 'tira-multas-backend',
    script: 'build/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    },
    env_file: '.env'
  }]
}
```

Start with PM2:
```bash
pm2 start ecosystem.config.js
```

### 6. Using Docker (Alternative)

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t tira-multas-backend .
docker run -p 3000:3000 --env-file .env tira-multas-backend
```

## 📚 API Endpoints

### Authentication
- `POST /auth/user` - User authentication
- `POST /auth/dealer` - Dealer authentication
- `POST /auth/buyer` - Buyer authentication
- `POST /auth/user/refresh_token` - Refresh JWT token

### Users
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `GET /users` - List users
- `GET /users/:id` - Get user by ID

### Dealers
- `POST /dealers` - Create dealer
- `PUT /dealers/:id` - Update dealer
- `DELETE /dealers/:id` - Delete dealer
- `GET /dealers` - List dealers
- `GET /dealers/:id` - Get dealer by ID

### Buyers
- `POST /buyers` - Create buyer
- `PUT /buyers/:id` - Update buyer
- `DELETE /buyers/:id` - Delete buyer
- `GET /buyers` - List buyers
- `GET /buyers/:id` - Get buyer by ID
- `GET /buyers/:buyer_id/sales` - Get buyer's sales

### Sales
- `POST /sales` - Create sale
- `POST /sales/buy` - Process purchase
- `GET /sales` - List sales
- `GET /sales/:id` - Get sale by ID
- `GET /sales/:id.html` - Generate HTML document
- `GET /sales/:id/preview.html` - Generate HTML preview
- `GET /sales/:id/pdf` - Generate PDF document
- `GET /sales/:id/pdf/preview` - Generate PDF preview

### Resources
- `POST /resources` - Create resource
- `PUT /resources/:id` - Update resource
- `DELETE /resources/:id` - Delete resource
- `GET /resources` - List resources
- `GET /resources/:id` - Get resource by ID

### Questions
- `POST /questions` - Create question
- `PUT /questions/:id` - Update question
- `DELETE /questions/:id` - Delete question
- `GET /questions` - List questions
- `GET /questions/:id` - Get question by ID

### Contact
- `POST /contact` - Send contact message

### MercadoPago
- `POST /mercadopago/:id` - Update payment status

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | Yes |
| `TIRA_MULTAS_APP_PORT` | Application port | Yes |
| `TIRA_MULTAS_APP_SECRET` | JWT secret key | Yes |
| `TIRA_MULTAS_APP_HOST` | Application host URL | Yes |
| `TIRA_MULTAS_DB_DRIVE` | Database driver (postgresql) | Yes |
| `TIRA_MULTAS_DB_HOST` | Database host | Yes |
| `TIRA_MULTAS_DB_PORT` | Database port | Yes |
| `TIRA_MULTAS_DB_NAME` | Database name | Yes |
| `TIRA_MULTAS_DB_USER` | Database user | Yes |
| `TIRA_MULTAS_DB_PASS` | Database password | Yes |
| `TIRA_MULTAS_AWS_ACCESS_KEY` | AWS access key for SES | Yes |
| `TIRA_MULTAS_AWS_SECRET_ACCESS_KEY` | AWS secret key for SES | Yes |
| `TIRA_MULTAS_MERCHANT_KEY_MP` | MercadoPago access token | Yes |

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:dev
```

## 📁 Project Structure

```
src/
├── app/                    # Application setup
│   ├── errors/            # Error handling
│   ├── logger/            # Logging configuration
│   ├── routes.ts          # Route definitions
│   └── server.ts          # Express server setup
├── config/                # Configuration
│   └── app.ts            # App configuration
├── domain/               # Domain models
│   ├── Address.ts
│   ├── Buyer.ts
│   ├── Dealer.ts
│   ├── Question.ts
│   ├── Resource.ts
│   ├── Sale.ts
│   └── User.ts
├── infra/                # Infrastructure layer
│   ├── cryptography/     # Encryption utilities
│   ├── database/         # Database configuration
│   │   ├── knex/        # Knex.js setup
│   │   │   ├── migrations/  # Database migrations
│   │   │   └── repositories/ # Data access layer
│   └── mail/            # Email service
│       └── SES/         # AWS SES integration
├── presentation/         # Presentation layer
│   ├── controllers/      # Route controllers
│   └── middlewares/     # Express middlewares
├── services/            # Business logic layer
└── utils/               # Utility functions
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit sensitive information to version control
2. **JWT Secrets**: Use strong, unique secrets for JWT tokens
3. **Database**: Use strong passwords and restrict database access
4. **HTTPS**: Always use HTTPS in production
5. **CORS**: Configure CORS properly for your domain
6. **Rate Limiting**: Consider implementing rate limiting for API endpoints

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify database credentials in `.env`
   - Ensure PostgreSQL is running
   - Check if database exists

2. **Migration Errors**
   - Run `npm run db:rollback` to revert changes
   - Check migration files for syntax errors
   - Ensure database user has proper permissions

3. **Build Errors**
   - Clear `build/` directory: `rm -rf build/`
   - Reinstall dependencies: `rm -rf node_modules && npm install`
   - Check TypeScript configuration

4. **Port Already in Use**
   - Change port in `.env` file
   - Kill process using the port: `lsof -ti:3000 | xargs kill -9`

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check the logs for error messages
4. Contact the development team

## 📄 License

This project is proprietary software. All rights reserved. 