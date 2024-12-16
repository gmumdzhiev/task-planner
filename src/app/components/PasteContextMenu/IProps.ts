export interface IProps {
  position: { x: number; y: number };
  onPaste: (event: React.MouseEvent) => void;
  onClose: () => void;
}
