<template>
    <el-dialog
        custom-class="config-related qys-dialog"
        :visible.sync="isActive"
        width="440px"
        title="签约文件可关联操作的状态配置"
        :before-close="close"
    >
        <div class="config-related-content">
            <!-- copyConfig.tableData -->
            <el-table
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    prop="opreation"
                    label="关联操作"
                    width="152px"
                >
                    <template #default="{ row }">
                        <span v-if="row.opreation && !row.extra">
                            {{ row.opreation }}
                        </span>
                        <el-input
                            v-else
                            v-model="row.opreation"
                            maxlength="6"
                            placeholder="请输入关联操作"
                            @blur="validateOnblur(row,'opreation')"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="关联状态"
                    width="152px"
                >
                    <template #default="{ row }">
                        <span v-if="row.status&&!row.extra">
                            {{ row.status }}
                        </span>
                        <el-input
                            v-else
                            v-model="row.status"
                            placeholder="请输入关联状态"
                            maxlength="6"
                            @blur="validateOnblur(row,'status')"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                >
                    <template #default="{ $index,row }">
                        <span
                            class="show-pointer"
                            @click="doDelete($index,row)"
                        >
                            <i class="el-icon-delete" />
                        </span>
                    </template>
                </el-table-column>
            </el-table>

            <div class="content-add-status">
                <span
                    class="add-status-button"
                    @click="doAdd()"
                >+ 新增</span>
            </div>
        </div>

        <template #footer>
            <el-button
                size="small"
                @click="close"
            >
                取消
            </el-button>
            <el-button
                size="small"
                type="primary"
                @click="doConfirm"
            >
                确定
            </el-button>
        </template>
    </el-dialog>
</template>
 
<script lang='ts'>

import { Component } from 'vue-property-decorator';
import { MountToBodyVue } from '@/helper/mount-to-body';
import { Model_Workflow } from '@/model';

@Component
export default class ConfigRelatedStatus extends MountToBodyVue {

    config = new Model_Workflow.ElectronicConfig.Bean();
    copyConfig = new Model_Workflow.ElectronicConfig.Bean();

    tableData: any[] = [
        {
            opreation: '转账1',
            status: '王小虎1',
        }, {
            opreation: '转账2',
            status: '王小虎2',
        }, {
            opreation: '转账3',
            status: '王小虎3',
        }, {
            opreation: '转账4',
            status: '王小虎4',
        }
    ]

    afterActive() {
        this.copyConfig = _.cloneDeep(this.config);
    };

    /** 确定 */
    doConfirm() {
        let hasEmptyInput = this.checkEmptyInput()
        if (hasEmptyInput) {
            return this.Message('warning', '输入框不能为空')
        }

        let { repeat, type } = this.validateRepeatOnClick()
        if (repeat) {
            let typeName = type === 'opreation' ? '关联操作' : '关联状态'
            return this.Message('warning', `待提交的${typeName}重复,请重新输入`)
        }

        this.callResolve(this.copyConfig);
        this.close();
    };

    /** 校验是否有输入框为空 */
    checkEmptyInput() {
        return this.tableData.find(item => {
            return item.opreation === '' || item.status === '';
        });
    };

    /** 输入框blur时校验输入是否与同类型的值存在重复 */
    validateOnblur(row: any, type: any) {
        let compareListRepeat = this.tableData.find(item => {
            return item[type] === row[type] && !item.extra;  // 当前输入的值与同类型，非input的值是否重复
        });
        let isRepeat = compareListRepeat || this.validateInputOnblur(row, type);
        if (isRepeat) {
            let typeName = type === 'opreation' ? '关联操作' : '关联状态';
            return this.Message('warning', `已输入的${typeName}重复,请重新输入`);
        }
    };


    /** 输入框blur时校验此输入是否与同类型的输入框数据重复 */
    validateInputOnblur(row: any, type: any) {
        console.log(row);
        let inputList = this.tableData.filter(item => {
            return item.extra && item[type] !== "";  // 筛选出相同类型、非空值的所有输入框值
        });
        let List = [...new Set(inputList.map(item => item[type]))]; // 取出所有的输入框值进行去重操作，若有重复、则去重以后长度会减少
        return List.length < inputList.length ? true : '';
    };

    /** 点击确定按钮进行输入框是否输入重复判断 */
    validateRepeatOnClick() {
        let { length } = this.tableData;
        let opreationList = [...new Set(this.tableData.map(item => item.opreation))]; // 取出所有opreation类型进行去重操作
        if (opreationList.length < length) {
            return { repeat: true, type: 'opreation' };
        }

        let statusList = [...new Set(this.tableData.map(item => item.status))]; // 取出所有status类型进行去重操作
        if (statusList.length < length) {
            return { repeat: true, type: 'status' };
        }

        return { repeat: false, type: '' };
    };


    /** 添加输入框按钮 */
    doAdd() {
        this.tableData.push({ opreation: '', status: '', extra: true });
    };

    /** 删除按钮 */
    doDelete(index: number, row: any) {
        this.$confirm('此操作将删除该项关联操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
        })
            .then(() => {
                this.tableData.splice(index, 1);
                this.Message('success', '删除成功!');
            })
            .catch(() => {
                this.Message('info', '已取消删除');
            });
    };

    Message(type: any, message: any) {
        this.$message({
            type,
            message
        });
    };
}
</script>
 
<style lang="less"  scoped>
.config-related {
    .config-related-content {
        width: 100%;
        .show-pointer {
            cursor: pointer;
        }
        .content-add-status {
            padding: 20px 18px;
            .add-status-button {
                color: #2489f2;
                cursor: pointer;
            }
        }
    }
}

/deep/ .el-dialog__body {
    height: 350px;
    overflow-y: auto;
}
</style>