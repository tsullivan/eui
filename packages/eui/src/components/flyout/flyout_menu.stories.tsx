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
import { EuiText } from '../text';
import { EuiSpacer } from '../spacer';
import { EuiFlyoutHeader } from './flyout_header';
import { EuiTitle } from '../title';

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

const InParentAndChildFlyoutRender = () => {
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
          <EuiFlyoutMenu>
            <EuiText size="s">Hello</EuiText>
          </EuiFlyoutMenu>
          <EuiFlyoutHeader>
            <EuiTitle size="m">
              <h2>Parent title</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiText>
              <p>This is the flyout body.</p>
            </EuiText>
            <EuiSpacer />
            <EuiButton onClick={showChildFlyout}>Show Child Flyout</EuiButton>
          </EuiFlyoutBody>

          {isChildFlyoutVisible && (
            <EuiFlyoutChild onClose={closeChildFlyout}>
              <EuiFlyoutMenu title="Child Flyout" />
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
  render: () => <InParentAndChildFlyoutRender />,
};

const WithoutCloseButtonRender = (args: FlyoutMenuStoryArgs) => {
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
          <EuiFlyoutMenu {...args} hideCloseButton title="Menu Bar Title" />
          <EuiFlyoutBody>
            <EuiText>
              <p>This is the flyout body.</p>
            </EuiText>
            <EuiSpacer />
            <EuiButton onClick={closeFlyout}>Close flyout</EuiButton>
          </EuiFlyoutBody>
        </EuiFlyout>
      )}
    </>
  );
};

export const WithoutCloseButton: Story = {
  render: (args) => <WithoutCloseButtonRender {...args} />,
};
