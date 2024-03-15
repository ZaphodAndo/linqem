import { useEffect, useState } from "react";
import { Link } from "~/routes/_app.create/link";
import { Icon } from "~/components/icon/icon";
import { IconDefinition } from "~/components/icon/IconDefinition";

import type { ChangeEvent } from "react";
import type { ISection } from "~/Interfaces/ISection";
import type { ILink } from "~/Interfaces/ILink";

type SectionProps = {
  section: ISection;
  onUpdateSection: (section: ISection) => void;
};

export function Section({ section, onUpdateSection }: SectionProps) {
  const [title, setTitle] = useState("");
  const [links, setLinks] = useState<Array<ILink>>([]);

  useEffect(() => {
    onUpdateSection({
      id: section.id,
      title: title,
      links: links
    });
  }, [title, links]);

  const updateTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.currentTarget.value;
    setTitle(newTitle);
  };

  const addLink = () => {
    const newLink = {
      id: crypto.randomUUID(),
      title: "Untitled link",
      url: ""
    };

    setLinks([...links, newLink]);
  };

  const updateLink = (id: string, title: string, url: string) => {
    const updatedLinks = links.map((link) => {
      if (link.id === id) {
        link.title = title;
        link.url = url;
        return link;
      } else {
        return link;
      }
    });

    setLinks(updatedLinks);
  };

  return (
    <div className="collection-section">
      <label htmlFor={"section-title-" + section.id}>Section Title</label>
      <input
        id={"section-title-" + section.id}
        type="text"
        required
        placeholder="untitled section"
        onChange={updateTitle}
        value={title}
      />

      <p>Section Links</p>
      {links.map((link, key) => {
        return <Link key={key} link={link} onUpdateLink={updateLink} />;
      })}

      <button className="add-button" type="button" onClick={addLink}>
        <Icon id={IconDefinition.Plus} />
        Add link
      </button>
    </div>
  );
}
