import { ILink } from "./ILink";
import { ISection } from "./ISection";

export interface ICollection {
  collection_id: string;
  created_at: string;
  title: string;
  description: string;
  links: Array<ILink>;
  sections: Array<ISection>;
  user_id: string;
}
