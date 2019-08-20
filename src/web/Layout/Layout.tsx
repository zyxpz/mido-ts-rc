import * as PropTypes from 'prop-types';
import * as React from 'react';
import './Layout.less';

// contextProps
interface LayoutContextProps {
	siderHook: {}
}

// 创建context
const LayoutContext = React.createContext<LayoutContextProps>({
	siderHook: {},
});

// 业务标签porps
interface GeneratorProps {
	tagName: 'header' | 'footer' | 'main' | 'section';
	clsTagName?: string;
}

// 业务标签获取props
interface BasicProps extends React.HTMLAttributes<HTMLDivElement> {

}

// 合并标签业务
interface BasicPropsTagName extends BasicProps {
	tagName: 'header' | 'footer' | 'main' | 'section';
	className: string,
	clsTagName: string,
}

// 构建业务树
const generator = ({ tagName }: GeneratorProps) =>
	(BasicComponent: any) =>
		class Adapter extends React.Component<BasicProps, any> {
			static Header: any;

			static Footer: any;

			static Content: any;

			renderComponent = () => {
				return <BasicComponent tagName={tagName} {...this.props} />;
			};

			render() {
				return <LayoutContext.Consumer>{this.renderComponent}</LayoutContext.Consumer>;
			}
		};

// 构建业务
const Basic = (props: BasicPropsTagName) => {
	const {
		className: clsName,
		tagName,
		children,
		...others
	} = props;

	return React.createElement(tagName, {
		className: `mido-layout-wrap-${tagName} ${clsName || ''}`,
		...others
	},
	children || tagName
	);
};

// 主题树
interface BasicLayoutState { }

// 构建主体树
class BasicLayout extends React.Component<BasicPropsTagName, BasicLayoutState> {

	public static defaultProps = {
		tagName: 'section',
		clsTagName: 'mido-layout-wrap'
	}

	public static propTypes = {
		tagName: PropTypes.string,
		clsTagName: PropTypes.string
	}

	public state = {}

	public render() {
		const {
			clsTagName,
			tagName: Tag,
			children,
			...others
		} = this.props;

		return (
			<LayoutContext.Provider value={{ siderHook: {} }}>
				<Tag className={`${clsTagName}`} {...others}>
					{children}
				</Tag>
			</LayoutContext.Provider>
		);
	}
}

const Layout: React.ComponentClass<BasicProps> & {
	Header: React.ComponentClass<BasicProps>;
	Footer: React.ComponentClass<BasicProps>;
	Content: React.ComponentClass<BasicProps>;
} = generator({
	tagName: 'section',
	clsTagName: 'mido-layout-wrap'
})(BasicLayout);

Layout.Header = generator({ tagName: 'header' })(Basic);

Layout.Content = generator({ tagName: 'main' })(Basic);

Layout.Footer = generator({ tagName: 'footer' })(Basic);

export default Layout;