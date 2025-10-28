<template>
    <footer class="bg-gray-800 text-white py-8 mt-12">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="mb-4 md:mb-0">
                    <p class="text-sm">
                        &copy; {{ currentYear }} Hacktoberfest Finder. Made with ❤️ for open source.
                    </p>
                </div>
                <div class="flex space-x-4">
                    <a
                        href="https://github.com"
                        class="text-gray-400 hover:text-white transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://hacktoberfest.digitalocean.com"
                        class="text-gray-400 hover:text-white transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Hacktoberfest
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'AppFooter',
    computed: {
        currentYear() {
            return new Date().getFullYear();
        }
    }
}
</script>
