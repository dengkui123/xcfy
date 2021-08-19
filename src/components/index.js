import HeaderBar from './HeaderBar';
import FooterBar from './FooterBar';
import SideMenu from './SideMenu';
import SvgIcon from './SvgIcon';
import UserMenu from './UserMenu';
import FollowMenu from './FollowMenu';
import LoginDialog from './LoginDialog';
import NoData from './NoData';

const components = {
  HeaderBar,
  FooterBar,
  SideMenu,
  SvgIcon,
  UserMenu,
  FollowMenu,
  LoginDialog,
  NoData,
};

const install = (Vue) => {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key]);
  });
};

const GlobalComponents = {
  install,
};

export default GlobalComponents;
