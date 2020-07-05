<template>
  <v-app dark>
    <TheNavDrawer />
    <TheAppBar />
    <v-main>
        <nuxt />
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TheFooter from '@/components/core/TheFooter.vue'
import TheAppBar from '@/components/core/TheAppBar.vue'
import TheNavDrawer from '@/components/core/TheNavDrawer.vue'

@Component({
    components: {
        TheFooter,
        TheAppBar,
        TheNavDrawer
    }
})
export default class DefaultLayout extends Vue {}
</script>
