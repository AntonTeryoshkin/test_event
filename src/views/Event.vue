<template>
  <div class="row">
    <div v-if="event" class="col s6 offset-s3">
      <h1>Event name: {{event.title}}</h1>
              <button class="btn red" type="button" style="margin-left: 30rem;" @click="deletevent">Delete</button>
      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input id="title" v-model="title" type="text" class="validate" required>
          <span class="helper-text" data-error="Event name is required"></span>
        </div>

        <div>
          <input type="text" ref="datepicker">
        </div>

        <div>
          <input id="time" v-model="time" type="text" ref="timepicker">
          <label for="title">Start Time: {{event.time}}</label>
        </div>
        <div>
          <input id="time2" v-model="time2" type="text" ref="timepicker1">
          <label for="title">End Time: </label>
        </div>

        <button class="btn" type="submit" style="margin-right: 1rem;">Update event</button>
        <router-link tag="button" class="btn btn-small" :to="'/list'">
          Close
        </router-link>
        <button v-if="event.favorite = 'No'" class="btn green" type="button" style="margin-left: 5rem;" @click="addtofavorEvent">Add to favorite</button>
        <button class="btn orange" type="button" style="margin-left: 1rem;" @click="removefromfavorEvent">Remove</button>
        <hr>


      </form>
    </div>
    <p v-else>Event not found</p>

  </div>
</template>

<script>
export default {
  computed: {
    event() {
      return this.$store.getters.eventById(+this.$route.params.id)
    }
  },
  data: () => ({
    title: '',
    date: null,
    time: null,
    time2: null
  }),
  mounted() {
    this.title = this.event.title
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(this.event.date),
      setDefaultDate: true
    })
    this.time = M.Timepicker.init(this.$refs.timepicker)
    this.time2 = M.Timepicker.init(this.$refs.timepicker1)
  },
  methods: {
    submitHandler() {
      this.$store.dispatch('updateEvent', {
        title: this.title,
        id: this.event.id,
        date: this.date.date,
        time: this.time.time,
        time2: this.time2.time2
      })
      this.$router.push('/list')
    },
    addtofavorEvent() {
      this.$store.dispatch('addtofavorEvent', this.event.id)
      this.$router.push('/list')
    },
    removefromfavorEvent() {
      this.$store.dispatch('removefromfavorEvent', this.event.id)
      this.$router.push('/list')
    },
    deletevent() {
      this.$store.dispatch('deletevent', this.event.id)
      this.$router.push('/list')
    }
  },
    destroyed() {
      if (this.date && this.date.destroy) {
        this.date.destroy()
    }
  }
}
</script>
