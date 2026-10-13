import { expect, test } from '@playwright/test';

for (const previousTrail of [null, 'logic'] as const) {
  test(`Explorar abre cibersegurança com ${previousTrail ? 'outra trilha selecionada' : 'a seleção inicial'}`, async ({ page }) => {
    await page.goto('/');
    if (previousTrail) {
      await page.getByRole('button', { name: 'Minhas trilhas' }).click();
      await page.getByRole('button', { name: /Lógica de programação/ }).click();
      await expect(page).toHaveURL(`/trilhas?trilha=${previousTrail}`);
      await page.getByRole('button', { name: 'Visão geral', exact: true }).click();
    }

    await page.getByRole('button', { name: 'Explorar', exact: true }).click();
    await expect(page).toHaveURL('/trilhas?trilha=security');
    await expect(page.getByRole('heading', { name: 'Introdução à cibersegurança', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /Introdução à cibersegurança/ })).toHaveAttribute('aria-pressed', 'true');

    await page.goBack();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('button', { name: 'Explorar', exact: true })).toBeVisible();
    await page.goForward();
    await expect(page).toHaveURL('/trilhas?trilha=security');
    await expect(page.getByRole('heading', { name: 'Introdução à cibersegurança', exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Visão geral', exact: true }).click();
    await page.getByRole('button', { name: 'Explorar', exact: true }).click();
    await expect(page).toHaveURL('/trilhas?trilha=security');
  });
}
