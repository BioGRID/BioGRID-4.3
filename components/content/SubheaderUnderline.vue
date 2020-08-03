<template>
    <div :class="underlineClass()" :style="underlineStyle()" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class SubheaderUnderline extends Vue {
    @Prop({ type: String, default: '5' }) private topMargin!: number;
    @Prop({ type: String, default: '5' }) private botMargin!: number;
    @Prop({ type: String, default: '120px' }) private width!: number;

    private underlineStyle () {
        const styles: string[] = []
        styles.push('margin: 0 auto')
        styles.push('width:' + this.width)
        return styles.join(';')
    }

    private underlineClass () {
        const classEntries: string[] = ['subheaderUnderline']
        classEntries.push('mt-' + this.topMargin)
        classEntries.push('mb-' + this.botMargin)
        return classEntries.join(' ')
    }
}
</script>

<style lang="scss" scoped>
    .subheaderUnderline {
        border-bottom: 3px dotted var( --v-accent-base );
    }
</style>
