<template>
  <container>
    <row>
      <column v-for="(positive, idx) in dataToShow" :key="idx" xs="12" sm="4" md="4" lg="4" style="padding: 10px;">
        <div style="border: 1px solid black;">
          <row :centerXs="true" :centerSm="true" :centerMd="true" :centerLg="true">
            {{ positive.id }}
          </row>
          <row :centerXs="true" :centerSm="true" :centerMd="true" :centerLg="true">
            {{ moodIcons[positive.mood] }}
          </row>
          <row style="padding: 20px">
            <container>
              <row v-for="(positive_detail, idx2) in positive.positive_details" :key="idx2">
                {{ positive_detail }}
              </row>
            </container>
          </row>
        </div>
      </column>
    </row>
  </container>
</template>

<script>

export default {
  props: {
    offset: Number,
    range: Number,
    data: Array
  },
  data () {
    return {
      moodIcons: ['😡', '🙁', '😐', '😊', '😁']
      // positives: [
      //   {
      //     id: nextPositiveId++,
      //     text: 'Learn Vue'
      //   },
      //   {
      //     id: nextPositiveId++,
      //     text: 'Learn about single-file components'
      //   }
      // ]
    }
  },
  computed: {
    dataToShow: function() {
      return this.data.slice(this.data.length - this.range - this.offset, this.data.length - this.offset)
    }
  }
  // methods: {
  //   addPositive () {
  //     const trimmedText = this.newPositiveText.trim()
  //     if (trimmedText) {
  //       this.positives.push({
  //         id: nextPositiveId++,
  //         text: trimmedText
  //       })
  //       this.newPositiveText = ''
  //     }
  //   },
  //   removePositive (idToRemove) {
  //     this.positives = this.positives.filter(positive => {
  //       return positive.id !== idToRemove
  //     })
  //   }
  // },
}
</script>
