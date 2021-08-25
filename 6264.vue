<template>
 
</template>
 
<script lang='ts'>
 
import { Component, Prop, Vue } from 'vue-property-decorator';
 
@Component
 
export default class xxx extends Vue {
 
    // type = ["PDF"]

    // created() {
    //     let type = this.currentValue.outputType
    //     if (type !== "PDF_OFD") {
    //         return this.type = [type]
    //     }
    //     this.type = ["PDF", "OFD"]
    // }

    // @Watch('type')
    // watcherType(newValue: any, oldValue: any) {
    //     console.log('newValue', newValue);
    //     console.log('oldValue', oldValue);

    //     if (newValue.length === 0) {
    //         this.$message.warning('请至少选择一项');
    //         let [type] = oldValue
    //         this.type = type
    //     }

    //     if (length === 2) {
    //         return this.currentValue.outputType = "PDF_OFD"
    //     }

    //     let [type] = newValue
    //     this.currentValue.outputType = (type === 'PDF' ? 'PDF' : 'OFD')

    // }
}
</script>
 
<style scoped >
</style>