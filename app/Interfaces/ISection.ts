import { ILink } from "./ILink";

export interface ISection {
  id: string;
  title: string;
  links: Array<ILink>;
}
