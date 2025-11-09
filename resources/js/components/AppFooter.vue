<script setup lang="ts">
// Simple footer component for the public pages
</script>

<template>
    <footer
        class="mt-8 w-full max-w-[335px] lg:max-w-4xl border-t border-border pt-6"
    >
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
            <p>© 2025 Hacktoberfest Finder. Made with ❤️ for open source.</p>
            <div class="flex gap-4">
                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-accent transition-colors"
                >
                    GitHub
                </a>
                <a
                    href="https://hacktoberfest.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-accent transition-colors"
                >
                    Hacktoberfest
                </a>
            </div>
        </div>
    </footer>
</template>
