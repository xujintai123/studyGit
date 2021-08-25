<template>
    <div class="container">

        <template v-if='cancel'>
            
        </template>

        <!-- 原先逻辑 -->
        <template>
            <el-tooltip
                content="取消关联"
                placement="top"
            >
                <svg-icon
                    id="icon-scale-reduce"
                    class="remove-relevant__trigger"
                    @click.stop="doRemoveRelevant(file)"
                />
            </el-tooltip>
            <span class="file-name__wrapper">{{ file.contract.subject }} <span class="tip">({{ file.contract.statusDesc }})</span></span>
            <span class="file-affiliation__wrapper">{{ file.tenantNames }}</span>
        </template>

    </div>
</template>

<script>
export default {

}
</script>

<style>
</style>