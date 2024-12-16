import { IconProp } from "@fortawesome/fontawesome-svg-core";

type MenuOption = {
  label: string;
  icon: IconProp;
  color: string;
  action: (event: React.MouseEvent) => void;
};

export interface IProps {
  options: MenuOption[];
  position: { x: number; y: number };
  onClose: () => void;
}
