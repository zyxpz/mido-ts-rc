import { Col, Radio, Row, Table } from 'antd';
import * as React from 'react';
import './RuleConfig.less';

import { configColumns } from '../../util';

interface State {
  lang: string
  dataSource: Array<{}>
}

interface Props { }

export default class RuleConfig extends React.PureComponent<Props, State> {
  public state = {
  	lang: 'ZH',
  	dataSource: []
  };

  public componentDidMount() {
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

  public handleLangChange(e: any) {
  	this.setState({
  		lang: e.target.value
  	});
  }

  public render() {
  	const {
  		lang,
  		dataSource
  	} = this.state;
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
  						<Radio.Group value={lang} onChange={(e) => { this.handleLangChange(e); }}>
  							<Radio.Button value="ZH">中文</Radio.Button>
  							<Radio.Button value="EN">英文</Radio.Button>
  						</Radio.Group>
  					</Col>
  				</Row>
  			</header>
  			<Table dataSource={dataSource} columns={configColumns} pagination={false} />
  		</div>
  	);
  }
}