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

        results: [],
        page: 1,
        currentLanguage: '',
        isFilterToggled: false,
        isFetching: false,
        showViewMore: false,
        noReplyOnly: false
      }
    },

    methods: {
        loadIssues() {
            this.isFetching = true;

            fetch(`https://api.github.com/search/issues?page=${this.page}&q=language:${this.filterLanguage}+label:hacktoberfest+type:issue+state:open${this.filterComments}`)
                .then(response => response.json())
                .then(response => {
                    // make changes prior to appending items to results
                    const items = response.items.map(({repository_url, updated_at, ...rest}) => ({
                      ...rest,
                      repoTitle: repository_url.split('/').slice(-1).join(),
                      formattedDate: `${new Date(updated_at).toLocaleDateString()}, ${new Date(updated_at).toLocaleTimeString()}`
                    }));

                    this.results = [...this.results, ...items];

                    this.page ++;
                    this.showViewMore = true;
                    this.isFetching = false;

                    if (response.items.length === 0) { // case when all the issues are already loaded
                      this.showViewMore = false;
                    }
                }).catch(error => {
                    this.showViewMore = false;
                    this.isFetching = false;
                });
        },

        chooseLanguage(language) {
            this.results = [];
            this.currentLanguage = language;
            this.isFilterToggled = !this.isFilterToggled;
            this.showViewMore = false;
            this.isFetching = false;
            this.page = 1;

            this.loadIssues();
        },

        toggleFilter() {
            this.isFilterToggled = !this.isFilterToggled
        },

        toggleNoReplyFilter() {
            this.results = [];
            this.noReplyOnly = !this.noReplyOnly;
            this.showViewMore = false;
            this.isFetching = false;
            this.page = 1;

            this.loadIssues()
        }
    },

    computed: {
        filterComments() {
            return this.noReplyOnly ? '+comments:0' : '';
        },
        filterLanguage() {
            return this.currentLanguage.split('+').join('%2B').split('#').join('%23').toLowerCase();
        }
    },

    mounted() {
        this.loadIssues()
    }
});
