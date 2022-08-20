import CToaster from '@components/CToaster';
import { Toast } from 'native-base';
import * as React from 'react';

// export const onCloseToast = ({ toastId }: { toastId: string }) => {
//   Toast.close(toastId);
// };

export const onOpenToast = ({
  status,
  message,
}: {
  status: 'info' | 'warning' | 'success' | 'error' | undefined;
  message: string | undefined;
}) => {
  Toast.show({
    render: () => <CToaster status={status} title={message} />,
    placement: 'top',
    // onCloseComplete: () => noop,
    duration: 5000,
  });
};
