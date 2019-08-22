import * as React from 'react';
import { render } from 'enzyme';
import RulePreview from '../index';

describe('<RulePreview />', () => {
	it('render RulePreview with RulePreview', () => {
		const wrapper = render(<RulePreview />);
		expect(wrapper);
	});
});