<template>
    <header class="container mx-auto my-6 flex flex-row flex-wrap justify-between" v-cloak>
        <div class="flex flex-row flex-wrap items-center">
            <a href="https://hacktoberfest.digitalocean.com" title="Hacktoberfest 2019" target="_blank" rel="noreferrer">
                <img class="mx-auto" src="/images/header.svg" alt="Hacktoberfest 2019" width="400px">
            </a>
            <h1 class="text-5xl font-bold text-primary uppercase mx-auto my-4 md:my-0 text-center">
                Issue Finder
            </h1>
        </div>
        <div class="w-full md:w-auto flex flex-row flex-wrap items-center justify-around mx-auto my-4">
            <span class="text-primary text-lg font-semibold uppercase mx-2">
                Filter By:
            </span>
            <div class="flex flex-column items-center filter relative" v-click-outside="hideFilter">
                <button type="button" class="text-primary text-lg font-semibold uppercase relative focus:outline-none" @click="toggleFilter">
                    Language
                </button>
                <div v-show="isFilterToggled" class="filter-values flex flex-col bg-primary absolute top-0 right-0 mt-2 w-48 shadow-xl rounded-lg overflow-hidden overflow-y-auto border-2 border-primary border-solid h-64">
                    <button type="button" class="font-bold text-md p-2 language" :class="{ 'text-white bg-secondary hover:bg-secondary hover:text-white': !currentLanguage, 'text-secondary bg-primary hover:bg-secondary hover:text-white': currentLanguage }" @click="chooseLanguage('')">Any</button>
                    <button type="button" v-for="language in languages" class="font-thin text-sm p-2 language" :class="{ 'text-white bg-secondary hover:bg-secondary hover:text-white': currentLanguage === language, 'text-secondary bg-primary hover:bg-secondary hover:text-white': currentLanguage !== language }" @click="chooseLanguage(language)" v-text="language"></button>
                </div>
            </div>
            <span class="text-primary text-lg font-semibold uppercase mx-2">
                /
            </span>
            <button type="button" class="text-primary text-lg font-semibold uppercase mx-2 px-2 py-1 rounded border-1" :class="{ 'bg-primary text-secondary': noReplyOnly }" @click="toggleNoReplyFilter">
                No Reply
            </button>
        </div>
        <div class="flex flex-row flex-wrap items-center">
            <div class="text-primary text-lg font-semibold mx-2 my-2" v-if="currentLanguage" v-text="`${currentLanguage}:`"></div>
            <button type="button" v-for="name in labels" class="text-amber text-lg font-semibold mx-2 my-2" @click="removeLabel(name)" v-text="`#${name.toLowerCase()}`"></button>
        </div>
    </header>
</template>

<script>
    import ClickOutside from 'vue-click-outside';

    export default {
        props: ['labels', 'languages', 'currentLanguage', 'isFilterToggled', 'noReplyOnly'],

        directives: { ClickOutside },

        methods: {
            hideFilter() {
                if (this.isFilterToggled) {
                    this.toggleFilter();
                }
            },

            toggleFilter() {
                Bus.$emit('toggleFilter');
            },

            removeLabel(labelName) {
                Bus.$emit('removeLabel', labelName);
            },

            toggleNoReplyFilter() {
                Bus.$emit('toggleNoReplyFilter');
            },

            chooseLanguage(language) {
                Bus.$emit('chooseLanguage', language);
            }
        }
    }
</script>
