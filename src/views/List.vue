<template>
  <div>
    <h1>List</h1>
    <div class="row">
      <div class="input-field col s2">

    <select ref="select" v-model="filter">
      <option value="Yes" selected>Favorites</option>
      <option value="">All</option>
    </select>
    <label>Favorites Event Filter</label>
      </div>
    </div>
    <hr>

    <table v-if="events.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Open</th>
          <th>Favorite</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(event, idx) of existEvents"
      :key="event.id">
        <td>{{idx + 1}}</td>
        <td>{{event.title}}</td>
        <td>{{ new Date(event.date).toLocaleDateString()}}</td>
        <td>{{event.time}}</td>
        <td>{{event.time2}}</td>
        <td>
          <router-link tag="button" class="btn btn-small" :to="'/event/' + event.id">
            Open
          </router-link>
        </td>
        <td>{{event.favorite}}</td>
      </tr>
      </tbody>
    </table>
    <p v-else>No Event</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    filter: 'Yes',
    filterdel: 'No'
  }),
  computed: {
    events() {
      return this.$store.getters.events
    },
    displayEvents() {
      return this.events.filter(t => {
        if (!this.filter) {
          return true
        }
        return t.favorite === this.filter
      })
    },
    existEvents() {
      return this.displayEvents.filter(t => {
        if (!this.filterdel) {
          return true
        }
        return t.delevent === this.filterdel
      })
    }
  },
  mounted() {
    M.FormSelect.init(this.$refs.select);
  }
}
</script>

<style lang="scss" scoped>
</style>