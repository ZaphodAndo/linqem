import { json } from "@remix-run/cloudflare";
import { redirect, Form } from "@remix-run/react";
import { useReducer } from "react";
import { getSession } from "~/session.server";
import { createCollection } from "~/models/collections.server";
import { Section } from "~/routes/_app.create/section";
import { sectionsReducer } from "~/routes/_app.create/sectionsReducer";
import { Icon } from "~/components/icon/icon";
import { IconDefinition } from "~/components/icon/IconDefinition";

import type {
  MetaFunction,
  LinksFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs
} from "@remix-run/cloudflare";
import type { ISection } from "~/Interfaces/ISection";

import styles from "~/styles/create.css?url";

export const meta: MetaFunction = () => {
  return [
    { title: "Linqem - Create" },
    {
      name: "description",
      content:
        "Create a new collection of links on Linqem an elegant link aggregation repository for the web."
    }
  ];
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));
  if (!session.has("userId")) return redirect("/");
  return json({});
}

export async function action({ context, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const sections = formData.get("sections") as string;

  const session = await getSession(request.headers.get("cookie"));
  const userId = session.get("userId");

  if (userId === undefined) {
    return json({
      error: "Failed to create collection!"
    });
  }

  const collectionId = await createCollection(title, description, sections, userId, context);

  if (collectionId === null) {
    return json({
      error: "Failed to create collection!"
    });
  }

  return redirect(`/view/${collectionId}`);
}

export default function Create() {
  const [sections, dispatch] = useReducer(sectionsReducer, []);

  function handleAddSection() {
    dispatch({
      type: "added"
    });
  }

  function handleUpdateSection(section: ISection) {
    dispatch({
      type: "updated",
      section: section
    });
  }

  return (
    <main>
      <Form method="post">
        <div className="collection-section">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" required placeholder="untitled collection" />

          <label htmlFor="description">Description</label>
          <input id="description" name="description" placeholder="describe me..." />
        </div>

        {sections.map((section, key) => {
          return <Section key={key} section={section} onUpdateSection={handleUpdateSection} />;
        })}

        <div className="add-section">
          <button className="add-button" type="button" onClick={handleAddSection}>
            <Icon id={IconDefinition.Plus} />
            Add section
          </button>
        </div>

        <input type="hidden" name="sections" value={JSON.stringify(sections)} />
        <button className="create-button" type="submit">
          Create
        </button>
      </Form>
    </main>
  );
}
