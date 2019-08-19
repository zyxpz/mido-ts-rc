import * as React from 'react';
import { shallow } from 'enzyme';
import Layout from '../index';

describe('<Layout />', () => {
	it('render Layout with Layout', () => {
		const wrapper = shallow(<Layout name={"Layout"} />).children();
		expect(wrapper.text()).toBe('Layout');
	});
});