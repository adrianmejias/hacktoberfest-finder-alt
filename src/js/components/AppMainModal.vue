<template>
    <section class="grid-item-container fixed top-0 bottom-0 left-0 right-0 max-w-full h-full" @click="closeModal" v-cloak>
        <a :href="currentResult.html_url" target="_blank" class="bg-white hover:bg-pinkish rounded-lg p-2 text-black flex flex-col justify-center items-center overflow-hidden overflow-y-auto shadow-lg grid-item max-w-md mx-auto" :title="currentResult.title" @click.prevent.stop="openWindow">
            <div class="flex flex-wrap flex-row w-full items-center justify-center mb-2">
                <span v-for="label in currentResult.labels" class="text-center rounded-sm text-xs px-2 py-1 m-1 shadow-md" :style="{ backgroundColor: `#${label.color}` }" :class="{ 'font-bold': labels.includes(label.name.toLowerCase()) }" v-text="label.name.toLowerCase()"></span>
            </div>
            <h2 class="text-center text-xl mb-4 font-bold" v-text="currentResult.title"></h2>
            <h3 class="text-center text-blue text-sm mb-4 break-words" v-text="`${currentResult.user.login}/${currentResult.repo_title}`"></h3>
            <div class="text-left border-gray border-solid border-l-4 pl-2 text-sm mb-4 overflow-hidden overflow-y-scroll max-w-sm whitespace-pre-wrap h-full" v-text="currentResult.body" style="max-height: 14rem;"></div>
            <div class="text-center text-xs mb-4" :class="{ 'text-amber': !currentResult.comments }" v-if="!noReplyOnly" v-text="currentResult.comments > 0 ? `Replies: ${currentResult.comments}` : 'Gimme Gimme'"></div>
            <div class="text-left text-xs mb-4" v-text="`Opend by: ${currentResult.user.login}`"></div>
            <div class="text-center text-xs mb-4">
                <time :datetime="currentResult.unformatted_date" v-text="`Last updated: ${currentResult.formatted_date}`"></time>
            </div>
        </a>
    </section>
</template>

<script>
    export default {
        props: ['labels', 'noReplyOnly', 'currentResult'],

        mounted() {
            (() => {
                document.addEventListener('keydown', this.escapeModal, false);
            })();
        },

        beforeDestroy() {
            document.removeEventListener('keydown', this.escapeModal, false);
        },

        methods: {
            escapeModal(event) {
                if ((event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) && (event.target.nodeName.toLowerCase() === 'body')) {
                    event.preventDefault();
                    this.closeModal();
                }
            },

            closeModal() {
                Bus.$emit('closeModal');
            },

            openWindow() {
                window.open(this.currentResult.html_url, 'hofWindow');
            }
        }
    }
</script>
