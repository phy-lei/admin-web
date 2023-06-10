<script lang="tsx">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';
import ScrollBar from '@/components/ScrollBar/ScrollBar.vue';

export default defineComponent({
  components: {
    ScrollBar,
  },
  setup() {
    const { sidebar } = useAppStore();
    const router = useRouter();
    const isCollapse = computed(() => !sidebar.opened);

    console.log(
      '%c [ isCollapse ]',
      'font-size:13px; background:pink; color:#bf2c9f;',
      isCollapse.value
    );

    const renderMenuItem = (menuList: any) => {
      return menuList.map((item) =>
        !item.hidden ? (
          item.children && item.children.length ? (
            <el-sub-menu
              index={item.path}
              key={item.path}
              v-slots={{
                title: () => (
                  <>
                    <svg-icon name={item?.meta?.icon}></svg-icon>
                    <span>{item?.meta?.title}</span>
                  </>
                ),
                default: () =>
                  item.children && item.children.length ? (
                    renderMenuItem(item.children)
                  ) : (
                    <el-menu-item index={item.path}>
                      <svg-icon name={item?.meta?.icon}></svg-icon>
                      <span>{item?.meta?.title}</span>
                    </el-menu-item>
                  ),
              }}
            ></el-sub-menu>
          ) : (
            <el-menu-item index={item.path}>
              <svg-icon name={item?.meta?.icon}></svg-icon>
              <span>{item?.meta?.title}</span>
            </el-menu-item>
          )
        ) : null
      );
    };

    return () => (
      <div>
        <el-menu
          mode="vertical"
          show-timeout={200}
          collapse={isCollapse.value}
          background-color={'#304156'}
          text-color={'#bfcbd9'}
          active-text-color={'#409EFF'}
          router
          class="el-menu-vertical-demo"
        >
          {renderMenuItem(router.options.routes)}
        </el-menu>
      </div>
    );
  },
});
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px !important;
  min-height: 400px;
}
</style>
