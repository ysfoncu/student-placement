import React, {type ReactNode} from 'react';
import {HcAuthProvider} from '@site/src/contexts/HcAuthContext';

export default function Root({children}: {children: ReactNode}): ReactNode {
  return <HcAuthProvider>{children}</HcAuthProvider>;
}
