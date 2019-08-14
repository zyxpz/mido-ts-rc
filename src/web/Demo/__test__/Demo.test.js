import * as React from 'react';
import { shallow } from 'enzyme';
import Demo from '../index';

describe('<Demo />', () => {
	it('render Demo with Demo', () => {
		const wrapper = shallow(<Demo text={"Demo"} />).children();
		expect(wrapper.text()).toBe('Demo');
	});
});