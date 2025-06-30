/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { LOKI_SELECTORS } from '../../../.storybook/loki';

import { EuiButton } from '../button';
import { EuiFlyout } from './flyout';
import { EuiFlyoutBody } from './flyout_body';
import { EuiFlyoutChild } from './flyout_child';

import { EuiFlyoutMenu, EuiFlyoutMenuProps } from './flyout_menu';

type FlyoutMenuStoryArgs = EuiFlyoutMenuProps & {};

const meta: Meta<FlyoutMenuStoryArgs> = {
  title: 'Layout/EuiFlyout/EuiFlyoutMenu',
  component: EuiFlyoutMenu,
  argTypes: {},
  args: {},
  parameters: {
    docs: {
      description: {
        component: `
## EuiFlyoutMenu

The Flyout menu bar is a horizontal bar that may appear at the top of parent and child EuiFlyouts. It is to be used for actions such as close, share, settings, and back.
        `,
      },
    },
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
};

export default meta;
type Story = StoryObj<FlyoutMenuStoryArgs>;

const WithTitleApp = (args: FlyoutMenuStoryArgs) => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(true);
  const closeFlyout = () => setIsFlyoutVisible(false);
  const showFlyout = () => setIsFlyoutVisible(true);

  return (
    <>
      <EuiButton onClick={showFlyout} disabled={isFlyoutVisible}>
        Show flyout with title
      </EuiButton>

      {isFlyoutVisible && (
        <EuiFlyout onClose={closeFlyout}>
          <EuiFlyoutMenu {...args} title="Menu Bar Title" onClose={closeFlyout}>
            <EuiButton size="s">Controls</EuiButton>
          </EuiFlyoutMenu>
          <EuiFlyoutBody>
            <p>This is the flyout body.</p>
          </EuiFlyoutBody>
        </EuiFlyout>
      )}
    </>
  );
};

export const WithTitle: Story = {
  name: 'With title',
  render: (args) => <WithTitleApp {...args} />,
};

const WithoutTitleApp = (args: FlyoutMenuStoryArgs) => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(true);
  const closeFlyout = () => setIsFlyoutVisible(false);
  const showFlyout = () => setIsFlyoutVisible(true);

  return (
    <>
      <EuiButton onClick={showFlyout} disabled={isFlyoutVisible}>
        Show flyout without title
      </EuiButton>

      {isFlyoutVisible && (
        <EuiFlyout onClose={closeFlyout}>
          <EuiFlyoutMenu {...args} onClose={closeFlyout}>
            <EuiButton size="s">Controls</EuiButton>
          </EuiFlyoutMenu>
          <EuiFlyoutBody>
            <p>This is the flyout body.</p>
          </EuiFlyoutBody>
        </EuiFlyout>
      )}
    </>
  );
};
export const WithoutTitle: Story = {
  name: 'Without title',
  render: (args) => <WithoutTitleApp {...args} />,
};

const WithoutCloseButtonApp = (args: FlyoutMenuStoryArgs) => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(true);
  const closeFlyout = () => setIsFlyoutVisible(false);
  const showFlyout = () => setIsFlyoutVisible(true);

  return (
    <>
      <EuiButton onClick={showFlyout} disabled={isFlyoutVisible}>
        Show flyout without close button
      </EuiButton>

      {isFlyoutVisible && (
        <EuiFlyout onClose={closeFlyout}>
          <EuiFlyoutMenu {...args} hideCloseButton>
            <EuiButton size="s">Controls</EuiButton>
          </EuiFlyoutMenu>
          <EuiFlyoutBody>
            <p>This is the flyout body.</p>
          </EuiFlyoutBody>
        </EuiFlyout>
      )}
    </>
  );
};
export const WithoutCloseButton: Story = {
  name: 'Without close button',
  render: (args) => <WithoutCloseButtonApp {...args} />,
};

const InParentAndChildFlyoutApp = () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(true);
  const [isChildFlyoutVisible, setIsChildFlyoutVisible] = useState(false);

  const closeFlyout = () => setIsFlyoutVisible(false);
  const showFlyout = () => setIsFlyoutVisible(true);

  const closeChildFlyout = () => setIsChildFlyoutVisible(false);
  const showChildFlyout = () => setIsChildFlyoutVisible(true);

  return (
    <>
      <EuiButton onClick={showFlyout} disabled={isFlyoutVisible}>
        Show Flyout
      </EuiButton>

      {isFlyoutVisible && (
        <EuiFlyout onClose={closeFlyout}>
          <EuiFlyoutMenu title="Parent Flyout" onClose={closeFlyout}>
            <EuiButton size="s">Settings</EuiButton>
          </EuiFlyoutMenu>
          <EuiFlyoutBody>
            <p>This is the main flyout body.</p>
            <EuiButton onClick={showChildFlyout}>Show Child Flyout</EuiButton>
          </EuiFlyoutBody>

          {isChildFlyoutVisible && (
            <EuiFlyoutChild onClose={closeChildFlyout}>
              <EuiFlyoutMenu title="Child Flyout" onClose={closeChildFlyout}>
                <EuiButton size="s">Back</EuiButton>
              </EuiFlyoutMenu>
              <EuiFlyoutBody>
                <p>This is the child flyout body.</p>
              </EuiFlyoutBody>
            </EuiFlyoutChild>
          )}
        </EuiFlyout>
      )}
    </>
  );
};
export const InParentAndChildFlyout: Story = {
  name: 'In parent and child flyout',
  render: () => <InParentAndChildFlyoutApp />,
};
