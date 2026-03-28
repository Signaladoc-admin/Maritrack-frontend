import type { Meta, StoryObj } from "@storybook/react";
import { H1, H2, H3, H4, P, Blockquote } from "./typography";

const meta = {
  title: "UI/Typography",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <span className="text-muted-foreground text-xs uppercase">H1</span>
        <H1>Taxonomy of Design</H1>
      </div>
      <div>
        <span className="text-muted-foreground text-xs uppercase">H2</span>
        <H2>The People of the Kingdom</H2>
      </div>
      <div>
        <span className="text-muted-foreground text-xs uppercase">H3</span>
        <H3>The Joker</H3>
      </div>
      <div>
        <span className="text-muted-foreground text-xs uppercase">H4</span>
        <H4>The King</H4>
      </div>
    </div>
  ),
};

export const Paragraph: Story = {
  render: () => (
    <P>
      The king, seeing how much happier his subjects were, realized the error of his ways and
      repealed the joke tax.
    </P>
  ),
};

export const Quote: Story = {
  render: () => <Blockquote>"After all," he said, "everyone enjoys a good laugh."</Blockquote>,
};
