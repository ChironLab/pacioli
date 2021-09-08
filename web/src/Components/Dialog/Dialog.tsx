import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

type Props = {
  isModalOpen: boolean;
  toggleModal: () => void;
  children: JSX.Element | JSX.Element[];
  title: string;
};

const ResponsiveDialog = ({
  isModalOpen,
  toggleModal,
  title,
  children,
}: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isModalOpen}
      onClose={toggleModal}
      aria-labelledby='dialog-title'
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default ResponsiveDialog;
