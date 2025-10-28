<template>
    <!-- <fixed-header> -->
    <header
      class="container flex flex-row flex-wrap items-center justify-between mx-auto my-6"
      v-cloak
    >
      <div class="flex flex-row flex-wrap items-center justify-center align-center logo-wrapper">
        <a
          href="https://hacktoberfest.digitalocean.com"
          title="Hacktoberfest 2020"
          target="_blank"
          rel="noreferrer"
          class="logo-link sm:text-center"
        >
          <img
            class="h-auto mx-auto md:w-24 sm:w-full logo"
            src="/images/header.svg"
            alt="Hacktoberfest 2020"
          />
        </a>
        <h1
          class="mx-auto my-4 text-5xl font-bold text-center uppercase text-primary md:my-0 logo-title"
        >
          Issue Finder
        </h1>
      </div>
      <div
        class="flex flex-row flex-wrap items-center justify-around w-full mx-auto my-4 md:w-auto"
      >
        <span class="mx-2 text-lg font-semibold uppercase text-primary">
          Filter By:
        </span>
        <div
          class="relative flex items-center justify-around flex-column filter"
          v-click-outside="hideFilter"
        >
          <button
            type="button"
            class="relative text-lg font-semibold uppercase text-primary focus:outline-none"
            @click="toggleFilter"
            v-text="currentLanguage ? currentLanguage : 'Language'"
          ></button>
          <div
            v-show="isFilterToggled"
            class="absolute top-0 right-0 flex flex-col w-48 h-64 mt-2 overflow-hidden overflow-y-auto border-2 border-solid rounded-lg shadow-xl filter-values bg-primary border-primary"
          >
            <input
              class="fixed z-10 p-2 mx-auto leading-tight bg-white border-2 rounded appearance-none border-secondary text-secondary focus:outline-none focus:border-1"
              type="search"
              ref="languageTextRef"
              placeholder="ie. javas..."
              v-model="filterLanguageText"
              style="width: 11.7rem"
            />
            <button
              type="button"
              class="p-2 mt-12 font-bold text-md language"
              :class="{
                'text-white bg-secondary hover:bg-secondary hover:text-white': !currentLanguage,
                'text-secondary bg-primary hover:bg-secondary hover:text-white': currentLanguage,
              }"
              @click="chooseLanguage('')"
            >
              Any
            </button>
            <button
              type="button"
              v-for="language in filteredLanguages"
              :key="language"
              class="p-2 text-sm font-thin language"
              :class="{
                'text-white bg-secondary hover:bg-secondary hover:text-white':
                  currentLanguage === language,
                'text-secondary bg-primary hover:bg-secondary hover:text-white':
                  currentLanguage !== language,
              }"
              @click="chooseLanguage(language)"
              v-text="language"
            ></button>
          </div>
        </div>
        <span class="mx-2 text-lg font-semibold uppercase text-primary">
          /
        </span>
        <button
          type="button"
          class="px-2 py-1 mx-2 text-lg font-semibold uppercase rounded text-primary border-1"
          :class="{ 'bg-primary text-secondary': noReplyOnly }"
          @click="toggleNoReplyFilter"
        >
          No Reply
        </button>
      </div>
      <div class="flex flex-row flex-wrap items-center justify-center mt-2 align-center sm:w-full md:w-auto">
        <div class="sm:text-center md:w-64 sm:w-full sm:mx-auto md:mx-0 md:text-left">
          <label class="text-primary">
            <input
              class="mr-2 leading-tight"
              type="checkbox"
              v-model="autoRefresh"
            />
            <span class="text-xs"> Auto Refresh </span>
          </label>
          <button
            type="button"
            class="mx-2 my-2 text-xs font-semibold text-primary"
            @click="refreshLanguage"
          >
            (refresh)
          </button>
        </div>
        <button
          type="button"
          v-for="name in labels"
          :key="name"
          class="mx-2 my-2 text-xs font-semibold text-amber"
          @click="removeLabel(name)"
          v-text="`#${name.toLowerCase()}`"
        ></button>
      </div>
    </header>
  <!-- </fixed-header> -->
</template>

<script>
// import FixedHeader from "vue-fixed-header";
import ClickOutside from "vue-click-outside";

export default {
  props: [
    "labels",
    "languages",
    "currentLanguage",
    "isFilterToggled",
    "noReplyOnly",
  ],

  inject: ['emitter'],
//   components: { FixedHeader },
  directives: { ClickOutside },

  data() {
    return {
      autoRefresh: false,
      autoRefreshTime: 1000 * 60 * 15, // 15 minutes
      autoTimer: null,
      filterLanguageText: "",
    };
  },

  watch: {
    autoRefresh(newValue, oldValue) {
      localStorage.setItem("auto-refresh", newValue);

      if (newValue) {
        this.startAutoRefresh();
      } else {
        this.cancelAutoRefresh();
      }
    },
  },

  created() {
    this.autoRefresh =
      (localStorage.getItem("auto-refresh") || "false") === "true";

    this.startAutoRefresh();
  },

  beforeDestroy() {
    this.cancelAutoRefresh();
  },

  computed: {
    filteredLanguages() {
      if (this.filterLanguageText) {
        return this.languages.filter((language) =>
          language.toLowerCase().includes(this.filterLanguageText.toLowerCase())
        );
      }

      return this.languages;
    },
  },

  methods: {
    hideFilter() {
      if (this.isFilterToggled) {
        this.toggleFilter();
      }
    },

    toggleFilter() {
      Bus.$emit("toggleFilter");

      if (!this.isFilterToggled) {
        this.$nextTick(() => {
          this.$refs.languageTextRef.focus();
        });
      }
    },

    removeLabel(labelName) {
      this.cancelAutoRefresh();
      Bus.$emit("removeLabel", labelName);
      this.startAutoRefresh();
    },

    toggleNoReplyFilter() {
      this.cancelAutoRefresh();
      Bus.$emit("toggleNoReplyFilter");
      this.startAutoRefresh();
    },

    refreshLanguage() {
      this.cancelAutoRefresh();
      Bus.$emit("chooseLanguage", this.currentLanguage);
      this.startAutoRefresh();
    },

    startAutoRefresh() {
      if (this.autoRefresh) {
        this.autoTimer = setInterval(
          this.refreshLanguage,
          this.autoRefreshTime
        );
      }
    },

    cancelAutoRefresh() {
      clearInterval(this.autoTimer);
    },

    chooseLanguage(language) {
      this.cancelAutoRefresh();
      Bus.$emit("chooseLanguage", language);
      this.startAutoRefresh();
    },
  },
};
</script>
