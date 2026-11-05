// Prueba E2E (Módulo 5.1).
// Cópialo en `tareas/e2e/tareas.spec.ts`.
import { test, expect } from '@playwright/test';

const EMAIL = `e2e-${Date.now()}@example.com`;
const PASSWORD = '12345678';

test.beforeAll(async ({ request }) => {
  await request.post('/api/auth/register', {
    data: { nombre: 'E2E', email: EMAIL, password: PASSWORD },
  });
});

test('crear una tarea y verla en el dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.getByPlaceholder('Email').fill(EMAIL);
  await page.getByPlaceholder('Contraseña').fill(PASSWORD);
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.waitForURL('**/dashboard');

  await page.getByPlaceholder('Nueva tarea').fill('Comprar leche');
  await page.getByRole('button', { name: 'Añadir' }).click();

  await expect(page.getByText('Comprar leche')).toBeVisible();
});
