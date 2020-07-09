<template>
  <v-container style="margin-top: 3%;" fluid>
    <div class="align-center">
      <h1 style="font-size: 42px">
        Timeline <span v-if="current">(Api Version: {{ current }})</span>
      </h1>
      <v-autocomplete
        :items="items"
        :search-input.sync="search_val"
        cache-items
        flat
        hide-no-data
        hide-details
        prepend-inner-icon="mdi-magnify"
        clearable
        label="Search Timeline"
        solo-inverted
      ></v-autocomplete>
      <br />

      <h4 style="color: lightgrey">Filter by:</h4>
      <br />

      <v-tabs background-color="transparent" color="teal lighten-3" show-arrows>
        <v-tabs-slider color="teal lighten-3"></v-tabs-slider>

        <v-tab v-for="(cat, index) in categories" :key="index" @click="setFilter(cat.value)">
          {{ cat.name }}
        </v-tab>
      </v-tabs>
      <br />
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'TimelineHeader',
  props: ['autocomplete', 'current'],
  data: () => ({
    items: [],
    search_val: '',
    selected_cat: '',
    categories: [
      { name: 'All work', value: 'no_filter' },
      { name: 'Movie', value: 'movie' },
      { name: 'Quiz', value: 'quiz' },
      { name: 'Easy Quiz', value: 'easy_quiz' },
      { name: 'Make-a-Map', value: 'make_a_map' },
      { name: 'Make-a-Movie', value: 'make_a_movie' },
      { name: 'Word play', value: 'word_play' },
      { name: 'Related Reading', value: 'related_reading' },
      { name: 'Challenge', value: 'challenge' },
      { name: 'Draw About It', value: 'draw_about_it' },
    ],
  }),
  created() {
    this.items = this.autocomplete;
  },
  methods: {
    setFilter(val) {
      this.selected_cat = val;
    },
  },
  watch: {
    search_val(val) {
      if (val !== null && val !== undefined) {
        this.items = this.autocomplete.filter(
          e => (e || '').toLowerCase().indexOf((val || '').toLowerCase()) > -1,
        );
      }
      this.$vueEventBus.$emit('search_changed', val);
    },
    selected_cat(val) {
      this.$vueEventBus.$emit('filter_changed', val);
    },
  },
};
</script>
