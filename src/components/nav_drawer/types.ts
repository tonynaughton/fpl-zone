export interface MenuItemType {
  id: string;
  label: string;
  type: "nav" | "auth";
  onClick: () => void;
}
