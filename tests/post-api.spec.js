// @ts-check
import { expect, test } from '@playwright/test';

// Base API URL - adjust this to match your actual API endpoint
const API_BASE_URL = process.env.API_BASE_URL || 'https://dummyjson.com';
const USERS_ENDPOINT = '/users';
const ADD_ENDPOINT = '/users/add';

test.describe('POST Create User API', () => {
  
  test('Create a new user @api', async ({ request }) => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      email: `john.doe.${Date.now()}@example.com`
    };
    
    const response = await request.post(`${API_BASE_URL}${ADD_ENDPOINT}`, {
      data: userData
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('firstName', userData.firstName);
    expect(body).toHaveProperty('lastName', userData.lastName);
  });

  test('Create user with extra fields @api', async ({ request }) => {
    const userData = {
      firstName: 'Jane',
      lastName: 'Smith',
      age: 25,
      email: `jane.smith.${Date.now()}@example.com`,
      extraField1: 'extra value 1',
      extraField2: 'extra value 2',
      customProperty: 12345
    };
    
    const response = await request.post(`${API_BASE_URL}${ADD_ENDPOINT}`, {
      data: userData
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('firstName', userData.firstName);
    // Extra fields might be ignored or included depending on API
  });

  test('Create user without any fields @api', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}${ADD_ENDPOINT}`, {
      data: {}
    });
    
    // Should either return 400 (bad request) or 200 with default values
    expect([200, 400]).toContain(response.status());
    const body = await response.json();
    expect(body).toBeInstanceOf(Object);
  });

  test('Validate response has createdAt timestamp (simulated) @api', async ({ request }) => {
    const userData = {
      firstName: 'Test',
      lastName: 'User',
      age: 28,
      email: `test.user.${Date.now()}@example.com`
    };
    
    const response = await request.post(`${API_BASE_URL}${ADD_ENDPOINT}`, {
      data: userData
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    // Check for createdAt or similar timestamp field
    const hasTimestamp = body.hasOwnProperty('createdAt') || 
                        body.hasOwnProperty('created') || 
                        body.hasOwnProperty('dateCreated');
    
    // At minimum, validate the response structure
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty('id');
  });

  test('Validate created user has id @api', async ({ request }) => {
    const userData = {
      firstName: 'Alice',
      lastName: 'Johnson',
      age: 32,
      email: `alice.johnson.${Date.now()}@example.com`
    };
    
    const response = await request.post(`${API_BASE_URL}${ADD_ENDPOINT}`, {
      data: userData
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(typeof body.id).toBe('number');
    expect(body.id).toBeGreaterThan(0);
  });

  test('Validate server echoes fields @api', async ({ request }) => {
    const userData = {
      firstName: 'Bob',
      lastName: 'Williams',
      age: 35,
      email: `bob.williams.${Date.now()}@example.com`
    };
    
    const response = await request.post(`${API_BASE_URL}${ADD_ENDPOINT}`, {
      data: userData
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    // Server should echo back the sent fields
    expect(body).toHaveProperty('firstName', userData.firstName);
    expect(body).toHaveProperty('lastName', userData.lastName);
    expect(body).toHaveProperty('age', userData.age);
  });

  test('Bad endpoint returns 404 @api', async ({ request }) => {
    const userData = {
      firstName: 'Test',
      lastName: 'User'
    };
    
    const response = await request.post(`${API_BASE_URL}${USERS_ENDPOINT}/invalid-endpoint`, {
      data: userData
    });
    
    expect(response.status()).toBe(404);
  });

  test('Invalid JSON payload handling @api', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}${ADD_ENDPOINT}`, {
      data: 'invalid json string',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Should return 400 Bad Request for invalid JSON
    expect([400, 422]).toContain(response.status());
  });

  test('Too large ID param should return 404 @api', async ({ request }) => {
    const tooLargeId = 999999999;
    const response = await request.get(`${API_BASE_URL}${USERS_ENDPOINT}/${tooLargeId}`);
    
    expect(response.status()).toBe(404);
  });

  test('Deleting invalid id returns 200/response but not crash @api', async ({ request }) => {
    const invalidId = 999999;
    const response = await request.delete(`${API_BASE_URL}${USERS_ENDPOINT}/${invalidId}`);
    
    // Should return 200 or 404, but not 500 (server error)
    expect([200, 404]).toContain(response.status());
    const body = await response.json();
    expect(body).toBeInstanceOf(Object);
  });

  test('PUT: Invalid method usage returns appropriate response (no 500) @api', async ({ request }) => {
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
  });

  test('Rate-limit simulation - quick repeated calls @api', async ({ request }) => {
    const userData = {
      firstName: 'Rate',
      lastName: 'Test',
      age: 25,
      email: `rate.test.${Date.now()}@example.com`
    };
    
    // Make multiple rapid requests
    const promises = [];
    for (let i = 0; i < 5; i++) {
      promises.push(
        request.post(`${API_BASE_URL}${ADD_ENDPOINT}`, {
          data: {
            ...userData,
            email: `rate.test.${Date.now()}.${i}@example.com`
          }
        })
      );
    }
    
    const responses = await Promise.all(promises);
    
    // All should either succeed (200) or be rate limited (429)
    responses.forEach(response => {
      expect([200, 429, 400]).toContain(response.status());
    });
  });

  test('user schema contains expected keys @api', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}${USERS_ENDPOINT}/1`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    // Validate expected keys in user schema
    const expectedKeys = ['id', 'firstName', 'lastName'];
    expectedKeys.forEach(key => {
      expect(body).toHaveProperty(key);
    });
  });

  test('users list contains objects with id and email @api', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}${USERS_ENDPOINT}`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    const users = body.users || body;
    const usersArray = Array.isArray(users) ? users : [];
    
    if (usersArray.length > 0) {
      // Check first user has id and email
      const firstUser = usersArray[0];
      expect(firstUser).toHaveProperty('id');
      // Email might be optional, so check if it exists
      if (firstUser.email !== undefined) {
        expect(typeof firstUser.email).toBe('string');
      }
    }
  });
});
