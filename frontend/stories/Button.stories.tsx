import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '../src/components/Button';
import BackButton from '../src/components/BackButton';
import CopyButton from '../src/components/CopyButton';
import IconButton from '../src/components/IconButton';
import DownloadButton from '../src/components/DownloadButton';
import DeleteButton from '../src/components/DeleteButton';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
);

export const Primary = Template.bind({});
Primary.args = {
  kind: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  kind: 'secondary',
};

export const Back = () => <BackButton>Go back</BackButton>;

export const Copy = () => (
  <CopyButton textToCopy="This is now on your clipboard" />
);

export const Delete = () => <DeleteButton fileId="0" />;

export const Icon = () => <IconButton icon="ant-design:file-twotone" />;

export const Download = () => <DownloadButton url="https://google.fi" />;
