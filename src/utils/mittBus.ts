import mitt from '@/hooks/mitt';

type Events = {
  openThemeDrawer: '打开主题配置';
};

const mittBus = mitt<Events>();
export default mittBus;
