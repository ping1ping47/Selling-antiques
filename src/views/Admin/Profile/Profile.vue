<template>
  <div v-if="userData">
    <h1>Edit User Information</h1>
    <div>
      <label for="username">Username:</label>
      <input type="text" v-model="userData.username" id="username" />
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" v-model="userData.email" id="email" />
    </div>
    <!-- Add more fields as needed -->
    <button @click="saveChanges">Save Changes</button>
  </div>
  <div v-else>
    <p>Loading user data...</p>
  </div>
</template>


<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

// Computed property to get user data from Vuex store
const userData = computed(() => store.state.userData);

// Method to save changes made to user data
const saveChanges = () => {
  // Call an action to update user data in Vuex store
  store.dispatch("updateUserData", userData.value);
};
</script>
