<template>
  <main class="container mx-auto my-12" v-cloak>
    <div id="results" class="grid">
      <div
        v-for="result in sortedResults"
        :key="result.id"
        class="flex flex-col items-center justify-center p-2 overflow-hidden overflow-y-auto text-black bg-white rounded-lg shadow-lg hover:bg-pinkish grid-item"
        @click="toggleIssue(result)"
      >
        <div
          class="flex flex-row flex-wrap items-center justify-center w-full mb-2"
        >
          <button
            type="button"
            v-for="label in result.labels"
            :key="label.name"
            class="px-2 py-1 m-1 text-xs text-center rounded-sm shadow-md"
            :style="{ backgroundColor: `#${label.color}` }"
            :class="{ 'font-bold': labels.includes(label.name.toLowerCase()) }"
            @click.prevent.stop="appendLabel(label.name)"
            v-text="label.name.toLowerCase()"
          ></button>
        </div>
        <h2
          class="mb-4 text-xl font-bold text-center"
          v-text="result.title"
        ></h2>
        <h3
          class="mb-4 text-sm text-center break-words text-blue"
          v-text="`${result.user.login}/${result.repo_title}`"
        ></h3>
        <div
          class="max-w-xs pl-2 mb-4 text-sm text-left truncate border-l-4 border-solid border-gray"
          v-text="result.body"
        ></div>
        <div
          class="mb-4 text-xs text-center"
          :class="{ 'text-amber': !result.comments }"
          v-if="!noReplyOnly"
          v-text="
            result.comments > 0 ? `Replies: ${result.comments}` : 'Gimme Gimme'
          "
        ></div>
        <div
          class="mb-4 text-xs text-left"
          v-text="`Opend by: ${result.user.login}`"
        ></div>
        <div class="mb-4 text-xs text-center">
          <time
            :datetime="result.unformatted_date"
            v-text="`Last updated: ${result.formatted_date}`"
          ></time>
        </div>
      </div>
    </div>
    <div
      v-if="showViewMore || isFetching"
      class="flex flex-row items-center justify-center mt-6"
    >
      <button
        type="button"
        class="px-4 py-2 text-3xl font-thin uppercase border-2 rounded text-primary border-primary bg-secondary hover:bg-primary hover:text-secondary"
        :disabled="isFetching"
        @click="loadMoreIssues"
        v-text="isFetching ? 'Loading More Issues...' : 'Load More Issues'"
      ></button>
    </div>
    <div
      v-else-if="results.length === 0"
      class="flex flex-row items-center justify-center mt-6"
    >
      <div
        class="px-4 py-2 text-3xl font-thin uppercase text-primary bg-secondary"
      >
        No issues found
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: ["labels", "noReplyOnly", "isFetching", "results", "showViewMore"],
  inject: ['emitter'],

  computed: {
    sortedResults() {
      const sortedIssues = this.results.sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      return sortedIssues;
    },
  },

  methods: {
    loadMoreIssues() {
      this.emitter.emit("loadMoreIssues");
    },

    appendLabel(labelName) {
      this.emitter.emit("appendLabel", labelName);
    },

    toggleIssue(result) {
      this.emitter.emit("toggleIssue", result);
    },
  },
};
</script>
