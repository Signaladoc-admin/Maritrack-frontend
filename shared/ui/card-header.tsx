import React from "react";
import { H4, P } from "./typography";

export default function CardHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-3">
      <H4 variant="primary">{title}</H4>
      <P>{description}</P>
    </div>
  );
}
