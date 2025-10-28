<template>
  <footer class="w-full mt-8 bg-primary" v-cloak>
    <div
      class="container flex flex-row items-center justify-between p-8 mx-auto"
    >
      <div class="flex flex-row items-center justify-center">
        <div class="text-amber">
          Unofficial site by
          <a
            class="text-secondary"
            href="http://duncan.mcclean.co.uk"
            target="_blank"
            title="Duncan McClean"
            rel="noreferrer"
            >Duncan McClean</a
          >
          and
          <a
            class="text-secondary"
            href="https://github.com/damcclean/hacktoberfest-finder/blob/master/CONTRIBUTORS.md"
            target="_blank"
            title="contributors"
            rel="noreferrer"
            >contributors</a
          >. Contribute on
          <a
            class="text-secondary"
            href="https://github.com/damcclean/hacktoberfest-finder"
            target="_blank"
            title="GitHub!"
            rel="noreferrer"
            >GitHub!</a
          >
        </div>
      </div>
      <div class="flex flex-row items-center justify-center">
        <a
          class="w-6 h-6 mx-2"
          href="https://www.digitalocean.com"
          title="DigitalOcean"
          target="_blank"
          rel="noreferrer"
        >
          <img
            class="w-6 h-6"
            src="/images/digital-ocean.png"
            alt="DigitalOcean"
          />
        </a>
        <a
          class="w-6 h-6 mx-2"
          href="https://dev.to"
          title="DEV"
          target="_blank"
          rel="noreferrer"
        >
          <img class="w-6 h-6" src="/images/dev.svg" alt="DEV" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>
