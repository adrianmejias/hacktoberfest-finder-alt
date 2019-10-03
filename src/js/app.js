/**
    Require dependencies
*/

window.Vue = require('vue');

/**
    Create a Vue instance
*/

const app = new Vue({
    el: '#app',

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
                            formattedDate: this.formatDate(new Date(updated_at)),
                        })
                    );

                    this.showViewMore = this.results.length > 0;
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

            this.reloadIssues();
        },

        removeLabel(labelName) {
            if (!['hacktoberfest'].includes(labelName.toLowerCase())) {
                this.labels.splice(this.labels.indexOf(labelName.toLowerCase()), 1);

                this.reloadIssues();
            }
        },

        appendLabel(labelName) {
            if (this.labels.includes(labelName.toLowerCase())) {
                this.labels.splice(this.labels.indexOf(labelName.toLowerCase()), 1);
            } else {
                this.labels.push(labelName);
            }

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
    },

    created() {
        this.loadIssues();
    }
});
