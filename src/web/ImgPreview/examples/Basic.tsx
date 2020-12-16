import { ImgPreview } from '@/main';
import React, { Fragment, useState } from 'react';
import ReactDom from 'react-dom';

const Example = () => {
	const [visible, setVisible] = useState(false);
	const [img, setImg] = useState('');
	return (
		<Fragment>
			<img onClick={(e) => {
				setVisible(true);
				setImg(e.currentTarget.src);
			}} 
			// eslint-disable-next-line
			src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608142421715&di=ab1d72e743d19bec66a0899b65ccbf2d&imgtype=0&src=http%3A%2F%2Fac-q.static.booking.cn%2Fimages%2Fhotel%2Fmax1024x768%2F111%2F111145520.jpg"
			/>

			<ImgPreview 
				visible={visible} 
				imgSrc={img} onTap={(type) => { if (type !== 'doubleTap') {
					setVisible(false);
				} }} />
		</Fragment>
	);
};

ReactDom.render(
	 <Example />,
	document.getElementById('app')
);