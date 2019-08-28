import { Col, Radio, Row, Table } from 'antd';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import './RuleConfig.less';

import { configColumns, lang } from '../../util';

interface State {
	dataSource: Array<{}>,
	columns: any
}

interface Props {
	extParams: {
		language: string
	},
	updata: (params: {}) => void
}

export default class RuleConfig extends React.PureComponent<Props, State> {

	public static propTypes = {
		extParams: PropTypes.object
	}

	public static defaultProps = {
		language: 'ZH'
	}

	public columns: any;
	public state = {
		dataSource: [],
		columns: []
	};

	public componentDidMount() {
		const {
			extParams: {
				language
			}
		} = this.props;

		this.columns = configColumns(language);

		this.setState({
			dataSource: [
				{
					key: '1',
					name: '胡彦斌',
					age: 32,
					address: '西湖区湖底公园1号',
				},
				{
					key: '2',
					name: '胡彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				},
			]
		});
	}

	public UNSAFE_componentWillReceiveProps(nextProps: Props) {
		const {
			extParams: {
				language
			}
		} = this.props;
		if (language !== nextProps.extParams.language) {
			this.columns = configColumns(nextProps.extParams.language);
		}
	}

	public handleLangChange(e: any) {
		const {
			updata
		} = this.props;
		updata({
			language: e.target.value
		});
	}

	public render() {
		const {
			dataSource,
			columns
		} = this.state;
		const {
			extParams: {
				language
			}
		} = this.props;
		return (
			<div className="rule-config-wrap">
				<header className="rule-config-header">
					<Row type="flex" justify="space-between">
						<Col>
							<span className="rule-config-header-left">
								<span> #IF/</span>
								(如果)条件
  						</span>

						</Col>
						<Col>
							<Radio.Group
								value={language}
								onChange={(e) => { this.handleLangChange(e); }}
							>
								<Radio.Button value="ZH">{lang(language).zh}</Radio.Button>
								<Radio.Button value="EN">{lang(language).en}</Radio.Button>
							</Radio.Group>
						</Col>
					</Row>
				</header>
				<Table dataSource={dataSource} columns={this.columns} pagination={false} />
			</div>
		);
	}
}