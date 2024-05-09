import type { Meta, StoryObj } from '@storybook/react';
import {Hello} from '@scope/example';

const meta = {
  title: 'Example/Hello',
  component: Hello,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
  },
  args: { name: 'string' },
} satisfies Meta<typeof Hello>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: 'Jessica',
  },
};

export const Secondary: Story = {
  args: {
    name: 'Émeraude',
  },
};

export const Tertiary: Story = {
  args: {
    name: 'Anaël',
  },
};
