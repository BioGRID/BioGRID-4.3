<template>
    <div class="the-footer">
        <v-footer
            color="secondary"
            padless
            inset
            :fixed="false"
        >
            <v-row
                justify="center"
                no-gutters
            >
                <template
                    v-for="(link,i) in footerLinks"
                >
                    <v-btn
                        v-if="!link.internal"
                        :key="i"
                        :href="link.to"
                        target="_BLANK"
                        color="white"
                        :title="link.title"
                        text
                        rounded
                        class="my-2 ma-0"
                    >
                        <v-icon class="pr-1">
                            {{ link.icon }}
                        </v-icon>
                        <span class="hidden-sm-and-down">{{ link.text }}</span>
                    </v-btn>
                    <v-btn
                        v-if="link.internal"
                        :key="i"
                        :to="link.to"
                        nuxt
                        target="_BLANK"
                        color="white"
                        :title="link.title"
                        text
                        rounded
                        class="my-2 ma-0"
                    >
                        <v-icon class="pr-1">
                            {{ link.icon }}
                        </v-icon>
                        <span class="hidden-sm-and-down">{{ link.text }}</span>
                    </v-btn>
                </template>
                <v-col
                    class="pt-0 pb-2 text-center white--text"
                    cols="12"
                >
                    <span>Copyright &copy; {{ new Date().getFullYear() }}, {{ copyrightOwner }}, All Rights Reserved</span>
                </v-col>
            </v-row>
        </v-footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Linkout } from '@/utilities/types'

@Component
export default class TheFooter extends Vue {
    private copyrightOwner: string = 'TyersLab.com';
    private footerLinks: Linkout[] = [
        { to: 'https://orcs.thebiogrid.org', text: 'CRISPR Database', title: 'BioGRID ORCS - CRISPR Screen Database', icon: 'mdi-dna', internal: false },
        { to: 'https://yeastkinome.org', text: 'Yeast Kinome', title: 'The Yeast Kinase and Phosphatase Interactome', icon: 'mdi-link-variant', internal: false },
        { to: 'https://github.com/BioGRID', text: 'Our GitHub', title: 'BioGRID GitHub Repository', icon: 'mdi-github', internal: false },
        { to: 'https://www.youtube.com/user/TheBioGRID', text: 'YouTube Tutorials', title: 'BioGRID Youtube Tutorial Videos', icon: 'mdi-youtube', internal: false },
        { to: 'https://twitter.com/biogrid', text: 'Latest Updates', title: 'Follow @biogrid on Twitter', icon: 'mdi-twitter', internal: false }
    ]
}
</script>
