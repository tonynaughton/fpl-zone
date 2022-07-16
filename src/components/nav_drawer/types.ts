interface BaseMenuItem {
  id: string;
  label: string;
  type: "nav" | "auth";
}

interface NavMenuItem extends BaseMenuItem {
  href: string;
}

interface AuthMenuItem extends BaseMenuItem {
  onClick: () => void;
}

export type MenuItemType = NavMenuItem | AuthMenuItem;

export const isNavMenuItem = (item: MenuItemType): item is NavMenuItem => {
  return "href" in item;
};
