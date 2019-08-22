import * as PropTypes from 'prop-types';
import * as React from 'react';
import './RulePreview.less';

interface ContextProps {
  name?: string;
  ruleHooks: {
    updata: (name: string) => void
  }

}

const contextProps = {
	name: 'mxl',
	ruleHooks: {
		updata: () => null
	}
};

const RuleContext = React.createContext<ContextProps>(contextProps);

import { RuleConfig, RuleView } from './Component';

// context 转化props
const RuleConfigConsumer = () =>
	<RuleContext.Consumer>
		{context => <RuleConfig {...context} />}
	</RuleContext.Consumer>;


const RuleViewConsumer = () =>
	<RuleContext.Consumer>{
		context => <RuleView {...context} />
	}
	</RuleContext.Consumer>;

interface Props {

}

interface Stats {

}

export default class RulePreview extends React.Component<Props, Stats> {

  public static RuleConfig: any;

  public static RuleView: any;

  public state = {}

  public handleUpdate = () => ({
  	updata: (name: string) => {
  		this.setState({ name });
  	}
  })

  public render() {
  	return (
  		<RuleContext.Provider value={{
  			name: 'mxl',
  			ruleHooks: this.handleUpdate()
  		}}>
  			<RuleViewConsumer />
  			<RuleConfigConsumer />
  		</RuleContext.Provider>
  	);
  }
}