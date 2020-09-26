<template>
  <div v-cloak>
    <app-header
      :labels="labels"
      :languages="languages"
      :current-language="currentLanguage"
      :is-filter-toggled="isFilterToggled"
      :no-reply-only="noReplyOnly"
    ></app-header>
    <app-main
      :labels="labels"
      :no-reply-only="noReplyOnly"
      :is-fetching="isFetching"
      :results="results"
      :show-view-more="showViewMore"
    ></app-main>
    <app-main-modal
      :labels="labels"
      :no-reply-only="noReplyOnly"
      :current-result="currentResult"
      v-if="currentResult"
    ></app-main-modal>
    <app-footer></app-footer>
  </div>
</template>

<script>
import * as moment from "moment";
import AppHeader from "./AppHeader";
import AppMain from "./AppMain";
import AppMainModal from "./AppMainModal";
import AppFooter from "./AppFooter";
import languages from "../data/languages.json";

export default {
  components: { AppHeader, AppMain, AppMainModal, AppFooter },

  data() {
    return {
      topLanguages: [
        "JavaScript",
        "TypeScript",
        "Python",
        "Java",
        "PHP",
        "Go",
        "HTML",
        "C++",
        "C#",
        "Ruby",
      ],

      languages: languages,

      labels: ["hacktoberfest"],

      results: [],
      page: 1,
      currentLanguage: "",
      isFilterToggled: false,
      isFetching: false,
      showViewMore: false,
      noReplyOnly: false,
      currentResult: null,
    };
  },

  created() {
    this.currentLanguage = localStorage.getItem("language") || "";
    this.labels = JSON.parse(
      localStorage.getItem("labels") || JSON.stringify(this.labels)
    );
    this.noReplyOnly = (localStorage.getItem("noreply") || "false") === "true";

    this.languages.sort();

    this.loadIssues();
  },

  mounted() {
    Bus.$on("toggleFilter", () => {
      this.toggleFilter();
    });

    Bus.$on("removeLabel", (labelName) => {
      this.removeLabel(labelName);
    });

    Bus.$on("toggleNoReplyFilter", () => {
      this.toggleNoReplyFilter();
    });

    Bus.$on("chooseLanguage", (language) => {
      this.chooseLanguage(language);
    });

    Bus.$on("loadMoreIssues", () => {
      this.loadMoreIssues();
    });

    Bus.$on("appendLabel", (labelName) => {
      this.appendLabel(labelName);
    });

    Bus.$on("toggleIssue", (result) => {
      this.toggleIssue(result);
    });

    Bus.$on("closeModal", () => {
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

      fetch(
        `https://api.github.com/search/issues?page=${this.page}&q=${this.filterLabels}${this.filterLanguage}+type:issue+state:open${this.filterNoReply}`
      )
        .then((response) => response.json())
        .then((response) => {
          const items = response.items.map(
            ({ repository_url, updated_at, ...rest }) => ({
              ...rest,
              repo_title: repository_url.split("/").slice(-1).join(),
              updated_at: updated_at,
              unformatted_date: this.unformatDate(new Date(updated_at)),
              formatted_date: this.formatDate(new Date(updated_at)),
            })
          );

          this.results = [...this.results, ...items];

          this.showViewMore = this.results.length < response.total_count;

          this.results = this.results.filter((result) => {
            return (
              moment.utc(new Date(result.updated_at)).year() ===
              moment.utc().year()
            );
          });

          this.isFetching = false;
        })
        .catch((error) => {
          this.showViewMore = false;
          this.isFetching = false;
        });
    },

    unformatDate(updatedAt) {
      return moment.utc(updatedAt).format("YYYY-MM-DD HH:mm");
    },

    formatDate(updatedAt) {
      const updated = moment.utc(updatedAt);
      const now = moment.utc();

      return moment.duration(updated.diff(now)).humanize(true);
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

      localStorage.setItem("language", this.currentLanguage);

      this.reloadIssues();
    },

    removeLabel(labelName) {
      if (!["hacktoberfest"].includes(labelName.toLowerCase())) {
        this.labels.splice(this.labels.indexOf(labelName.toLowerCase()), 1);

        localStorage.setItem("labels", JSON.stringify(this.labels));

        this.reloadIssues();
      }
    },

    appendLabel(labelName) {
      if (this.labels.includes(labelName.toLowerCase())) {
        this.labels.splice(this.labels.indexOf(labelName.toLowerCase()), 1);
      } else {
        this.labels.push(labelName);
      }

      localStorage.setItem("labels", JSON.stringify(this.labels));

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

      localStorage.setItem("noreply", this.noReplyOnly);

      this.loadIssues();
    },

    toggleIssue(result) {
      this.currentResult = result;
    },

    closeModal() {
      this.toggleIssue(null);
    },
  },

  computed: {
    filterLabels() {
      return (
        "label:" +
        this.labels
          .map((name) => {
            return `"${name}"`
              .split("+")
              .join("%2B")
              .split("#")
              .join("%23")
              .toLowerCase();
          })
          .join("+label:")
      );
    },
    filterNoReply() {
      if (this.noReplyOnly) {
        return "+comments:0";
      }

      return "";
    },
    filterLanguage() {
      if (this.currentLanguage) {
        return (
          "+language:" +
          this.currentLanguage
            .split("+")
            .join("%2B")
            .split("#")
            .join("%23")
            .toLowerCase()
        );
      }

      return "";
    },
  },
};
</script>
