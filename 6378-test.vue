<template>
    <div class="123">

        <!-- 关联文件为取消关联状态 -->
        <template v-if="file.contract.cancel">
            <!-- 当前文件为已作废时显示 -->
            <template v-if="contract.status==='CANCELLED'">
                <!-- 关联文件状态为已完成时显示 -->
                <el-tag
                    v-if="file.contract.status==='COMPLETE'"
                    class="item-oldFile-tag"
                    size="mini"
                >
                    {{ file.associationStatus }}
                </el-tag>
                <!-- 关联文件状态不为已完成时显示。原先逻辑 -->
                <el-tooltip
                    v-else
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

            <!-- 当前文件为完成时显示 -->
            <template v-else-if="contract.status==='COMPLETE'">
                <!-- 关联文件状态为已作废时显示 -->
                <template v-if="file.contract.status==='CANCELLED'">
                    <span class="file-name__wrapper">{{ file.contract.subject }} <span class="tip">({{ file.contract.statusDesc }})</span> <span class="item-newFile-tag">{{ file.associationOperator }}</span></span>
                    <span class="file-affiliation__wrapper">{{ file.tenantNames }}</span>
                </template>
                <!-- 关联文件状态为非作废时显示。原有逻辑 -->
                <template v-else>
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
            </template>

            <!-- 当前文件为非完成，非作废时显示。原有逻辑 -->
            <template v-else>
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
        </template>

        <!-- 原有逻辑 -->
        <template v-else>
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

        <!-------------------------------------------------------------------------------------------------->
        <!-------------------------------------------------------------------------------------------------->
        <!-------------------------------------------------------------------------------------------------->
        <!-------------------------------------------------------------------------------------------------->
        <!-------------------------------------------------------------------------------------------------->
        <!-------------------------------------------------------------------------------------------------->

        <!-- 前有logo -->
        <template v-if="judgeTemplate(row)===1">
            <el-tag
                v-if="file.contract.status==='COMPLETE'"
                class="item-oldFile-tag"
                size="mini"
            >
                {{ file.associationStatus }}
            </el-tag>
            <span class="file-name__wrapper">{{ file.contract.subject }} <span class="tip">({{ file.contract.statusDesc }})</span></span>
            <span class="file-affiliation__wrapper">{{ file.tenantNames }}</span>
        </template>

        <!-- 后有logo -->
        <template v-else-if="judgeTemplate(row)===2">
            <span class="file-name__wrapper">{{ file.contract.subject }} <span class="tip">({{ file.contract.statusDesc }})</span> <span class="item-newFile-tag">{{ file.associationOperator }}</span></span>
            <span class="file-affiliation__wrapper">{{ file.tenantNames }}</span>
        </template>

        <!-- 原有逻辑 -->
        <template v-else>
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


    methods: {
        
       /* 原有显示方式返回0
          文件名前有关联状态显示返回1
          文件名后有关联操作显示返回2 */
        judgeTemplate(row) {
            /* 1.当前文件未设置取消关联 */
            if (!row.cancel) {
                return 0
            }
            /* 2.当前文件设置取消关联 */
            // 2.1 当前文件已作废
            if (this.contract.status === 'CANCELLED') {
                return row.contract.status === 'COMPLETE' ? 1 : 0 // 关联文件已完成
            }
            // 2.2 当前文件已完成
            else if (this.contract.status === 'COMPLETE') {
                return row.contract.status === 'CANCELLED' ? 2 : 0 // 关联文件已作废
            }
            // 2.3 当前文件非已完成、非已作废，进行原逻辑
            else {
                return 0
            }
        }


    }
}
</script>

<style>
</style>