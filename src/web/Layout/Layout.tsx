import * as PropTypes from 'prop-types';
import * as React from 'react';
import './Layout.less';

interface Props {
  name: string
}

interface Stats {

}

interface ContextProps {

}

interface BasicProps extends Props {
  bgColor?: string,
  color?: string
}

const { Provider, Consumer } = React.createContext<ContextProps>({
	bgColor: 'blue',
	color: 'yellow'
});

const Basic = (props: BasicProps) => {
	const {
		name,
		bgColor,
		color
	} = props;

	return React.createElement(name, {
		style: {
			backageColor: bgColor,
			color,
		}
	},
	name
	);
};

// const BasicLayout = () => class WebView extends React.Component<Props, Stats> {
//   render() {
//     return (

//     )
//   }
// }

export default class Layout extends React.Component<Props, Stats> {

  public static defaultProps = {
  	name: 'Layout'
  }

  public static propTypes = {
  	name: PropTypes.string
  }

  public state = {}

  public render() {
  	const {
  		name
  	} = this.props;
  	return (
  		<div className="Layout">{name}</div>
  	);
  }
}