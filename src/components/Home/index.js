import React from 'react';
import { Flex } from 'rebass';

import Characters from './characters';
import Deaths from './deaths';

const Homepage = () => {

  return (
    <Flex 
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      width={1}>
      <Deaths />
      <Characters />
    </Flex>
  )
}

export default Homepage;