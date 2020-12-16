import * as React from 'react';
import { shallow } from 'enzyme';
import ImgPreview from '../index';

describe('<ImgPreview />', () => {
	it('render ImgPreview with ImgPreview', () => {
		const wrapper = shallow(<ImgPreview visible />);
		expect(wrapper);
	});
});