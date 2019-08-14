import * as React from 'react';
import { shallow } from 'enzyme';
import <%=name%> from '../index';

describe('<<%=name%> />', () => {
	it('render <%=name%> with <%=name%>', () => {
		const wrapper = shallow(<<%=name%> text={"<%=name%>"} />).children();
		expect(wrapper.text()).toBe('<%=name%>');
	});
});