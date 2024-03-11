import { CardProps } from "@yext/search-ui-react";
import { getRelativePrefixToRootFromPath } from "@yext/pages/*";

export interface BoardCardProps {
  id: string;
  name: string;
  slug: string;
  c_roles: Array<string>;
  relativePrefixToRoot?: string;
}

export default function BoardCard({ result }: CardProps<BoardCardProps>) {
  const { id, name, slug, c_roles, relativePrefixToRoot } = result.rawData;

  return (
    <div key={id}>
      <a href={slug}>
        <div className="border rounded-md shadow-sm p-5 font-semibold hover:shadow-md">
          {name}
        </div>
      </a>
    </div>
  );
}
