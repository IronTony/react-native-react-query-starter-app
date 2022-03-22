import { Box } from 'native-base';
import React, { FC } from 'react';

const CSafeAreaView: FC = ({ children }) => {
  return (
    <Box width="100%" height="100%">
      {children}
    </Box>
  );
};

export default CSafeAreaView;
