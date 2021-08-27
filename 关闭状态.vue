<template>
    <div class="app-use-status el-message--warning">
        <i class="el-icon-warning"></i>
        <span class="reason">{{platform}}由于{{reason}}已停用，暂不可进行签署、认证、存证等操作</span>
        <i
            class="el-icon-close"
            @click="closeWarningToast"
        ></i>
    </div>
</template>
 
<script lang='ts'>

import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const ModuleServiceStatus = namespace('serviceStatus');

@Component

export default class AppUseStatus extends Vue {

    /**
     * VueX state
     * ###服务状态停用原因
     */
    // @State(state => state.serviceStatus.reason)
    // reason!: string;
    @ModuleServiceStatus.State('reason')
    reason!: string;

    /**
     * VueX state
     * ###服务状态停用的公司平台
     */
    // @State(state => state.serviceStatus.platform)
    // platform!: string;
    @ModuleServiceStatus.State('platform')
    platform!: string;


    @ModuleServiceStatus.Mutation('set_showWarningToast')
    set_showWarningToast!: (status: boolean) => void;

    @ModuleServiceStatus.Mutation('set_reason')
    set_reason!: (reason: string) => void;

    @ModuleServiceStatus.Mutation('set_platform')
    set_platform!: (platform: string) => void;

    closeWarningToast() {
        // this.$store.commit('set_showWarningToast', false);
        this.set_showWarningToast(false)
    }

    async created() {
        try {
            let getReason = await this.$_apis.UseStatus.getUseStatus() // 获取停止服务原因
            let getPlatform = await this.$_apis.organization.queryPlatform() // 获取停止服务的公司平台
            // this.$store.commit('set_reason', getReason?.reason);
            // this.$store.commit('set_platform', getPlatform?.name);
              this.set_reason(getReason?.reason)
                this.set_platform(getPlatform?.name)
        } catch (error) {
            console.log('error', error);
        }
    }
}
</script>
 
<style lang="less" scoped >
.app-use-status {
    .absolute(8%,_,_,50%);
    z-index: 9999;
    width: 800px;
    padding: 10px 10px 10px 25px;
    .flex(flex-start);
    border-radius: 5px;
    box-shadow: @shadow-1-down;
    transform: translate(-50%);

    .reason {
        padding-left: 10px;
    }

    .el-icon-warning {
        position: absolute;
        left: 13px;
        color: #e6a23c;
    }

    .el-icon-close {
        position: absolute;
        right: 13px;
        cursor: pointer;
    }
}
</style>