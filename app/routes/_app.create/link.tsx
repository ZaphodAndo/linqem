import { useEffect, useState } from "react";

import type { ChangeEvent } from "react";
import type { ILink } from "~/Interfaces/ILink";

type LinkProps = {
  link: ILink;
  onUpdateLink: (id: string, title: string, url: string) => void;
};

export function Link({ link, onUpdateLink }: LinkProps) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    onUpdateLink(link.id, title, url);
  }, [url, title]);

  const updateUrl = (event: ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.currentTarget.value.trim();
    setUrl(newUrl);
  };

  const updateTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.currentTarget.value;
    setTitle(newTitle);
  };

  return (
    <div className="link">
      <input
        type="text"
        required
        placeholder="untitled link"
        onChange={updateTitle}
        value={title}
      />
      <input
        type="url"
        required
        placeholder="https://www.example.com/"
        onChange={updateUrl}
        value={url}
      />
    </div>
  );
}
