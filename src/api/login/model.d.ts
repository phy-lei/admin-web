export interface ReqParams {
  lqbUsername: string;
  lqbPasswd: string;
}

export interface UserVO {
  lqbId: number;
  lqbUsername: string;
  lqbNickName: string;
  lqbAddress: string;
  lqbGender: number;
  lqbNation: string;
  lqbPolitical: string;
  lqbMarital: string;
  lqbIcon: string;
  lqbEmail: string;
  lqbLoginTime: string;
  lqbMobile: string;
  lqbMobileTwo: string;
  lqbTelephone: string;
  lqbUserStatus: number;
  lqbSource: number;
  lqbAdmin: number;
  lqbJobNeture?: any;
  lqbJobStatus: number;
  lqbOrderNum: number;
  lqbPlatformId: number;
  lqbPlatformName: string;
  departments: any[];
  menuList: any[];
  positionList: any[];
  roleList: any[];
  resourceList: any[];
  filterList?: any;
}
export interface LoginDto {
  tokenName: string;
  tokenValue: string;
  loginDevice: string;
  userVO: UserVO;
}



