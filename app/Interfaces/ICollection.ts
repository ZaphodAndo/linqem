import { ISection } from "./ISection";

export interface ICollection {
  collection_id: string;
  created_at: string;
  title: string;
  description: string;
  sections: Array<ISection>;
  user_id: string;
}
