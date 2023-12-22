<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    return {};
  },
  methods: {
    enableNotifications() {
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      } else if (Notification.permission === "granted") {
        const notification = new Notification("Hi already!");
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            const notification = new Notification("Hi there!");          }
        });
      }
    },


  },
});
</script>

<template>
<div class="container mt-3">
      <button id="notifications"
              @click="enableNotifications"
      >Enable notifications</button>
      <router-view />
    </div>
</template>

<style scoped lang="scss">

</style>
