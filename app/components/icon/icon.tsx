import { IIconProps } from "~/components/icon/interfaces/IIconProps";

export function Icon({ id, ...props }: IIconProps) {
  return (
    <svg {...props}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
}
