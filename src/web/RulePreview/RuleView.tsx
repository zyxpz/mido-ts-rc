import * as React from 'react';

import { ContextProps } from './util';

interface States { }

export default class RuleView extends React.PureComponent<ContextProps, States> {

	public state = {}

	public handleClick() {
		const {
			updata
		} = this.props;
		updata({ view: false });
	}

	public render() {
		const {
			view,
		} = this.props;
		return (
			<React.Fragment>{
				view ?
					<div className="mido-view-wrap">
						<div className="mido-view-wrap-header">
							<div className="title">预览</div>
							<button
								type="button"
								onClick={() => { this.handleClick(); }}
							>关闭</button>
						</div>
						<div className="mido-view-wrap-main">
							main
						</div>
					</div> :
					null
			}</React.Fragment>

		);
	}

}