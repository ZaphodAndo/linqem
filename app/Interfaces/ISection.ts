import { ILink } from "./ILink";

export interface ISection {
  title: string;
  description: string;
  links: Array<ILink>;
}
