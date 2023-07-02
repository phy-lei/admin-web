export interface MenuTreeListItemDto {
  lqbId: number;
  lqbMenuName: string;
  lqbMenuCode: string;
  lqbMenuLevel: number;
  lqbOrderNum?: any;
  lqbParentId: number;
  lqbParentName: string;
  lqbPath: string;
  lqbRemark: string;
  lqbWebName: string;
  lqbUrl: string;
  lqbIcon: string;
  lqbHidden: number;
  children: any[];
}

