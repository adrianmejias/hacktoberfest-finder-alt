<template>
    <main class="container mx-auto my-12" v-cloak>
        <div id="results" class="grid">
            <div v-for="result in results" class="bg-white hover:bg-pinkish rounded-lg p-2 text-black flex flex-col justify-center items-center overflow-hidden overflow-y-auto shadow-lg grid-item" @click="toggleIssue(result)">
                <div class="flex flex-wrap flex-row w-full items-center justify-center mb-2">
                    <button type="button" v-for="label in result.labels" class="text-center rounded-sm text-xs px-2 py-1 m-1 shadow-md" :style="{ backgroundColor: `#${label.color}` }" :class="{ 'font-bold': labels.includes(label.name.toLowerCase()) }" @click.prevent.stop="appendLabel(label.name)" v-text="label.name.toLowerCase()"></button>
                </div>
                <h2 class="text-center text-xl mb-4 font-bold" v-text="result.title"></h2>
                <h3 class="text-center text-blue text-sm mb-4 break-words" v-text="`${result.user.login}/${result.repoTitle}`"></h3>
                <div class="text-left border-gray border-solid border-l-4 pl-2 text-sm mb-4 truncate max-w-xs" v-text="result.body"></div>
                <div class="text-center text-xs mb-4" :class="{ 'text-amber': !result.comments }" v-if="!noReplyOnly" v-text="result.comments > 0 ? `Replies: ${result.comments}` : 'Gimme Gimme'"></div>
                <div class="text-center text-xs mb-4">
                    <time :datetime="result.unformattedDate" v-text="`Last updated: ${result.formattedDate}`"></time>
                </div>
            </div>
        </div>
        <div v-if="showViewMore || isFetching" class="flex flex-row items-center justify-center mt-6">
            <button type="button" class="uppercase font-thin text-primary border-2 border-primary text-3xl bg-secondary hover:bg-primary hover:text-secondary py-2 px-4 rounded" :disabled="isFetching" @click="loadMoreIssues" v-text="isFetching ? 'Loading More Issues...' : 'Load More Issues'"></button>
        </div>
    </main>
</template>

<script>
    export default {
        props: ['labels', 'noReplyOnly', 'isFetching', 'results', 'showViewMore'],

        methods: {
            loadMoreIssues() {
                Bus.$emit('loadMoreIssues');
            },

            appendLabel(labelName) {
                Bus.$emit('appendLabel', labelName);
            },

            toggleIssue(result) {
                Bus.$emit('toggleIssue', result);
            }
        }
    }
</script>
