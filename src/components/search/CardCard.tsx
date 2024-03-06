import * as React from 'react';
import { CardProps } from "@yext/search-ui-react";
import { getRelativePrefixToRootFromPath } from '@yext/pages/*';

export interface CardCardProps {
    id: string;
    name: string;
    slug: string;
    c_roles: Array<string>;
  }

export default function CardCard({ result }: CardProps<CardCardProps>) {
    const {
        id,
        name,
        slug,
        c_roles,
    } = result.rawData;

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
  