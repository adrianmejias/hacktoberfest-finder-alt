<template>
  <section
    class="fixed top-0 bottom-0 left-0 right-0 h-full max-w-full grid-item-container"
    @click="closeModal"
    v-cloak
  >
    <a
      :href="currentResult.html_url"
      target="_blank"
      class="flex flex-col items-center justify-center max-w-md p-2 mx-auto overflow-hidden overflow-y-auto text-black bg-white rounded-lg shadow-lg hover:bg-pinkish grid-item"
      :title="currentResult.title"
      @click.prevent.stop="openWindow"
    >
      <div
        class="flex flex-row flex-wrap items-center justify-center w-full mb-2"
      >
        <span
          v-for="label in currentResult.labels"
          :key="label.name"
          class="px-2 py-1 m-1 text-xs text-center rounded-sm shadow-md"
          :style="{ backgroundColor: `#${label.color}` }"
          :class="{ 'font-bold': labels.includes(label.name.toLowerCase()) }"
          v-text="label.name.toLowerCase()"
        ></span>
      </div>
      <h2
        class="mb-4 text-xl font-bold text-center"
        v-text="currentResult.title"
      ></h2>
      <h3
        class="mb-4 text-sm text-center break-words text-blue"
        v-text="`${currentResult.user.login}/${currentResult.repo_title}`"
      ></h3>
      <div
        class="h-full max-w-sm pl-2 mb-4 overflow-hidden overflow-y-scroll text-sm text-left whitespace-pre-wrap border-l-4 border-solid border-gray"
        v-text="currentResult.body"
        style="max-height: 14rem"
      ></div>
      <div
        class="mb-4 text-xs text-center"
        :class="{ 'text-amber': !currentResult.comments }"
        v-if="!noReplyOnly"
        v-text="
          currentResult.comments > 0
            ? `Replies: ${currentResult.comments}`
            : 'Gimme Gimme'
        "
      ></div>
      <div
        class="mb-4 text-xs text-left"
        v-text="`Opend by: ${currentResult.user.login}`"
      ></div>
      <div class="mb-4 text-xs text-center">
        <time
          :datetime="currentResult.unformatted_date"
          v-text="`Last updated: ${currentResult.formatted_date}`"
        ></time>
      </div>
    </a>
  </section>
</template>

<script>
export default {
  props: ["labels", "noReplyOnly", "currentResult"],

  mounted() {
    (() => {
      document.addEventListener("keydown", this.escapeModal, false);
    })();
  },

  beforeDestroy() {
    document.removeEventListener("keydown", this.escapeModal, false);
  },

  methods: {
    escapeModal(event) {
      if (
        (event.key === "Escape" ||
          event.key === "Esc" ||
          event.keyCode === 27) &&
        event.target.nodeName.toLowerCase() === "body"
      ) {
        event.preventDefault();
        this.closeModal();
      }
    },

    closeModal() {
      Bus.$emit("closeModal");
    },

    openWindow() {
      window.open(this.currentResult.html_url, "hofWindow");
    },
  },
};
</script>
