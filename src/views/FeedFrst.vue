<template>
  <v-container>
    <TimelineHeader v-bind:autocomplete="auto_complete"/>
    <Timeline
      v-bind:loading="loading"
      v-bind:months="months"
      v-bind:activities="activites_filtered"
      v-bind:categories="categories"
    />
  </v-container>
</template>

<script>
import Api from '../services/api';
import TimelineHeader from '../components/TimelineHeader.vue';
import Timeline from '../components/Timeline.vue';

export default {
  name: 'FeedFrst',
  components: {
    TimelineHeader,
    Timeline,
  },
  data: () => ({
    activities_history: [],
    activites_filtered: [],
    auto_complete: [],
    months: [],
    loading: true,
    display_error: false,
    categories: {
      no_filter: { name: 'All work' },
      movie: { name: 'Movie' },
      quiz: { name: 'Movie Quiz' },
      easy_quiz: { name: 'Easy Quiz' },
      make_a_map: { name: 'Make-a-Map' },
      make_a_movie: { name: 'Movie Project' },
      word_play: { name: 'Word play' },
      related_reading: { name: 'Related Reading' },
      challenge: { name: 'Challenge' },
      draw_about_it: { name: 'Draw About It' },
    },
  }),
  async created() {
    const request = await Api.get('/activities/v1/');
    this.$vueEventBus.$on('filter_changed', this.newFilter);
    this.$vueEventBus.$on('search_changed', this.newSearch);
    this.loading = false;
    if (request.status === 200) {
      this.activities_history = request.data.sort(
        (a, b) => new Date(Number(b.d_created * 1000)) - new Date(Number(a.d_created * 1000)),
      );
      this.activities_history = this.activities_history.map((act) => {
        const newAct = { ...act };
        newAct.month = new Date(Number(newAct.d_created * 1000)).toLocaleString('en-US', {
          month: 'long',
        });
        newAct.fullDescriptor = `${this.upperCaseName(act.topic_data.name)} ${this.setActivityName(
          act.resource_type,
        )}`;
        this.auto_complete.push(newAct.fullDescriptor);
        if (!this.months.includes(newAct.month)) {
          this.months.push(newAct.month);
        }
        return newAct;
      });
      this.activites_filtered = this.activities_history;
    } else {
      this.display_error = true;
    }
  },
  beforeDestroy() {
    this.$vueEventBus.$off('filter_changed');
    this.$vueEventBus.$off('search_changed');
  },
  methods: {
    newFilter(filter) {
      if (filter === 'no_filter') {
        this.activites_filtered = this.activities_history;
      } else {
        // eslint-disable-next-line arrow-body-style
        this.activites_filtered = this.activities_history.filter((act) => {
          return act.resource_type === filter;
        });
      }
    },
    newSearch(search) {
      if (search === null || search === undefined) {
        this.activites_filtered = this.activities_history;
      } else {
        // eslint-disable-next-line arrow-body-style
        this.activites_filtered = this.activities_history.filter((act) => {
          return act.fullDescriptor.toLowerCase().includes(search.toLowerCase());
        });
      }
    },
    upperCaseName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    setActivityName(actype) {
      return this.categories[`${actype}`].name;
    },
  },
};
</script>
