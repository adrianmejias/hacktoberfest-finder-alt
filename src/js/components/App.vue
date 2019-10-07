<template>
    <div v-cloak>
        <app-header :labels="labels" :languages="languages" :current-language="currentLanguage" :is-filter-toggled="isFilterToggled" :no-reply-only="noReplyOnly"></app-header>
        <app-main :labels="labels" :no-reply-only="noReplyOnly" :is-fetching="isFetching" :results="results" :show-view-more="showViewMore"></app-main>
        <app-main-modal :labels="labels" :no-reply-only="noReplyOnly" :current-result="currentResult" v-if="currentResult"></app-main-modal>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import AppHeader from './AppHeader';
    import AppMain from './AppMain';
    import AppMainModal from './AppMainModal';
    import AppFooter from './AppFooter';
    import languages from '../data/languages.json';

    export default {
        components: { AppHeader, AppMain, AppMainModal, AppFooter },

        data() {
            return {
                topLanguages: [
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

                languages: languages,

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
            this.currentLanguage = localStorage.getItem('language') || '';
            this.labels = JSON.parse(localStorage.getItem('labels') || JSON.stringify(this.labels));
            this.noReplyOnly = (localStorage.getItem('noreply') || 'false') === 'true';

            this.languages.sort();

            this.loadIssues();
        },

        mounted() {
            Bus.$on('toggleFilter', () => {
                this.toggleFilter();
            });

            Bus.$on('removeLabel', (labelName) => {
                this.removeLabel(labelName);
            });

            Bus.$on('toggleNoReplyFilter', () => {
                this.toggleNoReplyFilter();
            });

            Bus.$on('chooseLanguage', (language) => {
                this.chooseLanguage(language);
            });

            Bus.$on('loadMoreIssues', () => {
                this.loadMoreIssues();
            });

            Bus.$on('appendLabel', (labelName) => {
                this.appendLabel(labelName);
            });

            Bus.$on('toggleIssue', (result) => {
                this.toggleIssue(result);
            });

            Bus.$on('closeModal', () => {
                this.closeModal();
            });
        },

        beforeDestroy() {
            this.results = [];
        },

        methods: {
            loadIssues() {
                this.showViewMore = false;
                this.isFetching = true;

                fetch(`https://api.github.com/search/issues?page=${this.page}&q=${this.filterLabels}${this.filterLanguage}+type:issue+state:open${this.filterNoReply}`)
                    .then(response => response.json())
                    .then(response => {
                        const items = response.items.map(
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

                        this.results = [...this.results, ...items].sort((a, b) => {
                            if (new Date(a.updated_at) > new Date(b.updated_at)) {
                                return 1;
                            } else if (new Date(b.updated_at) > new Date(a.updated_at)) {
                                return -1;
                            }

                            return 0;
                        });

                        this.showViewMore = this.results.length < response.total_count;
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

                localStorage.setItem('language', this.currentLanguage);

                this.reloadIssues();
            },

            removeLabel(labelName) {
                if (!['hacktoberfest'].includes(labelName.toLowerCase())) {
                    this.labels.splice(this.labels.indexOf(labelName.toLowerCase()), 1);

                    localStorage.setItem('labels', JSON.stringify(this.labels));

                    this.reloadIssues();
                }
            },

            appendLabel(labelName) {
                if (this.labels.includes(labelName.toLowerCase())) {
                    this.labels.splice(this.labels.indexOf(labelName.toLowerCase()), 1);
                } else {
                    this.labels.push(labelName);
                }

                localStorage.setItem('labels', JSON.stringify(this.labels));

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

                localStorage.setItem('noreply', this.noReplyOnly);

                this.loadIssues();
            },

            toggleIssue(result) {
                this.currentResult = result;
            },

            closeModal() {
                this.toggleIssue(null);
            }
        },

        computed: {
            filterLabels() {
                return 'label:' + this.labels.map(name => {
                    return `"${name}"`
                        .split('+')
                        .join('%2B')
                        .split('#')
                        .join('%23')
                        .toLowerCase();
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
