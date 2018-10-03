<template>
  <div v-if="$mq.phone">
    <row :centerXs="true" :centerSm="true" :centerMd="true" :centerLg="true">
      <column xs="6" sm="6" md="6" lg="6">
        <div @click="prev()" class="arrow-button-container">
          <font-awesome-icon icon="chevron-circle-left" />
        </div>
      </column>
      <column xs="6" sm="6" md="6" lg="6">
        <div @click="next()" class="arrow-button-container">
          <font-awesome-icon icon="chevron-circle-right" />
        </div>
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
        <div @click="prev()" class="arrow-button-container">
          <font-awesome-icon icon="chevron-circle-left" />
        </div>
      </column>
      <column xs="10" sm="10" md="10" lg="10">
        <!-- <PositiveList :data="firebasePositives" :range="range" :offset="dayOffset" style="width:unset"/> -->
        <PositiveList :data="firebasePositives" :days="days" :range="range" :offset="dayOffset" style="width:unset"/>
      </column>
      <column xs="1" sm="1" md="1" lg="1">
        <div @click="next()" class="arrow-button-container">
          <font-awesome-icon icon="chevron-circle-right" />
        </div>
      </column>
    </row>
  </div>
</template>

<script>
import PositiveList from './PositiveList.vue'
import { db } from '../main'
import moment from 'moment'

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
      firebasePositives: [],
      days: [],
      newPositiveText: '',
      moodIcons: ['😡', '🙁', '😐', '😊', '😁'],
      tmp: []
    }
  },
  computed: {
    range: function () {
      return this.$mq.phone ? this.phoneRange : this.desktopRange
    }
  },
  firestore () {
    if (this.userId) {
      return {
        firebasePositives: db.collection('positives').doc(this.userId).collection('data_by_day')
      }
    } else {
      return {
        firebasePositives: db.collection('positives').doc('-1').collection('data_by_day')
      }
    }
  },
  mounted () {
    this.$bind('firebasePositives', db.collection('positives').doc(this.userId).collection('data_by_day'))
      .then((col) => {
        var date = moment(col[0].id, 'YYYY-MM-DD')
        var date2 = moment(new Date())
        var dayDiff = date2.diff(date, 'days')
        if (dayDiff < 10) {
          dayDiff = 10
        }
        var data = []
        this.days.push(date.format('YYYY-MM-DD'))
        for (var i = 0; i < dayDiff; i++) {
          var d = date.add(1, 'days').format('YYYY-MM-DD')
          this.days.push(d)
        }
        this.firebaseExtendedPositives = data
      })
      .catch((error) => {
        console.log('error in loading: ', error)
      })
  },
  methods: {
    prev () {
      if (this.days.length - this.range - this.dayOffset > 0) {
        this.dayOffset = this.dayOffset + 1
      }
    },
    next () {
      if (this.dayOffset > 0) {
        this.dayOffset = this.dayOffset - 1
      }
    }
  }
}
</script>

<style scoped>
  .arrow-button-container {
    cursor: pointer;
    color: #676767;
  }
  .arrow-button-container:hover {
    color: black;
  }
</style>
