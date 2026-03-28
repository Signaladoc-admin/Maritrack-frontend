import type { Meta, StoryObj } from "@storybook/react";
import { CardWrapper } from "./card-wrapper";
import { Button } from "./button";

const meta = {
  title: "UI/CardWrapper",
  component: CardWrapper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "destructive", "outline", "ghost"],
    },
    padding: {
      control: "select",
      options: ["none", "sm", "default", "lg"],
    },
  },
} satisfies Meta<typeof CardWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p>This is the content of the card.</p>,
    header: <h3 className="text-lg font-semibold">Card Header</h3>,
    footer: <p className="text-muted-foreground text-sm">Card Footer</p>,
    className: "w-[350px]",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: <p>Primary variant content.</p>,
    header: <h3>Primary Card</h3>,
    className: "w-[350px]",
  },
};

export const WithActionFooter: Story = {
  args: {
    header: <h3 className="text-lg font-semibold">Login</h3>,
    children: <p className="py-2">Please enter your credentials.</p>,
    footer: (
      <div className="flex justify-end gap-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Login</Button>
      </div>
    ),
    className: "w-[350px]",
  },
};
