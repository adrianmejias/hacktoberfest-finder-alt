<template>
    <fixed-header>
        <header class="container mx-auto my-6 flex flex-row flex-wrap justify-between items-center" v-cloak>
            <div class="flex flex-row flex-wrap items-center logo-wrapper">
                <a href="https://hacktoberfest.digitalocean.com" title="Hacktoberfest 2019" target="_blank" rel="noreferrer" class="logo-link">
                    <img class="mx-auto md:w-64 sm:w-full logo" src="/images/header.svg" alt="Hacktoberfest 2019">
                </a>
                <h1 class="text-5xl font-bold text-primary uppercase mx-auto my-4 md:my-0 text-center logo-title">
                    Issue Finder
                </h1>
            </div>
            <div class="w-full md:w-auto flex flex-row flex-wrap items-center justify-around mx-auto my-4">
                <span class="text-primary text-lg font-semibold uppercase mx-2">
                    Filter By:
                </span>
                <div class="flex flex-column justify-around items-center filter relative" v-click-outside="hideFilter">
                    <button type="button" class="text-primary text-lg font-semibold uppercase relative focus:outline-none" @click="toggleFilter" v-text="currentLanguage ? currentLanguage : 'Language'"></button>
                    <div v-show="isFilterToggled" class="filter-values flex flex-col bg-primary absolute top-0 right-0 mt-2 w-48 shadow-xl rounded-lg overflow-hidden overflow-y-auto border-2 border-primary border-solid h-64">
                        <input class="bg-white appearance-none border-2 border-secondary rounded w-full p-2 text-secondary leading-tight focus:outline-none focus:border-1" type="search" ref="languageTextRef" placeholder="ie. javas..." v-model="filterLanguageText">
                        <button type="button" class="font-bold text-md p-2 language" :class="{ 'text-white bg-secondary hover:bg-secondary hover:text-white': !currentLanguage, 'text-secondary bg-primary hover:bg-secondary hover:text-white': currentLanguage }" @click="chooseLanguage('')">Any</button>
                        <button type="button" v-for="language in filteredLanguages" class="font-thin text-sm p-2 language" :class="{ 'text-white bg-secondary hover:bg-secondary hover:text-white': currentLanguage === language, 'text-secondary bg-primary hover:bg-secondary hover:text-white': currentLanguage !== language }" @click="chooseLanguage(language)" v-text="language"></button>
                    </div>
                </div>
                <span class="text-primary text-lg font-semibold uppercase mx-2">
                    /
                </span>
                <button type="button" class="text-primary text-lg font-semibold uppercase mx-2 px-2 py-1 rounded border-1" :class="{ 'bg-primary text-secondary': noReplyOnly }" @click="toggleNoReplyFilter">
                    No Reply
                </button>
            </div>
            <div class="flex flex-row flex-wrap justify-center items-center">
                <div class="md:w-64 sm:w-full">
                    <label class="text-primary">
                        <input class="mr-2 leading-tight" type="checkbox" v-model="autoRefresh">
                        <span class="text-xs">
                            Auto Refresh
                        </span>
                    </label>
                    <button type="button" class="text-primary text-xs font-semibold mx-2 my-2" @click="refreshLanguage">
                        (refresh)
                    </button>
                </div>
                <button type="button" v-for="name in labels" class="text-amber text-xs font-semibold mx-2 my-2" @click="removeLabel(name)" v-text="`#${name.toLowerCase()}`"></button>
            </div>
        </header>
    </fixed-header>
</template>

<script>
    import FixedHeader from 'vue-fixed-header';
    import ClickOutside from 'vue-click-outside';

    export default {
        props: ['labels', 'languages', 'currentLanguage', 'isFilterToggled', 'noReplyOnly'],

        components: { FixedHeader },
        directives: { ClickOutside },

        data() {
            return {
                autoRefresh: false,
                autoRefreshTime: 1000 * 60 * 15, // 15 minutes
                autoTimer: null,
                filterLanguageText: ''
            }
        },

        watch: {
            autoRefresh(newValue, oldValue) {
                localStorage.setItem('auto-refresh', newValue);

                if (newValue) {
                    this.startAutoRefresh();
                } else {
                    this.cancelAutoRefresh();
                }
            }
        },

        created() {
            this.autoRefresh = (localStorage.getItem('auto-refresh') || 'false') === 'true';

            this.startAutoRefresh();
        },

        beforeDestroy() {
            this.cancelAutoRefresh();
        },

        computed: {
            filteredLanguages() {
                if (this.filterLanguageText) {
                    return this.languages.filter(language => language.toLowerCase().includes(this.filterLanguageText.toLowerCase()));
                }

                return this.languages;
            }
        },

        methods: {
            hideFilter() {
                if (this.isFilterToggled) {
                    this.toggleFilter();
                }
            },

            toggleFilter() {
                Bus.$emit('toggleFilter');

                if (!this.isFilterToggled) {
                    this.$nextTick(() => {
                        this.$refs.languageTextRef.focus();
                    });
                }
            },

            removeLabel(labelName) {
                this.cancelAutoRefresh();
                Bus.$emit('removeLabel', labelName);
                this.startAutoRefresh();
            },

            toggleNoReplyFilter() {
                this.cancelAutoRefresh();
                Bus.$emit('toggleNoReplyFilter');
                this.startAutoRefresh();
            },

            refreshLanguage() {
                this.cancelAutoRefresh();
                Bus.$emit('chooseLanguage', this.currentLanguage);
                this.startAutoRefresh();
            },

            startAutoRefresh() {
                if (this.autoRefresh) {
                    this.autoTimer = setInterval(this.refreshLanguage, this.autoRefreshTime);
                }
            },

            cancelAutoRefresh() {
                clearInterval(this.autoTimer);
            },

            chooseLanguage(language) {
                this.cancelAutoRefresh();
                Bus.$emit('chooseLanguage', language);
                this.startAutoRefresh();
            }
        }
    }
</script>
