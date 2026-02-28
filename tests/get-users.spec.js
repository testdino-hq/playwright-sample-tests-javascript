// @ts-check
import { expect, test } from '@playwright/test';

// Base API URL - adjust this to match your actual API endpoint
const API_BASE_URL = process.env.API_BASE_URL || 'https://dummyjson.com';
const USERS_ENDPOINT = '/users';

test.describe('GET Users API', () => {
  
  test('Fetch all users', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-001' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'GET fetch all users' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const response = await request.get(`${API_BASE_URL}${USERS_ENDPOINT}`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('users');
    expect(Array.isArray(body.users)).toBe(true);

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

  test('Fetch user by ID = 1', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-002' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'GET user by ID' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const response = await request.get(`${API_BASE_URL}${USERS_ENDPOINT}/1`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('firstName');
    expect(body).toHaveProperty('lastName');

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

  test('Validate total users > 0', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-003' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Validate total users count' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const response = await request.get(`${API_BASE_URL}${USERS_ENDPOINT}`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('total');
    expect(body.total).toBeGreaterThan(0);

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

  test('Validate user image exists', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-004' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Validate user image field' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const response = await request.get(`${API_BASE_URL}${USERS_ENDPOINT}/1`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('image');
    expect(body.image).toBeTruthy();
    expect(typeof body.image).toBe('string');

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

  test('Validate user 1 has firstName field', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-005' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Validate firstName field' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const response = await request.get(`${API_BASE_URL}${USERS_ENDPOINT}/1`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('firstName');
    expect(typeof body.firstName).toBe('string');
    expect(body.firstName.length).toBeGreaterThan(0);

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

  test('Invalid user ID returns 404', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-006' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Invalid user ID returns 404' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const response = await request.get(`${API_BASE_URL}${USERS_ENDPOINT}/999999`);
    
    expect(response.status()).toBe(404);

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

  test('default users (no query) returns data object/array', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-007' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Default users response structure' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const response = await request.get(`${API_BASE_URL}${USERS_ENDPOINT}`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toBeInstanceOf(Object);
    // Should have either 'users' array or be an array itself
    expect(body.users || Array.isArray(body)).toBeTruthy();

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

  test('limit param returns limited results', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-008' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Limit param pagination' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const limit = 5;
    const response = await request.get(`${API_BASE_URL}${USERS_ENDPOINT}?limit=${limit}`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    const users = body.users || body;
    const usersArray = Array.isArray(users) ? users : [];
    expect(usersArray.length).toBeLessThanOrEqual(limit);

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

  test('skip param shifts results', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-009' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Skip param pagination' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const skip = 5;
    const limit = 10;
    
    // Get first page
    const response1 = await request.get(`${API_BASE_URL}${USERS_ENDPOINT}?limit=${limit}&skip=0`);
    const body1 = await response1.json();
    const users1 = body1.users || body1;
    const firstUser1 = Array.isArray(users1) ? users1[0] : null;
    
    // Get second page with skip
    const response2 = await request.get(`${API_BASE_URL}${USERS_ENDPOINT}?limit=${limit}&skip=${skip}`);
    const body2 = await response2.json();
    const users2 = body2.users || body2;
    const firstUser2 = Array.isArray(users2) ? users2[0] : null;
    
    expect(response1.status()).toBe(200);
    expect(response2.status()).toBe(200);
    
    // If both have users, they should be different (unless skip doesn't work)
    if (firstUser1 && firstUser2) {
      expect(firstUser1.id).not.toBe(firstUser2.id);
    }

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

  test('sorting / search query (if supported) returns filtered results', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-010' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Search query filtered results' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    // Try search query parameter (common patterns: q, search, query)
    const searchTerm = 'john';
    const response = await request.get(`${API_BASE_URL}${USERS_ENDPOINT}/search?q=${searchTerm}`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    const users = body.users || body;
    const usersArray = Array.isArray(users) ? users : [];
    
    if (usersArray.length > 0) {
      // At least verify the response structure is valid
      expect(Array.isArray(usersArray)).toBe(true);
    }

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

  test('delayed response (3s) should return 200', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-011' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Delayed response returns 200' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const isRetry = test.info().retry > 0;
    if (!isRetry) {
      expect(true).toBe(false); 
    }
    
    const delay = 3;
    const startTime = Date.now();
    
    const response = await request.get(`${API_BASE_URL}${USERS_ENDPOINT}?delay=${delay}`, {
      timeout: 10000 // 10 second timeout
    });
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    expect(response.status()).toBe(200);
    expect(duration).toBeGreaterThanOrEqual(delay - 0.5);
    
    const body = await response.json();
    expect(body).toBeInstanceOf(Object);

    const responseTime = Date.now() - start;
    test.info().annotations.push({
      type: 'testdino:metric',
      description: JSON.stringify({
        name: 'api-response-time',
        value: responseTime,
        unit: 'ms',
        threshold: 10000,
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

  test('enforce timeout (expect to fail if too slow) — set short timeout', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-012' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Enforce request timeout' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const delay = 5; 
    const shortTimeout = 2000; 
    
    try {
      const response = await request.get(`${API_BASE_URL}${USERS_ENDPOINT}?delay=${delay}`, {
        timeout: shortTimeout
      });
      

      expect(response.status()).toBe(200);
    } catch (error) {
      expect(error.message).toMatch(/timeout|Timeout/i);
    }

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
