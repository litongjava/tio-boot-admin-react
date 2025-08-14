// 创建一个新文件：components/common/TooltipButton.tsx
import type { ButtonProps, TooltipProps } from 'antd';
import { Button, Tooltip } from 'antd';
import React, { forwardRef } from 'react';

interface TooltipButtonProps extends ButtonProps {
  tooltipProps?: TooltipProps;
  switchStatus?: boolean;
  tooltipTitle?: React.ReactNode;
  tooltipSwitchTitle?: React.ReactNode;
}

// 使用 forwardRef 确保 ref 正确传递
const TooltipButton = forwardRef<HTMLButtonElement, TooltipButtonProps>(
  (
    { tooltipProps, switchStatus = true, tooltipTitle, tooltipSwitchTitle, ...buttonProps },
    ref,
  ) => {
    const buttonElement = <Button ref={ref} {...buttonProps} />;

    if (tooltipTitle || tooltipProps) {
      return (
        <Tooltip title={switchStatus ? tooltipTitle : tooltipSwitchTitle} {...tooltipProps}>
          {buttonElement}
        </Tooltip>
      );
    }

    return buttonElement;
  },
);

TooltipButton.displayName = 'TooltipButton';

export default TooltipButton;
