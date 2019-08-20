import * as React from 'react';
import { render } from 'enzyme';
import Layout from '../index';

describe('<Layout />', () => {
	it('render Layout with Layout', () => {
		const wrapper = render(
			<Layout>
				<Layout.Header>header</Layout.Header>
			</Layout>
		);
		expect(wrapper.text()).toBe('header');
	});
});