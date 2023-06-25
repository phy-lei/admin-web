import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'; // svg组件

const requireAll = (requireContext) => {
  return Object.keys(requireContext);
};

const req = import.meta.glob('./svg/*.svg', { eager: true });

export default function install(app) {
  app.component('SvgIcon', SvgIcon);
  requireAll(req);
}
