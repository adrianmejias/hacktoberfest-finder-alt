<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
    <footer
        class="border-border mt-8 w-full max-w-[335px] border-t pt-6 lg:max-w-4xl"
    >
        <div
            class="text-muted-foreground flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between"
        >
            <p>
                &copy; {{ currentYear }} Hacktoberfest Issue Finder. Made with ❤️ for
                open source in conjunction with AI.
            </p>
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
