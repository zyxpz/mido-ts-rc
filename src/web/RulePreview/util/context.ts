import * as React from 'react';

export interface ContextProps {
  name?: string;
  updata: (name: string) => void;
}

const contextProps = {
	name: 'mxl',
	updata: () => null
};

export const RuleContext = React.createContext<ContextProps>(contextProps);