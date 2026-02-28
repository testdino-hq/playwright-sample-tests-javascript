// @ts-check
import { expect, test } from '@playwright/test';

// Base API URL - adjust this to match your actual API endpoint
const API_BASE_URL = process.env.API_BASE_URL || 'https://dummyjson.com';
const USERS_ENDPOINT = '/users';

test.describe('DELETE User API', () => {
  
  test('Remove user 1', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-001' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'DELETE remove user by ID' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const userId = 1;
    const response = await request.delete(`${API_BASE_URL}${USERS_ENDPOINT}/${userId}`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id', userId);
    expect(body).toHaveProperty('isDeleted', true);

    const responseTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'api-response-time',
        value: responseTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'api-calls',
        value: 1,
        unit: 'count',
      }),
    });
  });

  test('Remove user twice', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-002' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'DELETE user twice idempotency' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const userId = 2;
    
    // First deletion
    const response1 = await request.delete(`${API_BASE_URL}${USERS_ENDPOINT}/${userId}`);
    expect(response1.status()).toBe(200);
    const body1 = await response1.json();
    expect(body1).toHaveProperty('id', userId);
    
    const response2 = await request.delete(`${API_BASE_URL}${USERS_ENDPOINT}/${userId}`);
    expect(response2.status()).toBe(200);
    const body2 = await response2.json();
    expect(body2).toHaveProperty('id', userId);

    const responseTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'api-response-time',
        value: responseTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'api-calls',
        value: 2,
        unit: 'count',
      }),
    });
  });

  test('Validate body is returned', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-003' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'DELETE response body validation' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const userId = 3;
    const response = await request.delete(`${API_BASE_URL}${USERS_ENDPOINT}/${userId}`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    // Validate response body structure
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty('id');
    expect(typeof body.id).toBe('number');

    const responseTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'api-response-time',
        value: responseTime,
        unit: 'ms',
        threshold: 5000,
      }),
    });
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'api-calls',
        value: 1,
        unit: 'count',
      }),
    });
  });
});
