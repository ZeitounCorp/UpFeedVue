<template>
  <v-app-bar app color="teal lighten-3">
    <div class="d-flex align-center">
      <v-img
        alt="UpFeed Logo"
        class="shrink mr-2"
        contain
        src="../assets/logo.png"
        transition="scale-transition"
        width="40"
      />
      <h1 id="nav_title">UpFeed</h1>
    </div>

    <v-spacer></v-spacer>

    <div
      class="text-center d-none d-lg-flex d-xl-flex"
      v-for="(path, index) in feed"
      :key="path.text"
    >
      <v-btn
        class="ma-2"
        v-bind:outlined="index === 0"
        color="#a5ffff"
        @click="navigate(path.href)"
      >
        {{ path.text }}
      </v-btn>
    </div>

    <div class="d-flex d-sm-flex d-md-flex d-lg-none d-xl-none">
      <v-menu left bottom origin="center center" transition="scale-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon color="white">mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="path in feed" :key="path.text" @click="navigate(path.href)">
            <v-list-item-title>{{ path.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar',

  data: () => ({
    feed: [{ text: 'Feed V1', href: '/' }, { text: 'Feed V1 & V2', href: '/feedv1_v2' }],
  }),
  methods: {
    navigate(path) {
      const { history } = this.$router;
      if (history.current.path !== path) {
        this.$router.push(path);
      }
    },
  },
};
</script>

<style scoped>
#nav_title {
  color: white;
}
</style>
