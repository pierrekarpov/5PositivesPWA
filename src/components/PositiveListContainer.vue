<template>
  <div v-if="$mq.phone">
    <row :centerXs="true" :centerSm="true" :centerMd="true" :centerLg="true">
      <column xs="6" sm="6" md="6" lg="6">
        <font-awesome-icon icon="chevron-left" />
      </column>
      <column xs="6" sm="6" md="6" lg="6">
        <font-awesome-icon icon="chevron-right" />
      </column>
    </row>
    <row :centerXs="true" :centerSm="true" :centerMd="true" :centerLg="true">
      <column>
        <PositiveList :data="firebasePositives" :range="range" :offset="dayOffset" />
      </column>
    </row>
  </div>
  <div v-else>
    <row :centerXs="true" :centerSm="true" :centerMd="true" :centerLg="true">
      <column xs="1" sm="1" md="1" lg="1">
        <button @click="prev()">
          <font-awesome-icon icon="chevron-left" />
        </button>
      </column>
      <column xs="10" sm="10" md="10" lg="10">
        <PositiveList :data="firebasePositives" :range="range" :offset="dayOffset" style="width:unset"/>
      </column>
      <column xs="1" sm="1" md="1" lg="1">
        <button @click="next()">
          <font-awesome-icon icon="chevron-right" />
        </button>
      </column>
    </row>
  </div>
</template>

<script>
import PositiveList from './PositiveList.vue'
import { db } from '../main'

export default {
  components: {
    PositiveList
  },
  props: {
    userId: String
  },
  data () {
    return {
      phoneRange: 1,
      desktopRange: 3,
      dayOffset: 0,
      firebasePositives: {},
      newPositiveText: '',
      moodIcons: ['😡', '🙁', '😐', '😊', '😁']
    }
  },
  computed: {
    range: function() {
      return this.$mq.phone ? this.phoneRange : this.desktopRange
    }
  },
  firestore () {
    return {
      firebasePositives: db.collection('positives').doc(this.userId).collection('data_by_day')
    }
  },
  methods: {
    prev() {
      if (this.firebasePositives.length - this.range - this.dayOffset > 0) {
        this.dayOffset = this.dayOffset + 1
      }

    },
    next() {
      if (this.dayOffset > 0) {
        this.dayOffset = this.dayOffset - 1
      }
    }
  }
}
</script>
