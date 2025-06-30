/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { useEuiFlyoutMenuStyles } from './flyout_menu.styles';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiTitle } from '../title';
import { EuiFlyoutCloseButton } from './_flyout_close_button';
import { useGeneratedHtmlId } from '../../services';

export type EuiFlyoutMenuProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    title?: React.ReactNode;
    onClose?: () => void;
    hideCloseButton?: boolean;
  };

export const EuiFlyoutMenu: FunctionComponent<EuiFlyoutMenuProps> = ({
  children,
  className,
  title,
  onClose,
  hideCloseButton,
  ...rest
}) => {
  const styles = useEuiFlyoutMenuStyles();
  const cssStyles = [styles.euiFlyoutMenu];
  const classes = classNames('euiFlyoutMenu', className);
  const titleId = useGeneratedHtmlId();

  let titleNode;
  if (title) {
    titleNode = (
      <EuiTitle size="xxs" id={titleId}>
        <h3>{title}</h3>
      </EuiTitle>
    );
  }

  const handleClose = () => {
    onClose?.();
  };

  let closeButton;
  if (!hideCloseButton) {
    closeButton = (
      <EuiFlyoutCloseButton
        onClose={handleClose}
        side="right"
        closeButtonPosition="inside"
      />
    );
  }

  return (
    <div className={classes} css={cssStyles} {...rest}>
      <EuiFlexGroup
        alignItems="center"
        justifyContent="spaceBetween"
        gutterSize="m"
        responsive={false}
      >
        <EuiFlexItem>
          <EuiFlexGroup
            alignItems="center"
            gutterSize="m"
            responsive={false}
            wrap
          >
            {titleNode && <EuiFlexItem grow={false}>{titleNode}</EuiFlexItem>}
            {children && <EuiFlexItem grow={false}>{children}</EuiFlexItem>}
          </EuiFlexGroup>
        </EuiFlexItem>
        {closeButton && <EuiFlexItem grow={false}>{closeButton}</EuiFlexItem>}
      </EuiFlexGroup>
    </div>
  );
};
