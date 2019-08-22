import * as React from 'react';

interface Props {
  name?: string
}

interface States { }

export default class RuleView extends React.PureComponent<Props, States> {

  public state = {}

  public componentDidMount() {
  	console.log(this.props);
  }

  public handleClick() {
  	console.log(this.props);
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