import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-input/lib/index';

export default {
  title: 'Inputs/Input',
  component: 'uui-input',
  args: {
    value: '',
    label: 'Label',
    placeholder: 'Placeholder',
  },
  argTypes: {
    type: {
      options: [
        'text',
        'tel',
        'url',
        'email',
        'password',
        'date',
        'month',
        'week',
        'time',
        'datetime-local',
        'number',
        'color',
      ],
    },
  },
};

const Template: Story = props =>
  html`
    <uui-input
      .disabled=${props.disabled}
      .error=${props.error}
      .hideLabel=${props.hideLabel}
      .label=${props.label}
      .type=${props.type}
      .name=${props.name}
      .placeholder=${props.placeholder}
      .value=${props.value}></uui-input>
  `;

export const Overview = Template.bind({});
Overview.args = { type: 'text', hideLabel: false };

export const Label = Template.bind({});
Label.args = { type: 'text', hideLabel: false };
Label.parameters = {
  controls: { include: ['type', 'value', 'label', 'hideLabel'] },
};

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };
Disabled.parameters = { controls: { include: ['disabled', 'type', 'value'] } };

export const Error = Template.bind({});
Error.args = { error: true, label: 'Error' };
Error.parameters = { controls: { include: ['error', 'type', 'value'] } };
