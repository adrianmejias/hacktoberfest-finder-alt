<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
    <footer
        class="mt-8 w-full max-w-[335px] border-t border-border pt-6 lg:max-w-4xl"
    >
        <div
            class="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
        >
            <p>
                &copy; {{ currentYear }} Hacktoberfest Issue Finder. Made with
                ❤️ for open source in conjunction with AI.
            </p>
            <div class="flex gap-4">
                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="transition-colors hover:text-accent"
                >
                    GitHub
                </a>
                <a
                    href="https://hacktoberfest.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="transition-colors hover:text-accent"
                >
                    Hacktoberfest
                </a>
            </div>
        </div>
    </footer>
</template>
