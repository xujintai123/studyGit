<!-- 发起主体 高级配置 -->
<template>
    <div class="sponsor-setting">
        <!-- 全文浏览 -->
        <custom-setting
            title="全文浏览后才能签署"
            type="SWITCH"
            v-model="currentValue.advancedConfig.viewAllContract"
        />

        <!-- 认证方式 -->
        <custom-setting :description="getSettingDesc(currentValue.advancedConfig.authMode, currentValue.advancedConfig.authDemotionMode)">
            <template #control>
                <signatory-auth-popover
                    is-sponsor
                    :auth-mode.sync="currentValue.advancedConfig.authMode"
                    :auth-demotion-mode.sync="currentValue.advancedConfig.authDemotionMode"
                />
            </template>
            <template #title>
                实名认证
                <el-tooltip
                    content="平台已更改实名认证方式，正在使用默认配置，请检查后重新配置"
                    placement="top"
                    v-if="visibleAuthModeWarning"
                >
                    <i class="icon-warning-circle-red orange-text"></i>
                </el-tooltip>
            </template>
        </custom-setting>

        <!-- 签署校验 -->
        <custom-setting :description="getSettingDesc(currentValue.advancedConfig.signAuth, currentValue.advancedConfig.faceAuthWay, true)">
            <template #control>
                <sign-validate-popover
                    :sign-auth.sync="currentValue.advancedConfig.signAuth"
                    :face-auth-way.sync="currentValue.advancedConfig.faceAuthWay"
                />
            </template>
            <template #title>
                签署校验
                <el-tooltip
                    content="平台已更改签署校验方式，正在使用默认配置，请检查后重新配置"
                    placement="top"
                    v-if="visibleSignAuthWarning"
                >
                    <i class="icon-warning-circle-red orange-text"></i>
                </el-tooltip>
            </template>
        </custom-setting>

        <!-- 笔迹校验 -->
        <custom-setting
            title="个人签名时，手写笔迹需与认证姓名一致"
            type="SWITCH"
            v-model="currentValue.advancedConfig.checkPersonalSeal"
        />

        <!-- 自动跳过 -->
        <custom-setting
            title="相邻审批节点的操作人一致时，自动跳过后续一致的节点"
            type="SWITCH"
            v-model="currentValue.advancedConfig.autoPass"
        />

        <!-- 自动跳过 -->
        <custom-setting
            title="是否允许发起人添加内部签署节点 "
            type="SWITCH"
            v-model="currentValue.advancedConfig.allowOperatorModify"
        />

        <!-- 签批人为空逻辑 -->
        <custom-setting
            title="若发起主体内部节点中的审批人为空"
            :description="operatorIsNullDesc"
        >
            <template #control>
                <sponsor-skip-popover v-model="currentValue.advancedConfig.operatorIsNull" />
            </template>
        </custom-setting>

        <!-- 是否允许删除内部签署节点 -->
        <custom-setting
            title="是否允许发起人删除内部签署节点"
            no-border
            type="SWITCH"
            @switch-change="doSaveConfig()"
            v-model="currentValue.advancedConfig.allowDeleteAction"
        />

        <!-- 是否全部签章人可查看签约后的文件 -->
        <custom-setting
            title="是否全部签章人可查看签约后的文件"
            no-border
            type="SWITCH"
            @switch-change="doSaveConfig()"
            v-model="currentValue.advancedConfig.allOperatorView"
        />
        <!-- <custom-setting :description="signerScanPower">
            <template #control>
                <signer-scan-power-popover
                        v-model="currentValue.advancedConfig.allOperatorView"
                        @on-confirm="doSaveConfig()"
                />
            </template>
            <template #title>
                签约文件签署后签章人查看权限
                <el-tooltip
                    content="平台已更改签章人查看文件权限，正在使用默认配置，请检查后重新配置"
                    placement="top"
                    v-if="visibleAuthModeWarning"
                >
                    <i class="icon-warning-circle-red orange-text"></i>
                </el-tooltip>
            </template>
        </custom-setting> -->

    </div>
</template>
<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { twowayFactory } from '@/mixins/two-way';
import { Data_Workflow } from '@/.data';
import { Model_Signatory } from '@/.model';
// component
import SignatoryAuthPopover from '../../components/signatory-settings/signatory-auth-popover.vue';
import SignValidatePopover from '../../components/signatory-settings/sign-validate-popover.vue';
import SponsorSkipPopover from '../../components/signatory-settings/sponsor-skip-node-popover.vue';
import SignerScanPowerPopover from '../../components/signatory-settings/signer-scan-power-popover.vue';
import { CustomSetting } from '../../layouts';

@Component({
    name: 'SponsorSetting',
    components: { CustomSetting, SignatoryAuthPopover, SignValidatePopover, SponsorSkipPopover,SignerScanPowerPopover }
})
export default class SponsorSetting extends Mixins(twowayFactory<Model_Signatory.SignatoryDefine>()) {
    // 签署校验方式配置变动警告
    @Prop({ type: Boolean })
    visibleSignAuthWarning!: boolean;
    // 实名认证配置变动警告
    @Prop({ type: Boolean })
    visibleAuthModeWarning!: boolean;

    get operatorIsNullDesc() {
        const { operatorIsNull } = this.currentValue.advancedConfig;
        const labelMap = new Map<Model_Signatory.NoneOperatorType, string>([
            ['STOP', '不允许发起'],
            ['IGNORE', '跳过该节点'],
            ['ASSIGN', '由发起人指定'],
        ])
        return labelMap?.get(operatorIsNull) ?? ''
    }

    get isRemote() {
        return this.$_sys.ossConfig.ACTIVE_METHOD;
    }

    getSettingDesc(authType: string, demotion: string, isSign: boolean) {
        const key = isSign ? 'SIGN_AUTH_DESC' : 'AUTH_MODE_DESC';
        return Data_Workflow.FlowConfig(key, authType, demotion, this.$_sys.ossConfig, this.isRemote);
    }

      get signerScanPower() {
       const { allOperatorView } = this.currentValue.advancedConfig;
        const labelMap = new Map([
            [true, '全部签章人可查看'],
            [false, '仅实际签章人可查看'],
        ])
        return labelMap?.get(allOperatorView) ?? ''
    }
}
</script>
<style lang="less" scoped>
</style>
