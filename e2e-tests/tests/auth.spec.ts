import { test, expect } from '@playwright/test';

const baseUrl = 'http://localhost:5173';

test('should allow user to login', async ({ page }) => {
  // Navigate to the base URL
  await page.goto(`${baseUrl}`);
  // Click on the login link
  await page.getByRole('link', { name: 'Login' }).click();
  // await expect(page.getByRole('heading', { name: 'Login in to your account' })).toBeVisible();

  // Fill in the login form and submit
  await page.locator('input[name="email"]').fill('imad@gmail.com');
  await page.locator('input[name="password"]').fill('imad123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('logged in successfully!')).toBeVisible();

  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

});

test('should allow user to signup', async ({ page }) => {
  const testEmail = `testuser${Date.now()}@example.com`;
  // Navigate to the base URL
  await page.goto(`${baseUrl}`);
  // Click on the signup link
  await page.getByRole('link', { name: 'Sign Up' }).click();
  // await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();

  // Fill in the signup form and submit
  await page.locator('input[name="firstName"]').fill('useruser');
  await page.locator('input[name="lastName"]').fill('useruser');
  await page.locator('input[name="email"]').fill(testEmail);
  await page.locator('input[name="password"]').fill('user123');
  await page.locator('input[name="confirmPassword"]').fill('user123');
  await page.getByRole('button', { name: 'Sign Up' }).click();

  await expect(page.getByText('Signup successful!')).toBeVisible();

  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

});




