import test from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/server.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, '../expenses.json');

let server;
let port;
let baseUrl;
let rootUrl;

test.before(async () => {
  // Ensure we start with a clean file
  await fs.writeFile(DATA_FILE, '[]', 'utf8');
  // Start server on a dynamic port
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      port = server.address().port;
      baseUrl = `http://localhost:${port}/api/expenses`;
      rootUrl = `http://localhost:${port}`;
      console.log(`Test server started on port ${port}`);
      resolve();
    });
  });
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
  // Restore empty database file
  await fs.writeFile(DATA_FILE, '[]', 'utf8');
});

test('Smart Expense Tracker API Integration Tests', async (t) => {
  let expenseId1;
  let expenseId2;

  await t.test('POST /api/expenses - Add first expense (Food)', async () => {
    const payload = {
      title: 'Groceries',
      amount: 45.50,
      category: 'Food',
      date: '2026-07-31'
    };

    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.equal(res.status, 201);
    const body = await res.json();
    assert.ok(body.id);
    assert.equal(body.title, payload.title);
    assert.equal(body.amount, payload.amount);
    assert.equal(body.category, payload.category);
    assert.equal(body.date, payload.date);

    expenseId1 = body.id;
  });

  await t.test('POST /api/expenses - Add second expense (Entertainment)', async () => {
    const payload = {
      title: 'Movie Tickets',
      amount: 25.00,
      category: 'Entertainment',
      date: '2026-08-01'
    };

    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.equal(res.status, 201);
    const body = await res.json();
    assert.ok(body.id);
    assert.equal(body.title, payload.title);
    assert.equal(body.amount, payload.amount);
    assert.equal(body.category, payload.category);
    assert.equal(body.date, payload.date);

    expenseId2 = body.id;
  });

  await t.test('POST /api/expenses - Add third expense (Food again)', async () => {
    const payload = {
      title: 'Lunch Out',
      amount: 15.25,
      category: 'Food',
      date: '2026-08-02'
    };

    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.equal(res.status, 201);
    const body = await res.json();
    assert.ok(body.id);
    assert.equal(body.title, payload.title);
    assert.equal(body.amount, payload.amount);
    assert.equal(body.category, payload.category);
    assert.equal(body.date, payload.date);
  });

  await t.test('POST /api/expenses - Validation failure (missing title)', async () => {
    const payload = {
      amount: 15.25,
      category: 'Food',
      date: '2026-08-02'
    };

    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.equal(res.status, 400);
    const body = await res.json();
    assert.ok(body.error);
    assert.match(body.error, /Title is required/);
  });

  await t.test('POST /api/expenses - Validation failure (negative amount)', async () => {
    const payload = {
      title: 'Valid Title',
      amount: -10,
      category: 'Food',
      date: '2026-08-02'
    };

    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.equal(res.status, 400);
    const body = await res.json();
    assert.ok(body.error);
    assert.match(body.error, /Amount is required and must be a positive number/);
  });

  await t.test('GET /api/expenses - View all expenses', async () => {
    const res = await fetch(baseUrl);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.length, 3);
  });

  await t.test('GET /api/expenses - Filter expenses by category (Food)', async () => {
    const res = await fetch(`${baseUrl}?category=Food`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.length, 2);
    assert.ok(body.every(exp => exp.category === 'Food'));
  });

  await t.test('GET /api/expenses - Filter expenses by category (Entertainment, case-insensitive)', async () => {
    const res = await fetch(`${baseUrl}?category=entertainment`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.length, 1);
    assert.equal(body[0].category, 'Entertainment');
  });

  await t.test('GET /api/expenses/total - Overall total', async () => {
    const res = await fetch(`${baseUrl}/total`);
    assert.equal(res.status, 200);
    const body = await res.json();
    // 45.50 + 25.00 + 15.25 = 85.75
    assert.equal(body.total, 85.75);
    assert.equal(body.category, 'all');
  });

  await t.test('GET /api/expenses/total - Total by category (Food)', async () => {
    const res = await fetch(`${baseUrl}/total?category=Food`);
    assert.equal(res.status, 200);
    const body = await res.json();
    // 45.50 + 15.25 = 60.75
    assert.equal(body.total, 60.75);
    assert.equal(body.category, 'Food');
  });

  await t.test('GET /api-docs - Swagger docs routing availability', async () => {
    // Check with trailing slash
    const resWithSlash = await fetch(`${rootUrl}/api-docs/`);
    assert.equal(resWithSlash.status, 200);
    const htmlWithSlash = await resWithSlash.text();
    assert.match(htmlWithSlash, /swagger/i);

    // Check without trailing slash (auto-redirect)
    const resNoSlash = await fetch(`${rootUrl}/api-docs`);
    assert.equal(resNoSlash.status, 200);
    const htmlNoSlash = await resNoSlash.text();
    assert.match(htmlNoSlash, /swagger/i);
  });

  await t.test('DELETE /api/expenses/:id - Delete an expense', async () => {
    const deleteRes = await fetch(`${baseUrl}/${expenseId2}`, {
      method: 'DELETE'
    });
    assert.equal(deleteRes.status, 200);
    const deleteBody = await deleteRes.json();
    assert.match(deleteBody.message, /deleted successfully/);

    // Verify it is gone
    const listRes = await fetch(baseUrl);
    const listBody = await listRes.json();
    assert.equal(listBody.length, 2);
    assert.ok(!listBody.some(exp => exp.id === expenseId2));

    // Verify totals updated
    const totalRes = await fetch(`${baseUrl}/total`);
    const totalBody = await totalRes.json();
    // 85.75 - 25.00 = 60.75
    assert.equal(totalBody.total, 60.75);
  });

  await t.test('DELETE /api/expenses/:id - Delete non-existent expense', async () => {
    const deleteRes = await fetch(`${baseUrl}/non-existent-uuid`, {
      method: 'DELETE'
    });
    assert.equal(deleteRes.status, 404);
    const deleteBody = await deleteRes.json();
    assert.ok(deleteBody.error);
    assert.match(deleteBody.error, /not found/);
  });
});
