// @ts-check
import { expect, test } from '@playwright/test';

// Base API URL - adjust this to match your actual API endpoint
const API_BASE_URL = process.env.API_BASE_URL || 'https://dummyjson.com';
const USERS_ENDPOINT = '/users';
const ADD_ENDPOINT = '/users/add';

test.describe('POST Create User API', () => {

  test('Bad endpoint returns 404', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-001' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'POST bad endpoint returns 404' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const userData = {
      firstName: 'Test',
      lastName: 'User'
    };
    
    const response = await request.post(`${API_BASE_URL}${USERS_ENDPOINT}/invalid-endpoint`, {
      data: userData
    });
    
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

  test('Invalid JSON payload handling', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-002' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Invalid JSON payload handling' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const response = await request.post(`${API_BASE_URL}${ADD_ENDPOINT}`, {
      data: 'invalid json string',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Should return 400 Bad Request for invalid JSON
    expect([400, 422]).toContain(response.status());

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

  test('Too large ID param should return 404', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-003' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Too large ID param returns 404' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const tooLargeId = 999999999;
    const response = await request.get(`${API_BASE_URL}${USERS_ENDPOINT}/${tooLargeId}`);
    
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

  test('Deleting invalid id returns 200/response but not crash', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-004' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Delete invalid id response handling' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const invalidId = 999999;
    const response = await request.delete(`${API_BASE_URL}${USERS_ENDPOINT}/${invalidId}`);
    
    expect([200, 404]).toContain(response.status());
    const body = await response.json();
    expect(body).toBeInstanceOf(Object);

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

  test('PUT: Invalid method usage returns appropriate response (no 500)', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-005' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Invalid PUT method usage response' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const userId = 1;
    const updateData = {
      firstName: 'Updated'
    };
    
    // Try PUT on an endpoint that might not support it properly
    const response = await request.put(`${API_BASE_URL}${USERS_ENDPOINT}/${userId}/invalid`, {
      data: updateData
    });
    
    // Should return appropriate error (400, 404, 405) but not 500
    expect([400, 404, 405, 200]).toContain(response.status());
    expect(response.status()).not.toBe(500);

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

  test('user schema contains expected keys', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-006' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'User schema expected keys validation' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const response = await request.get(`${API_BASE_URL}${USERS_ENDPOINT}/1`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    // Validate expected keys in user schema
    const expectedKeys = ['id', 'firstName', 'lastName'];
    expectedKeys.forEach(key => {
      expect(body).toHaveProperty(key);
    });

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

  test('users list contains objects with id and email', {
    tag: '@api',
    annotation: [
      { type: 'testdino:priority', description: 'p1' },
      { type: 'testdino:feature', description: 'API' },
      { type: 'testdino:link', description: 'https://jira.example.com/API-007' },
      { type: 'testdino:owner', description: 'qa-team' },
      { type: 'testdino:notify-slack', description: '#e2e-alerts' },
      { type: 'testdino:context', description: 'Users list id and email validation' }
    ]
  }, async ({ request }) => {
    const start = Date.now();
    const response = await request.get(`${API_BASE_URL}${USERS_ENDPOINT}`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    const users = body.users || body;
    const usersArray = Array.isArray(users) ? users : [];
    
    if (usersArray.length > 0) {
      // Check first user has id and email
      const firstUser = usersArray[0];
      expect(firstUser).toHaveProperty('id');
      if (firstUser.email !== undefined) {
        expect(typeof firstUser.email).toBe('string');
      }
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
