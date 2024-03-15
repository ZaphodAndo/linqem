import type { ISection } from "~/Interfaces/ISection";

// eslint-disable-next-line
export function sectionsReducer(sections: Array<ISection>, action: any) {
  switch (action.type) {
    case "added": {
      return [
        ...sections,
        {
          id: crypto.randomUUID(),
          title: "",
          links: []
        }
      ];
    }
    case "updated": {
      return sections.map((section) => {
        if (section.id === action.section.id) {
          return action.section;
        } else {
          return section;
        }
      });
    }
    case "deleted": {
      return sections.filter((section) => section.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
