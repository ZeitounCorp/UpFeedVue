<template>
  <v-dialog
    v-if="act !== null"
    v-model="opened"
    :max-width="is_browser ? '460' : '290'"
    @click:outside="closeModal()"
  >
    <v-card>
      <v-list-item>
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
        <v-list-item-content style="margin-left: 12px">
          <v-list-item-title class="headline">{{ act.fullDescriptor }}</v-list-item-title>
          <v-list-item-subtitle>{{ serialize_date(act.d_created) }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text style="margin-top: 18px; text-align: center; font-size: 32px">
        {{ act.comment }}
      </v-card-text>

      <v-card-text style="margin-top: 18px; text-align: center; font-size: 16px" v-if="act.score">
        <p style="color: #5ba9a9">
          Score:
          <span style="font-weight: bold"> {{ act.score }}/{{ act.possible_score }} </span>
        </p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="act.product === 'bpjr' ? '#f6b80e' : '#03cccb'" text @click="closeModal()">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { isMobile, isBrowser } from 'mobile-device-detect';
import moment from 'moment';

export default {
  name: 'Zoom',
  props: ['open', 'act'],
  data() {
    return {
      opened: false,
      is_mobile: isMobile,
      is_browser: isBrowser,
    };
  },
  methods: {
    closeModal() {
      this.$vueEventBus.$emit('modal_closed', false);
    },
    serialize_date(date) {
      return moment(new Date(date * 1000)).format(' MMM Do, YYYY • h:mm a');
    },
  },
  watch: {
    open() {
      this.opened = this.open;
    },
  },
};
</script>
