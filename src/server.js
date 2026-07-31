import express from 'express';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import swaggerUi from 'swagger-ui-express';
import expenseRoutes from './routes/expenseRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(express.json());

// Bind routes
app.use('/api/expenses', expenseRoutes);

// Serve OpenAPI/Swagger documentation UI with trailing slash redirection
app.use('/api-docs', (req, res, next) => {
  if (req.originalUrl === '/api-docs') {
    return res.redirect(301, '/api-docs/');
  }
  next();
}, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'An internal server error occurred.' });
});

// Start the server only if run directly
if (process.argv[1] && (process.argv[1] === __filename || process.argv[1].endsWith('server.js'))) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Smart Expense Tracker API listening on port ${PORT}`);
    console.log(`OpenAPI Documentation available at http://localhost:${PORT}/api-docs`);
  });
}

export default app;
