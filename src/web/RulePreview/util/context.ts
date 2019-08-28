import * as React from 'react';

export interface ContextProps {
  view?: boolean;
  updata: (params: {}) => void;
  parentProps?: any;
  extParams?: any
}

const contextProps = {
	view: true,
	updata: () => null
};

export const RuleContext = React.createContext<ContextProps>(contextProps);