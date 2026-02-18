import React from "react";
import { H3, P } from "./typography";

export default function CardHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8 flex flex-col gap-y-2">
      <H3 variant="primary" className="mb-0!">
        {title}
      </H3>
      <P className="mt-0!">{description}</P>
    </div>
  );
}
