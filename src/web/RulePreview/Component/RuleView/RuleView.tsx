import * as React from 'react';

import { ContextProps } from '../../util';

interface States { }

export default class RuleView extends React.PureComponent<ContextProps, States> {

	public state = {}

	public handleClick() {
		const {
			updata
		} = this.props;
		updata('ch');
	}

	public render() {
		const {
			name,
		} = this.props;
		return (
			<div onClick={() => { this.handleClick(); }}>
				{name}
			</div>
		);
	}

}