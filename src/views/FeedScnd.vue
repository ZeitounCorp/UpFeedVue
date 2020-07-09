<template>
  <v-container>
    <TimelineHeader v-bind:autocomplete="auto_complete" :current="current_api" />
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
  name: 'FeedScnd',
  components: {
    TimelineHeader,
    Timeline,
  },
  data: () => ({
    activities_history: [],
    activites_filtered: [],
    auto_complete: [],
    provisory_data: [],
    current_api: '',
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
    this.$vueEventBus.$on('filter_changed', this.newFilter);
    this.$vueEventBus.$on('search_changed', this.newSearch);
    const version = this.$route.params.v.toLowerCase();
    if (version === 'v1') {
      // eslint-disable-next-line no-alert
      alert(
        'If the data that should be displayed is from v2 (Default is V1), then just replace /V1 by /V2 at the end of the url, thank you !',
      );
    }
    try {
      const request = await Api.get(`/activities/${version}/`);
      this.loading = false;
      if (request.status === 200) {
        if (request.data.some(d => Array.isArray(d.activities))) {
          request.data.forEach((c) => {
            c.activities.forEach((act) => {
              const newChild = { ...act };
              newChild.resource_type = c.resource_type;
              this.provisory_data.push(newChild);
            });
          });
        } else {
          this.provisory_data = request.data;
        }
        this.activities_history = this.provisory_data.sort(
          (a, b) => new Date(Number(b.d_created * 1000)) - new Date(Number(a.d_created * 1000)),
        );
        this.activities_history = this.activities_history.map((act) => {
          const newAct = { ...act };
          newAct.month = new Date(Number(newAct.d_created * 1000)).toLocaleString('en-US', {
            month: 'long',
          });
          newAct.fullDescriptor = `${this.upperCaseName(
            act.topic_data.name,
          )} ${this.setActivityName(act.resource_type)}`;
          this.auto_complete.push(newAct.fullDescriptor);
          if (!this.months.includes(newAct.month)) {
            this.months.push(newAct.month);
          }
          return newAct;
        });
        this.activites_filtered = this.activities_history;
        this.current_api = version;
      } else {
        this.display_error = true;
      }
    } catch (e) {
      this.$router.push('/');
    }
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
