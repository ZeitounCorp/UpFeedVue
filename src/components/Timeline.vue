<template>
  <div>
    <v-timeline dense v-if="!loading">
      <v-timeline-item v-for="mth in months" :key="mth" class="mb-6" hide-dot>
        <v-chip class="ma-2" color="orange" text-color="white">
          {{ mth.toUpperCase() }}
          <v-icon right>mdi-calendar</v-icon>
        </v-chip>
        <v-timeline dense>
          <div v-for="(act, index) in pre_filtered_acts(mth)" :key="index">
            <v-timeline-item v-if="isHidden(act) !== 'hidden'">
              <template v-slot:icon>
                <v-avatar
                  v-if="act.product !== 'bpjr'"
                  :color="act.product === 'bpjr' ? '#f6b80e' : '#03cccb'"
                >
                  <img :src="act.topic_data.icon_path" />
                </v-avatar>

                <v-badge avatar bordered overlap bottom v-if="act.product === 'bpjr'">
                  <template v-slot:badge>
                    <v-avatar color="#f6b80e" size="62">
                      <span style="font-weight: bold" class="black--text bold">Jr.</span>
                    </v-avatar>
                  </template>
                  <v-avatar :color="act.product === 'bpjr' ? '#f6b80e' : '#03cccb'">
                    <img :src="act.topic_data.icon_path" />
                  </v-avatar>
                </v-badge>
              </template>
              <v-card class="elevation-3">
                <div v-if="is_mobile">
                  <v-card-title class="headline">{{ act.fullDescriptor }}</v-card-title>
                  <v-card-subtitle>
                    {{ serialize_date(act.d_created) }}
                  </v-card-subtitle>
                  <v-card-text v-if="act.score">
                    <p style="color: #5ba9a9">
                      Score:
                      <span style="font-weight: bold">
                        {{ act.score }}/{{ act.possible_score }}
                      </span>
                    </p>
                  </v-card-text>
                  <v-card-actions
                    v-if="act.resource_type !== 'movie' && act.resource_type !== 'related_reading'"
                  >
                    <v-btn class="ma-2" tile outlined color="#5ba9a9" @click.stop="zoomIn(act)">
                      <v-icon left>mdi-eye</v-icon> View work
                    </v-btn>
                  </v-card-actions>
                </div>

                <v-row align="center" v-if="is_browser">
                  <v-col align-self="center">
                    <v-card-title class="headline">{{ act.fullDescriptor }}</v-card-title>
                    <v-card-subtitle>
                      {{ serialize_date(act.d_created) }}
                    </v-card-subtitle>
                  </v-col>

                  <v-col align="end">
                    <div class="d-flex d-sm-flex d-md-flex d-lg-none d-xl-none justify-end">
                      <v-menu left bottom origin="center center" transition="scale-transition">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                          </v-btn>
                        </template>

                        <v-list>
                          <v-list-item @click="zoomIn(act)">
                            <v-list-item-title>View work</v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="hide(act, index)">
                            <v-list-item-title>Hide</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </div>

                    <v-row
                      justify="end"
                      align="center"
                      align-content="center"
                      class="d-none d-lg-flex d-xl-flex"
                    >
                      <v-col align-self="center" v-if="act.score">
                        <p style="margin-bottom: 0; color: #5ba9a9">
                          Score:
                          <span style="font-weight: bold">
                            {{ act.score }}/{{ act.possible_score }}
                          </span>
                        </p>
                      </v-col>
                      <v-col cols="7" align-self="center" class="d-flex justify-center">
                        <v-btn
                          class="ma-2"
                          outlined
                          color="#5ba9a9"
                          v-if="
                            act.resource_type !== 'movie' && act.resource_type !== 'related_reading'
                          "
                          @click.stop="zoomIn(act)"
                        >
                          <v-icon left>mdi-eye</v-icon> View work
                        </v-btn>
                        <v-btn class="ma-2" outlined color="#D32F2F" @click.stop="hide(act, index)">
                          <v-icon left>mdi-delete</v-icon> Hide
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-timeline-item>
          </div>
        </v-timeline>
      </v-timeline-item>
    </v-timeline>
    <v-row justify="center" v-if="maxItems < activities.length">
      <v-btn
        class="ma-2"
        tile
        outlined
        color="#5ba9a9"
        @click="
          maxItems + 10 > activities.length
            ? (maxItems += activities.length - maxItems)
            : (maxItems += 10)
        "
      >
        <v-icon left>mdi-arrow-down</v-icon> Load More
      </v-btn>
    </v-row>
    <Zoom v-bind:open="openModal" :act="selected_activity" />
  </div>
</template>

<script>
import moment from 'moment';
import { isMobile, isBrowser } from 'mobile-device-detect';
import Zoom from './Zoom.vue';

export default {
  name: 'Timeline',
  props: ['loading', 'months', 'activities', 'categories'],
  components: {
    Zoom,
  },
  data() {
    return {
      maxItems: 10,
      openModal: false,
      selected_activity: null,
      is_mobile: isMobile,
      is_browser: isBrowser,
    };
  },
  created() {
    this.$vueEventBus.$on('modal_closed', this.setClosed);
  },
  methods: {
    pre_filtered_acts(month) {
      return this.activities.slice(0, this.maxItems).filter(a => a.month === month);
    },
    serialize_date(date) {
      return moment(new Date(date * 1000)).format(' MMM Do, YYYY • h:mm a');
    },
    zoomIn(act) {
      this.selected_activity = act;
      this.openModal = true;
    },
    setClosed(close) {
      this.openModal = Boolean(close);
    },
    hide(act, index) {
      this.activities.splice(index, 1);
      localStorage.setItem(act.id, 'hidden');
    },
    isHidden(act) {
      return localStorage.getItem(act.id);
    },
  },
};
</script>
