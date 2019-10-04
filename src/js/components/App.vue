<template>
    <div v-cloak>
        <header class="container mx-auto my-6 flex flex-row flex-wrap justify-between">
            <div class="flex flex-row flex-wrap items-center">
                <a href="https://hacktoberfest.digitalocean.com" title="Hacktoberfest 2019">
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
                <div class="flex flex-column items-center filter relative">
                    <button type="button" class="text-primary text-lg font-semibold uppercase relative focus:outline-none" @click="toggleFilter">
                        Language
                    </button>
                    <div v-show="isFilterToggled" class="filter-values flex flex-col bg-primary absolute top-0 right-0 mt-2 w-48 shadow-xl rounded-lg overflow-hidden overflow-y-auto border-2 border-primary border-solid h-64">
                        <button type="button" v-for="language in languages" class="font-thin text-1xl p-2 language" :class="{ 'text-white bg-secondary hover:bg-secondary hover:text-white': currentLanguage === language, 'text-secondary bg-primary hover:bg-secondary hover:text-white': currentLanguage !== language }" @click="chooseLanguage(language)" v-text="language"></button>
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
                <div class="text-primary text-lg font-semibold mx-2 my-2" v-if="currentLanguage">
                    {{ currentLanguage }}:
                </div>
                <button type="button" v-for="name in labels" class="text-amber text-lg font-semibold mx-2 my-2" @click="removeLabel(name)">#{{ name.toLowerCase() }}</button>
            </div>
        </header>
        <main class="container mx-auto my-12">
            <div id="results" class="grid">
                <div v-for="result in results" class="bg-white hover:bg-pinkish rounded-lg p-2 text-black flex flex-col justify-center items-center overflow-hidden overflow-y-auto shadow-lg grid-item" @click="toggleIssue(result)">
                    <div class="flex flex-wrap flex-row w-full items-center justify-center mb-2">
                        <button type="button" v-for="label in result.labels" class="text-center rounded-sm text-xs px-2 py-1 m-1 shadow-md" :style="{ backgroundColor: `#${label.color}` }" :class="{ 'font-bold': labels.includes(label.name.toLowerCase()) }" @click.prevent.stop="appendLabel(label.name)">{{ label.name.toLowerCase() }}</button>
                    </div>
                    <h2 class="text-center text-xl mb-4 font-bold">{{ result.title }}</h2>
                    <h3 class="text-center text-blue text-sm mb-4 break-words">{{ result.user.login }}/{{ result.repoTitle }}</h3>
                    <div class="text-left border-gray border-solid border-l-4 pl-2 text-sm mb-4 truncate max-w-xs" v-text="result.body"></div>
                    <div class="text-center text-xs mb-4" :class="{ 'text-amber': !result.comments }" v-if="!noReplyOnly">{{ result.comments > 0 ? `Replies: ${result.comments}` : 'Gimme Gimme' }}</div>
                    <div class="text-center text-xs mb-4">
                        <time :datetime="result.unformattedDate">Last updated: {{ result.formattedDate }}</time>
                    </div>
                </div>
            </div>
            <div v-if="showViewMore" class="flex flex-row items-center justify-center mt-6">
                <button class="uppercase font-thin text-primary border-2 border-primary text-3xl bg-secondary hover:bg-primary hover:text-secondary py-2 px-4 rounded" :disabled="isFetching" @click="loadMoreIssues" v-text="isFetching ? 'Loading More Issues...' : 'Load More Issues'"></button>
            </div>
        </main>
        <div class="grid-item-container fixed top-0 bottom-0 left-0 right-0 max-w-full h-full" v-if="currentResult" @click="currentResult = null">
            <a :href="currentResult.html_url" target="_blank" class="bg-white hover:bg-pinkish rounded-lg p-2 text-black flex flex-col justify-center items-center overflow-hidden overflow-y-auto shadow-lg grid-item max-w-md mx-auto" :title="currentResult.title">
                <div class="flex flex-wrap flex-row w-full items-center justify-center mb-2">
                    <span v-for="label in currentResult.labels" class="text-center rounded-sm text-xs px-2 py-1 m-1 shadow-md" :style="{ backgroundColor: `#${label.color}` }" :class="{ 'font-bold': labels.includes(label.name.toLowerCase()) }">{{ label.name.toLowerCase() }}</span>
                </div>
                <h2 class="text-center text-xl mb-4 font-bold">{{ currentResult.title }}</h2>
                <h3 class="text-center text-blue text-sm mb-4 break-words">{{ currentResult.user.login }}/{{ currentResult.repoTitle }}</h3>
                <div class="text-left border-gray border-solid border-l-4 pl-2 text-sm mb-4 overflow-hidden overflow-y-scroll max-w-sm whitespace-pre-wrap h-full" v-text="currentResult.body" style="max-height: 14rem;"></div>
                <div class="text-center text-xs mb-4" :class="{ 'text-amber': !currentResult.comments }" v-if="!noReplyOnly">{{ currentResult.comments > 0 ? `Replies: ${currentResult.comments}` : 'Gimme Gimme' }}</div>
                <div class="text-center text-xs mb-4">
                    <time :datetime="currentResult.unformattedDate">Last updated: {{ currentResult.formattedDate }}</time>
                </div>
            </a>
        </div>
        <footer class="bg-primary w-full mt-8">
            <div class="container mx-auto flex flex-row items-center justify-between p-8">
                <div class="flex flex-row items-center justify-center">
                    <p class="text-amber">Unofficial site by <a class="text-secondary" href="http://duncan.mcclean.co.uk">Duncan McClean</a> and <a class="text-secondary" href="https://github.com/damcclean/hacktoberfest-finder/blob/master/CONTRIBUTORS.md">contributors</a>. Contribute on <a class="text-secondary" href="https://github.com/damcclean/hacktoberfest-finder" target="_blank">GitHub!</a></p>
                </div>
                <div class="flex flex-row items-center justify-center">
                    <a class="mx-2 w-6 h-6" href="https://www.digitalocean.com">
                        <img class="w-6 h-6" src="/images/digital-ocean.png">
                    </a>
                    <a class="mx-2 w-6 h-6" href="https://dev.to">
                        <img class="w-6 h-6" src="/images/dev.svg">
                    </a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                languages: [
                    'JavaScript',
                    'TypeScript',
                    'Python',
                    'Java',
                    'PHP',
                    'Go',
                    'HTML',
                    'C++',
                    'C#',
                    'Ruby'
                ],

                labels: [
                    'hacktoberfest'
                ],

                results: [],
                page: 1,
                currentLanguage: '',
                isFilterToggled: false,
                isFetching: false,
                showViewMore: false,
                noReplyOnly: false,
                currentResult: null
            };
        },

        created() {
            this.currentLanguage = window.localStorage.getItem('language') || '';
            this.labels = JSON.parse(window.localStorage.getItem('labels') || JSON.stringify(this.labels));
            this.noReplyOnly = (window.localStorage.getItem('noreply') || 'false') === 'true';

            this.loadIssues();
        },

        methods: {
            loadIssues() {
                this.showViewMore = false;
                this.isFetching = true;

                fetch(`https://api.github.com/search/issues?page=${this.page}&q=${this.filterLabels}${this.filterLanguage}+type:issue+state:open${this.filterNoReply}`)
                    .then(response => response.json())
                    .then(response => {
                        this.results = [...this.results, ...response.items];

                        this.results = this.results.map(
                            ({ repository_url, updated_at, ...rest }) => ({
                                ...rest,
                                repoTitle: repository_url
                                    .split('/')
                                    .slice(-1)
                                    .join(),
                                unformattedDate: this.unformatDate(updated_at),
                                formattedDate: this.formatDate(new Date(updated_at))
                            })
                        );

                        this.showViewMore = this.results.length < response.total_count;
                        console.log(this.showViewMore)
                        this.isFetching = false;
                    })
                    .catch(error => {
                        this.showViewMore = false;
                        this.isFetching = false;
                    });
            },

            unformatDate(updatedAt) {
                return `${new Date(updatedAt).toLocaleDateString()} ${new Date(updatedAt).toLocaleTimeString()}`;
            },

            formatDate(updatedAt) {
                const delta = Math.round((+new Date - updatedAt) / 1000);
                const minute = 60;
                const hour = minute * 60;
                const day = hour * 24;
                const week = day * 7;
                const daysInYear = updatedAt.getFullYear() % 400 === 0 || (updatedAt.getFullYear() % 100 !== 0 && updatedAt.getFullYear() % 4 === 0) ? 366 : 365;

                if (delta < 30) {
                    return 'just now';
                } else if (delta < minute) {
                    return delta + ' seconds ago';
                } else if (delta < 2 * minute) {
                    return 'a minute ago';
                } else if (delta < hour) {
                    return Math.floor(delta / minute) + ' minutes ago';
                } else if (Math.floor(delta / hour) == 1) {
                    return 'an hour ago';
                } else if (delta < day) {
                    return Math.floor(delta / hour) + ' hours ago';
                } else if (delta < day * 2) {
                    return 'yesterday';
                } else if (delta < week) {
                    return 'last week';
                } else if (delta < daysInYear) {
                    return 'last year';
                }

                return `${new Date(updatedAt).toLocaleDateString()}, ${new Date(updatedAt).toLocaleTimeString()}`;
            },

            loadMoreIssues() {
                this.page++;
                this.loadIssues();
            },

            reloadIssues() {
                this.results = [];
                this.isFilterToggled = false;
                this.showViewMore = false;
                this.isFetching = false;
                this.page = 1;

                this.loadIssues();
            },

            chooseLanguage(language) {
                this.currentLanguage = language;

                window.localStorage.setItem('language', this.currentLanguage);

                this.reloadIssues();
            },

            removeLabel(labelName) {
                if (!['hacktoberfest'].includes(labelName.toLowerCase())) {
                    this.labels.splice(this.labels.indexOf(labelName.toLowerCase()), 1);

                    window.localStorage.setItem('labels', JSON.stringify(this.labels));

                    this.reloadIssues();
                }
            },

            appendLabel(labelName) {
                if (this.labels.includes(labelName.toLowerCase())) {
                    this.labels.splice(this.labels.indexOf(labelName.toLowerCase()), 1);
                } else {
                    this.labels.push(labelName);
                }

                window.localStorage.setItem('labels', JSON.stringify(this.labels));

                this.reloadIssues();
            },

            toggleFilter() {
                this.isFilterToggled = !this.isFilterToggled;
            },

            toggleNoReplyFilter() {
                this.results = [];
                this.noReplyOnly = !this.noReplyOnly;
                this.showViewMore = false;
                this.isFetching = false;
                this.page = 1;

                window.localStorage.setItem('noreply', this.noReplyOnly);

                this.loadIssues();
            },

            toggleIssue(result) {
                this.currentResult = result;
            }
        },

        computed: {
            filterLabels() {
                return 'label:' + this.labels.map(name => {
                    return `"${name}"`
                }).join('+label:');
            },
            filterNoReply() {
                if (this.noReplyOnly) {
                    return '+comments:0';
                }

                return '';
            },
            filterLanguage() {
                if (this.currentLanguage) {
                    return '+language:' + this.currentLanguage
                        .split('+')
                        .join('%2B')
                        .split('#')
                        .join('%23')
                        .toLowerCase();
                }

                return '';
            }
        }
    }
</script>
