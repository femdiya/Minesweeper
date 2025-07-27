
document.addEventListener('DOMContentLoaded', () =>
{

    const themeToggleButton = document.getElementById('theme-toggle-button');
    const themeMenu = document.getElementById('theme-menu');
    const themeMenuItems = document.querySelectorAll('.theme-menu-item');

    const icons = {
        light: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
        dark: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
        system: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`
    };

    function updateUI()
    {
        const currentTheme = theme.get();
        themeToggleButton.innerHTML = icons[currentTheme];
        themeMenuItems.forEach(item =>
        {
            if (item.getAttribute('data-theme') === currentTheme) {
                item.classList.add('font-semibold');
            } else {
                item.classList.remove('font-semibold');
            }
        });
    }

    updateUI();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () =>
    {
        if (theme.get() === 'system') {
            updateUI();
        }
    });

    themeToggleButton.addEventListener('click', (event) =>
    {
        event.stopPropagation();
        themeMenu.classList.toggle('hidden');
    });

    themeMenuItems.forEach(item =>
    {
        item.addEventListener('click', () =>
        {
            const selectedTheme = item.getAttribute('data-theme');
            theme.set(selectedTheme);
            updateUI();
            themeMenu.classList.add('hidden');
        });
    });

    document.addEventListener('click', () =>
    {
        if (!themeMenu.classList.contains('hidden')) {
            themeMenu.classList.add('hidden');
        }
    });
});