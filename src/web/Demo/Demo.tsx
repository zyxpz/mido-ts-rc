import * as PropTypes from 'prop-types';
import * as React from 'react';
import './Demo.less';

interface Props {
  text: string
}

interface Stats {
  
}

export default class Demo extends React.Component<Props, Stats> {

  public static defaultProps = {
  	text: 'Demo'
  }

  public static propTypes = {
  	text: PropTypes.string
  }

  public state = {}

  public render() {
  	const {
  		text
  	} = this.props;
  	return (
  		<div className="Demo">{text}</div>
  	);
  }
}