import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'; // svg组件

const requireAll = (requireContext) => {
  console.log('%c [ requireContext ]', 'font-size:13px; background:pink; color:#bf2c9f;', Object.keys(requireContext));

  return Object.keys(requireContext)
};

const req = import.meta.glob('./svg/*.svg', { eager: true });


export default function install(app) {
  app.component('svg-icon', SvgIcon);
  requireAll(req);
}
