import { test, expect } from '@playwright/test';
import { MINIMAL_ISC_YAML } from '../helpers/minimalConfig.js';

const CONFIG_NAME = 'e2e-workflow-config.yaml';

test.describe('Config to Operations workflow', () => {
  test.afterAll(async ({ request }) => {
    await request.delete(`/api/config/delete/${CONFIG_NAME}`).catch(() => {});
  });

  test('create config via API, verify it appears in Mirror Operations', async ({
    page,
    request,
  }) => {
    await page.goto('/');
    await expect(page.getByText(/Mirror-GUI|mirror/i).first()).toBeVisible({ timeout: 15000 });

    const saveRes = await request.post('/api/config/save', {
      data: { config: MINIMAL_ISC_YAML, name: CONFIG_NAME },
    });
    expect(saveRes.ok(), `Config save failed: ${await saveRes.text()}`).toBeTruthy();

    await page.goto('/operations');

    await expect(page.getByText(/mirror operations|operation/i).first()).toBeVisible({
      timeout: 15000,
    });

    const configToggle = page.getByLabel('Select ImageSetConfiguration file');
    await expect(configToggle).toBeVisible({ timeout: 15000 });
    await configToggle.click();
    await page.getByRole('option', { name: new RegExp(CONFIG_NAME) }).click();
    await expect(configToggle).toContainText(CONFIG_NAME);
  });
});
