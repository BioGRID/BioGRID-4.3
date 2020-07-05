<template>
    <div class="the-footer">
        <v-footer
            app
            color="secondary"
            padless
        >
            <v-row
                justify="center"
                no-gutters
            >
                <v-btn
                    v-for="(link,i) in footerLinks"
                    :key="i"
                    :href="link.to"
                    target="_BLANK"
                    color="white"
                    :title="link.title"
                    text
                    rounded
                    class="my-2 ma-0"
                >
                    {{ link.text }}
                </v-btn>
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

interface FooterLink {
    to: string;
    text: string;
    title: string;
}

@Component
export default class TheFooter extends Vue {
    private copyrightOwner: string = 'TyersLab.com';
    private footerLinks: FooterLink[] = [
        { to: 'https://orcs.thebiogrid.org', text: 'CRISPR Database', title: 'BioGRID ORCS - CRISPR Screen Database' },
        { to: 'https://yeastkinome.org', text: 'Yeast Kinome', title: 'The Yeast Kinase and Phosphatase Interactome' },
        { to: 'https://github.com/BioGRID', text: 'Our GitHub', title: 'BioGRID GitHub Repository' },
        { to: 'https://www.youtube.com/user/TheBioGRID', text: 'YouTube Tutorials', title: 'BioGRID Youtube Tutorial Videos' },
        { to: 'https://twitter.com/biogrid', text: 'Latest Updates', title: 'Follow @biogrid on Twitter' }
    ]
}
</script>
