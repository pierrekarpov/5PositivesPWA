<template>
  <container>
    <row>
      <!-- <column v-for="(positive, idx) in this.data.slice(this.data.length - this.range - this.offset, this.data.length - this.offset)" :key="idx" xs="12" sm="4" md="4" lg="4" style="padding: 10px;"> -->
      <column v-for="(d, idx) in this.days.slice(this.days.length - this.range - this.offset, this.days.length - this.offset)" :key="idx" xs="12" sm="4" md="4" lg="4" style="padding: 10px;">
        <div style="border: 1px solid black;">
          <row :centerXs="true" :centerSm="true" :centerMd="true" :centerLg="true">
            {{ d }}
          </row>
          <div v-if="data.find((e) => e.id == d) !== undefined">
            <row :centerXs="true" :centerSm="true" :centerMd="true" :centerLg="true">
              {{ moodIcons[data.find((e) => e.id == d).mood] }}
            </row>
            <row style="padding: 20px">
              <container>
                <row v-for="(positive_detail, idx2) in data.find((e) => e.id == d).positive_details" :key="idx2">
                  <div @click="deletePositive(idx2, data.find((e) => e.id == d))" class="list-action-button-container">
                    <font-awesome-icon icon="times-circle" />
                  </div>
                  {{ positive_detail }}
                </row>
                <row>
                  <div class="list-action-button-container">
                    <font-awesome-icon icon="plus-circle" @click="addPositive(data.find((e) => e.id == d))"/>
                    <input v-model="newPositiveDetailText[d]" @keyup.enter="addPositive(data.find((e) => e.id == d))" type='text' ref='title' defaultValue="">
                  </div>
                </row>
              </container>
            </row>
          </div>
          <div v-else>
            <!-- <row :centerXs="true" :centerSm="true" :centerMd="true" :centerLg="true">
              mood
            </row> -->
            <row style="padding: 20px">
              <container>
                <row>
                  <div class="list-action-button-container">
                    <font-awesome-icon icon="plus-circle" @click="addNewPositive(d)"/>
                    <input v-model="newPositiveDetailText[d]" @keyup.enter="addNewPositive(d)" type='text' ref='title' defaultValue="">
                  </div>
                </row>
              </container>
            </row>
          </div>
        </div>
      </column>
    </row>
  </container>
</template>

<script>

import { db } from '../main'

export default {
  props: {
    offset: Number,
    range: Number,
    data: Array,
    days: Array
  },
  data () {
    return {
      moodIcons: ['😡', '🙁', '😐', '😊', '😁'],
      newPositiveDetailText: {}
    }
  },
  methods: {
    addPositive (positive) {
      let newPositiveDetails = [...positive.positive_details, this.newPositiveDetailText[positive.id]]
      this.newPositiveDetailText[positive.id] = ''
      this.saveToDatabase(positive, newPositiveDetails)
    },
    addNewPositive (day) {
      let userId = 'fqR8JPFx7q90o1dcsxUw'
      var ref = db.collection('positives').doc(userId).collection('data_by_day').doc(day)

      ref.set({
          positive_details: [this.newPositiveDetailText[day]]
      })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        this.newPositiveDetailText[day] = ''
    },
    deletePositive (positiveId, positive) {
      let newPositiveDetails = [...positive.positive_details.slice(0, positiveId), ...positive.positive_details.slice(positiveId + 1)]
      this.saveToDatabase(positive, newPositiveDetails)
    },
    saveToDatabase (positive, data) {
      let userId = 'fqR8JPFx7q90o1dcsxUw'
      var ref = db.collection('positives').doc(userId).collection('data_by_day').doc(positive.id)

      ref.update({
        'positive_details': data
      })
        .then(function () {
          console.log('Document successfully updated!')
        })
    }
  }
}
</script>

<style scoped>
  .list-action-button-container {
    cursor: pointer;
    color: #676767;
    margin-right: 5px;
  }
  .list-action-button-container:hover {
    color: black;
  }
  .list-action-button-container input {
    margin-left: 5px;
  }

  /* .delete-button font-awesome-icon {
    color: 444446;
  } */
</style>
