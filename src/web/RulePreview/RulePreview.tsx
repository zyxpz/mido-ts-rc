import * as PropTypes from 'prop-types';
import * as React from 'react';
import './RulePreview.less';

import { RuleContext } from './util';

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
	name: string;
}

export default class RulePreview extends React.Component<Props, Stats> {

	public state = {
		name: 'mxl'
	}

	public handleUpdate = () => (name: string) => {
		this.setState({ name });
	}

	public render() {
		const {
			name
		} = this.state;

		return (
			<RuleContext.Provider value={{
				name,
				updata: this.handleUpdate()
			}}>
				<RuleViewConsumer />
				<RuleConfigConsumer />
			</RuleContext.Provider>
		);
	}
}