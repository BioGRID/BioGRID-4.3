<template>
    <v-container fluid class="index-page pa-0">
        <v-sheet color="secondary">
            <v-container class="pa-0">
                <v-card color="secondary" dark class="pa-0 ma-0 white--text text-center" flat rounded="0">
                    <v-img
                        src="/images/biogrid_logo.png"
                        contain
                        position="center center"
                        max-height="100"
                        class="mr-12"
                    />
                    <h1 class="accent--text">
                        Welcome to the Biological General Repository for Interaction Datasets
                    </h1>
                    <div class="subtitle-1 grey--text text--lighten-4">
                        BioGRID is an open access, interaction database with data compiled through comprehensive literature curation efforts. All data are freely provided via our search index and available for download in standardized formats.
                    </div>
                    <v-row no-gutters class="mt-7 mb-7">
                        <v-col
                            lg="8"
                            offset-lg="2"
                        >
                            <Search />
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col
                            lg="10"
                            offset-lg="1"
                        >
                            <HighlightCards :items="highlightItems" />
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
        </v-sheet>

        <v-container>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et commodo purus. Vestibulum condimentum cursus quam gravida vestibulum. Ut ut lacus accumsan, porta ante in, sodales felis. Vivamus pellentesque faucibus risus vel gravida. Quisque non risus tellus. Vestibulum auctor justo ut libero mollis dignissim. Morbi vitae nunc tortor. Pellentesque sagittis arcu vitae orci varius fringilla. Nam elementum nisi scelerisque porttitor vehicula.</p>

            <p>Proin vitae tellus feugiat, pellentesque ex eu, porta orci. Donec nec enim accumsan, lacinia ligula nec, varius dolor. Sed vitae interdum urna, eget dapibus lacus. Ut vehicula ante vitae suscipit ultrices. Etiam nec arcu justo. Nam bibendum non tortor sit amet interdum. Ut quis mauris id orci auctor sollicitudin. Nulla pretium fermentum eros, eu gravida nulla rhoncus at. Nullam sollicitudin porta turpis, at viverra eros lacinia volutpat. Nunc ut lectus quis velit malesuada finibus. Sed sem magna, fermentum in condimentum vel, vestibulum vitae dui. Quisque venenatis mauris nec malesuada aliquam. Nam molestie dolor ac urna malesuada, sit amet convallis ante fringilla.</p>

            <p>Aenean sit amet tortor malesuada, placerat ligula id, imperdiet ligula. Duis mollis leo at lacinia convallis. Etiam molestie, ligula tincidunt suscipit efficitur, ipsum mi volutpat ex, id sollicitudin metus urna nec magna. Praesent sit amet dignissim dui. Donec ex ex, laoreet sed imperdiet id, vehicula a ante. Mauris elementum luctus dolor, vitae pulvinar sem lacinia vel. Vivamus nec tincidunt sem. Suspendisse pellentesque ut enim vitae viverra. Quisque ultricies, ex nec pretium tincidunt, quam nibh vulputate lacus, quis fermentum ipsum risus eu urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi gravida luctus sem in facilisis. Nulla egestas massa posuere, consequat mi vitae, vehicula est. Suspendisse rhoncus ullamcorper efficitur. Curabitur commodo odio enim, in tempor metus pulvinar sit amet. Integer efficitur tortor tellus, feugiat laoreet felis egestas eu.</p>
        </v-container>

        <v-sheet color="grey lighten-2">
            <v-container>
                <p>Integer congue rutrum lacinia. Nam mollis ex sit amet ante suscipit mollis. Morbi malesuada lorem non nisl pretium tincidunt. Sed elementum augue non erat sagittis, sed scelerisque arcu venenatis. Donec fermentum commodo lectus, sed dignissim enim tempus at. In est libero, mollis non scelerisque et, egestas eget est. Fusce euismod metus et sapien hendrerit, at sollicitudin mauris ullamcorper. Aenean cursus pulvinar nulla in gravida.</p>

                <p>Mauris sit amet nulla viverra, fermentum quam vitae, ornare sapien. Ut tempor, purus at aliquam luctus, diam libero pulvinar enim, eget congue ex lacus posuere neque. Pellentesque mollis rhoncus ullamcorper. Aliquam tellus felis, vestibulum ut gravida non, tincidunt ac sapien. Aenean molestie ex et ligula dictum sagittis. Nullam ullamcorper commodo turpis vitae facilisis. Suspendisse potenti. Cras maximus vel mi in porttitor. Praesent gravida tincidunt fermentum. Sed auctor nulla sed lacus eleifend consequat. Proin lacinia nisl ac porttitor gravida.</p>

                <p>Integer quis gravida lorem. Vestibulum rhoncus libero nec fermentum interdum. Nam turpis nulla, viverra vel massa at, blandit condimentum tellus. Aenean elit tortor, tempor in turpis et, gravida elementum quam. Cras pulvinar, ante nec tempus porttitor, libero risus semper purus, non mollis ante risus euismod eros. Morbi in venenatis nisl, quis luctus arcu. Fusce blandit tortor id finibus euismod. Aliquam pharetra magna ac ipsum molestie, in ullamcorper magna posuere. Etiam finibus facilisis justo sed tempus. Aenean rutrum scelerisque sem non lobortis. Ut magna eros, venenatis eu ex id, venenatis ullamcorper est. Mauris a est metus. Aliquam sem orci, vestibulum tincidunt nibh a, gravida malesuada dui.</p>
            </v-container>
        </v-sheet>

        <v-container>
            <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur vel gravida leo. Nam ornare metus in risus dapibus, nec bibendum nunc dictum. Nulla interdum commodo enim, quis tempus ipsum placerat sed. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pretium hendrerit nulla, accumsan luctus lectus tempor id. Duis luctus nulla et metus porttitor, sed egestas turpis tempor. Morbi augue neque, eleifend at pharetra non, hendrerit a tortor. Curabitur vitae euismod dui. Sed ultricies ipsum quis neque vestibulum pellentesque. Nullam at justo lorem.</p>

            <p>Sed tempor est diam, suscipit placerat purus bibendum non. Integer a felis interdum, imperdiet nisl at, maximus justo. Curabitur ac tortor porta, porta nibh sed, suscipit mi. Nam at ipsum eget orci elementum consequat ut a turpis. Mauris pellentesque vulputate turpis, vel posuere ipsum maximus ut. Donec nec vestibulum odio. Phasellus sit amet risus enim. Maecenas porta nisi aliquet neque ultricies, vitae vehicula lacus consequat. Proin sed augue sit amet tortor efficitur congue. Nam fermentum lorem dolor, sit amet imperdiet arcu laoreet id. Duis et nibh gravida, porttitor elit non, dictum dui. Phasellus pellentesque lectus nec pretium luctus.</p>

            <p>Integer vel purus dui. Maecenas vitae nisl odio. Aenean pellentesque nec ligula quis vestibulum. Nunc tristique dolor nunc, a congue neque viverra ac. Sed hendrerit interdum odio. Donec malesuada auctor facilisis. Integer dignissim lectus in porta aliquam. Mauris mollis, velit a consequat efficitur, lacus ex laoreet odio, sit amet gravida lectus ante nec lacus. Aliquam suscipit convallis ex. Vivamus eleifend aliquet congue. Quisque consectetur a eros vitae tempus. Aliquam aliquet, enim vitae posuere hendrerit, enim justo dignissim turpis, ut facilisis metus lacus a metus. Aenean risus quam, vulputate et neque sit amet, eleifend molestie leo. In dapibus fermentum augue, eu aliquet augue mollis vel. Nunc ullamcorper eros urna, non consectetur nulla egestas non.</p>
        </v-container>

        <v-sheet color="grey lighten-2">
            <v-container>
                <p>Duis lobortis augue eget est malesuada porttitor. Nam semper dui felis, ut dictum justo mollis et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non felis imperdiet, scelerisque mi quis, luctus lacus. Nulla facilisi. In hac habitasse platea dictumst. Fusce pellentesque augue dolor, ut bibendum nulla condimentum non. Nullam ullamcorper gravida sapien, nec sodales ex dictum quis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>

                <p>Donec mattis augue sed bibendum dignissim. Integer libero neque, euismod vel urna et, condimentum placerat nisi. Ut ornare pretium interdum. Phasellus ac arcu et est lobortis venenatis ut vitae ex. Phasellus malesuada erat ligula, vehicula ultrices elit dignissim non. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum nulla justo, varius non erat ut, pellentesque eleifend lorem. Etiam vitae sollicitudin mi. Vestibulum porta, nibh ac convallis mollis, orci tortor pretium lectus, quis cursus lacus sapien a nulla. Curabitur ut feugiat purus, sed convallis justo. In rutrum commodo dolor non consequat. Nullam consequat dolor quis mauris laoreet, eget luctus augue semper. Nam interdum eu lectus eu condimentum.</p>

                <p>Nam at posuere tellus, et cursus orci. Aenean efficitur libero vulputate nisi volutpat, mattis posuere lacus dictum. Aenean lobortis, ante eu facilisis vulputate, nulla ante sodales eros, eget dictum metus odio quis massa. Maecenas in urna lectus. Phasellus luctus massa at pulvinar lacinia. Duis sollicitudin semper nulla sit amet luctus. Quisque sodales risus quis diam eleifend, suscipit viverra nunc malesuada.</p>
            </v-container>
        </v-sheet>

        <v-container>
            <p>Nullam posuere sagittis odio in luctus. Donec sollicitudin, tellus in luctus porta, sapien erat iaculis nulla, ultricies scelerisque nisl arcu id lacus. Phasellus sed ex non libero commodo molestie eget sed enim. Nulla facilisi. Fusce at dolor ex. Mauris tellus mi, gravida eget nulla eu, maximus facilisis urna. Phasellus imperdiet efficitur dui quis posuere. Nulla porta dignissim lacinia. Pellentesque hendrerit varius felis at sollicitudin.</p>

            <p>Curabitur eu quam sit amet metus dictum pulvinar non nec massa. Integer viverra velit orci, sed aliquet tellus ultricies id. Morbi sed placerat arcu, ut hendrerit arcu. Mauris tempor lacinia est, id gravida quam vulputate rutrum. Sed sit amet neque ac mi pellentesque tincidunt quis et magna. Curabitur eget dapibus ipsum, id ornare risus. Donec sit amet massa lobortis, posuere lorem eget, consectetur massa. Aenean eleifend, massa accumsan mattis ultricies, nisl risus venenatis massa, at interdum nisi massa quis sem. Maecenas vulputate sit amet magna eu aliquam. Aliquam efficitur orci sed tortor rutrum dictum. Fusce consectetur enim at tempor pharetra. Mauris ultricies nibh tempus purus ultrices finibus. Fusce tempus turpis eu orci volutpat aliquam.</p>

            <p>Donec ultricies tortor sit amet tellus tincidunt, ac tempor nisi mattis. Pellentesque fringilla sit amet erat nec placerat. Morbi dignissim euismod magna, ullamcorper aliquet quam vulputate nec. Pellentesque at dignissim erat. Aliquam leo mi, egestas eget ligula ut, convallis convallis metus. Nulla ultrices, orci non molestie sollicitudin, mauris purus placerat elit, ut scelerisque nisl lectus eu eros. Vivamus rhoncus dignissim hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</p>
        </v-container>

        <v-sheet color="grey lighten-2">
            <v-container>
                <p>Nullam tortor est, convallis ac augue a, viverra dignissim est. Aenean pulvinar dictum lacus et blandit. Sed mattis, leo at varius dictum, nibh purus varius leo, non hendrerit magna dui id orci. Sed quis lectus purus. Etiam consectetur dapibus justo a tincidunt. Donec placerat convallis porta. Donec in sagittis nisi, eu fermentum eros. Sed maximus volutpat dolor non consequat. Suspendisse lobortis eu sapien non dapibus. Praesent elementum tortor arcu, in tempor eros luctus eu. Phasellus convallis vitae dui nec scelerisque. Sed eget tincidunt leo, sed dapibus neque. Pellentesque eget porttitor libero. Integer sapien tortor, finibus cursus ex vitae, hendrerit pharetra ligula. Nullam vitae consequat mi.</p>

                <p>Integer et felis quis diam placerat efficitur. Aliquam ac eros elementum, molestie lacus at, hendrerit lectus. Fusce id nisl dictum mi bibendum tincidunt. Phasellus vel tellus et lectus tincidunt ultrices. Nam non odio hendrerit ante volutpat auctor id sit amet metus. Cras vel nulla erat. Donec tincidunt pellentesque leo a maximus. In hac habitasse platea dictumst. Suspendisse efficitur malesuada vestibulum. Vivamus posuere varius sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</p>
            </v-container>
        </v-sheet>

        <v-container>
            <p>In tristique, est porta lobortis pharetra, magna leo sagittis elit, a faucibus justo nisi at velit. Duis interdum erat eu mauris laoreet volutpat. Integer tortor velit, dictum vel ligula sit amet, ultrices placerat mi. Etiam in fermentum enim. Aenean in ullamcorper nisi. Quisque ligula libero, consequat in finibus cursus, lobortis at nisi. Integer ut libero eu tellus vehicula posuere a vel nunc.</p>

            <p>Etiam facilisis sodales justo ac ullamcorper. Quisque ut lectus sit amet lacus ornare euismod eget at nisl. Phasellus quam elit, bibendum ac erat aliquet, sodales dignissim mi. Sed vitae urna vel urna ultricies posuere at auctor tellus. Aenean in lacus urna. Etiam efficitur urna non eros accumsan, eget suscipit lacus convallis. Nulla vel lobortis purus, a ornare magna.</p>

            <p>Donec porttitor nisi quam, a molestie enim mollis eget. Donec erat libero, interdum ultrices erat eu, scelerisque euismod orci. Fusce vulputate erat tellus, vel semper mauris luctus id. Vestibulum dapibus turpis a dapibus volutpat. Phasellus non sapien sodales, rutrum lorem ut, tristique metus. Fusce sit amet ex a leo semper dapibus sed non diam. Donec maximus neque eros, sed mollis lacus eleifend cursus. Nunc et odio consequat, tincidunt dolor finibus, volutpat ex. Nunc gravida pulvinar quam, in tincidunt eros vehicula non. Quisque commodo neque lacinia leo finibus porttitor. Mauris id faucibus neque. Nam lobortis erat sed velit ultricies convallis. Nam non turpis mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In ipsum justo, venenatis ullamcorper eleifend sed, faucibus in sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
        </v-container>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Linkout } from '@/utilities/interfaces'
import HighlightCards from '@/components/content/HighlightCards.vue'
import Search from '@/components/search/Search.vue'

@Component({
    components: {
        HighlightCards,
        Search
    }
})
export default class IndexPage extends Vue {
        private highlightItems: Linkout[] = [
            { to: '/test', text: 'Featured Datasets', title: 'BioGRID Featured Datasets', icon: 'mdi-star', internal: true },
            { to: '/test', text: 'Curation Projects', title: 'BioGRID Curation Projects', icon: 'mdi-brain', internal: true },
            { to: 'https://orcs.thebiogrid.org', text: 'BioGRID ORCS', title: 'BioGRID ORCS CRISPR Database', icon: 'mdi-dna', internal: false },
            { to: '/test', text: 'YouTube Tutorials', title: 'BioGRID Youtube Tutorial Videos', icon: 'mdi-youtube', internal: true },
            { to: '/test', text: 'Latest Updates', title: 'Follow @biogrid on Twitter', icon: 'mdi-twitter', internal: true },
            { to: 'http://yahoo.com', text: 'Yahoo', title: 'Yahoo News', icon: 'mdi-yahoo', internal: false }
        ]
}
</script>
