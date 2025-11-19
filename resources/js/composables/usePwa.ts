/**
 * Type definition for the user choice promise.
 */
type UserChoice = Promise<{
    /**
     * The outcome of the user's choice.
     */
    outcome: 'accepted' | 'dismissed';

    /**
     * The platform on which the choice was made.
     */
    platform: string;
}>;

/**
 * Interface for the beforeinstallprompt event.
 */
interface BeforeInstallPromptEvent extends Event {
    /**
     * The list of platforms that can handle the installation.
     */
    readonly platforms: string[];

    /**
     * The user choice promise.
     */
    readonly userChoice: UserChoice;

    /**
     * Prompts the user to install the PWA.
     *
     * @returns {Promise<void>}
     */
    prompt(): Promise<void>;
}

/**
 * Extending the global WindowEventMap to include beforeinstallprompt event.
 */
declare global {
    /**
     * Extending the WindowEventMap interface.
     */
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}

/**
 * Extended interface for the deferred prompt event.
 */
interface deferredPromptType extends Event, BeforeInstallPromptEvent {}

/**
 * Class to handle PWA installation prompt.
 *
 * @class PWAInstallButton
 */
class PWAInstallButton {
    /**
     * The deferred prompt event.
     *
     * @type {deferredPromptType | null}
     */
    deferredPrompt: deferredPromptType | null;

    /**
     * The install prompt element.
     *
     * @type {HTMLElement | null}
     */
    installPrompt: HTMLElement | null =
        document.getElementById('install-prompt');

    /**
     * The install button element.
     *
     * @type {HTMLElement | null}
     */
    installButton: HTMLElement | null =
        document.getElementById('install-button');

    /**
     * The install cancel button element.
     *
     * @type {HTMLElement | null}
     */
    installCancel: HTMLElement | null =
        document.getElementById('install-cancel');

    constructor() {
        this.deferredPrompt = null;

        this.hideInstallPrompt();
    }

    /**
     * Hides the install prompt.
     *
     * @returns {void}
     */
    hideInstallPrompt = (): void => {
        if (this.installPrompt && this.installPrompt.style.display !== 'none') {
            this.installPrompt.style.display = 'none';
        }
    };

    /**
     * Shows the install prompt.
     *
     * @returns {void}
     */
    showInstallPrompt = (): void => {
        if (
            this.installPrompt &&
            this.installPrompt.style.display !== 'block'
        ) {
            this.installPrompt.style.display = 'block';
        }
    };

    /**
     * Checks the display mode and updates the install prompt visibility.
     *
     * @returns {void}
     */
    checkDisplayMode = (): void => {
        const mediaQuery = window.matchMedia('(display-mode: standalone)');

        console.log(`Display mode is standalone: ${mediaQuery.matches}`);

        if (mediaQuery.matches) {
            this.hideInstallPrompt();
            return;
        }

        this.showInstallPrompt();
    };

    /**
     * Handles the install button click.
     *
     * @param {Event} e - The click event.
     * @returns {Promise<void>}
     */
    handleInstallButtonClick = async (e: Event): Promise<void> => {
        e.preventDefault();

        if (!this.deferredPrompt) {
            console.warn('Deferred prompt not found.');
            return;
        }

        this.deferredPrompt.prompt();

        const { outcome } = await this.deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        this.deferredPrompt = null;
    };

    /**
     * Handles the install cancel button click.
     *
     * @param {Event} e - The click event.
     * @returns {void}
     */
    handleInstallCancelClick = (e: Event): void => {
        e.preventDefault();

        this.deferredPrompt = null;

        this.hideInstallPrompt();
    };

    /**
     * Loads the beforeinstallprompt event and sets up the install button.
     *
     * @param {BeforeInstallPromptEvent} e - The beforeinstallprompt event.
     * @returns {void}
     */
    loadBeforeInstallPrompt = (e: BeforeInstallPromptEvent): void => {
        e.preventDefault();

        this.deferredPrompt = e;

        this.showInstallPrompt();

        if (!this.installButton) {
            console.warn('Install button not found in the DOM.');
            return;
        }

        if (!this.installCancel) {
            console.warn('Install cancel button not found in the DOM.');
            return;
        }

        this.installButton.addEventListener('click', async (e) =>
            this.handleInstallButtonClick(e),
        );
        this.installCancel.addEventListener('click', (e) =>
            this.handleInstallCancelClick(e),
        );
    };
}

/**
 * Registers the service worker for the PWA.
 *
 * @returns {void}
 */
export function registerServiceWorker(): void {
    console.log('Registering service worker...');

    if (!('serviceWorker' in navigator)) {
        console.warn('Service workers are not supported in this browser.');
        return;
    }

    navigator.serviceWorker.register('/sw.js').then(
        (registration) => {
            console.log('Service worker registration succeeded', registration);
        },
        (error) => {
            console.error('Service worker registration failed', error);
        },
    );
}

/**
 * Handles the PWA installation prompt.
 *
 * @returns {void}
 */
export function handlePWAInstallPrompt(): void {
    const pwaInstallButton = new PWAInstallButton();

    window.addEventListener('load', () => pwaInstallButton.checkDisplayMode());
    window.addEventListener('beforeinstallprompt', (e) =>
        pwaInstallButton.loadBeforeInstallPrompt(e),
    );
    window.addEventListener('appinstalled', () =>
        pwaInstallButton.hideInstallPrompt(),
    );
}
