<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Create event</h1>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input id="title" v-model="title" type="text" class="validate" required>
          <label for="title">Event name</label>
          <span class="helper-text" data-error="Event name is required"></span>
        </div>

        <div><input id="date" v-model="date" type="text" ref="datepicker">
          <label for="title">Date</label>
        </div>

        <div>
          <input id="time" v-model="time" type="text" ref="timepicker">
          <label for="title">Start Time</label>
        </div>

        <div>
          <input id="time2" v-model="time2" type="text" ref="timepicker1">
          <label for="title">End Time</label>
        </div>

        <button class="btn" type="submit">Create event</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'create',
  data: () => ({
    title: '',
    date: null,
    time: null,
    time2: null,
    favorite: 'No',
    delevent: 'No'
  }),
  components: {
  },
  mounted() {
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate: true
    })
    this.time = M.Timepicker.init(this.$refs.timepicker)
    this.time2 = M.Timepicker.init(this.$refs.timepicker1)

  },
  methods: {
    submitHandler() {
      const event = {
        id: Date.now(),
        title: this.title,
        favorite: 'No',
        date: this.date.date,
        time: this.time.time,
        time2: this.time2.time2,
        delevent: 'No'
      }
      this.$store.dispatch('createEvent', event)
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
