import * as PropTypes from 'prop-types';
import * as React from 'react';
import './RulePreview.less';

import { RuleContext } from './util';

import { RuleConfig, RuleView } from './Component';

// context 转化props
const RuleConfigConsumer = (props: any) =>
	<RuleContext.Consumer>
		{context => <RuleConfig {...context} {...props} />}
	</RuleContext.Consumer>;


const RuleViewConsumer = (props: any) =>
	<RuleContext.Consumer>{
		context => <RuleView {...context} {...props} />
	}
	</RuleContext.Consumer>;

/**
 * defaultData  默认数据
 * view 是否展示预览 默认展示
 */
interface Props {
	defaultData?: any;
	view?: boolean;
}

interface Stats {
	view?: boolean;
	defaultData: any,
	language: string
}

export default class RulePreview extends React.Component<Props, Stats> {

	public static RuleView: any;

	public static RuleConfig: any;

	public static defaultProps = {
		defalutData: {},
		view: true
	}

	public static propTypes = {
		defalutData: PropTypes.any,
		view: PropTypes.bool
	}

	public state = {
		view: true,
		defaultData: {},
		language: 'ZH'
	}

	public componentDidMount() {
		const {
			view,
			defaultData
		} = this.props;

		this.setState({ view,
			defaultData });
	}

	public handleUpdate = () => (params: {}) => {
		this.setState({ ...params });
	}

	public render() {
		const {
			view,
			defaultData,
			language
		} = this.state;
		const {
			children,
		} = this.props;
		return (
			<RuleContext.Provider value={{
				view,
				updata: this.handleUpdate(),
				parentProps: { defaultData },
				extParams: { language }
			}}>
				{children}
			</RuleContext.Provider>
		);
	}
}

RulePreview.RuleView = RuleViewConsumer;

RulePreview.RuleConfig = RuleConfigConsumer;