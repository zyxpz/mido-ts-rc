import { Layout } from '@/main';
import React from 'react';
import ReactDom from 'react-dom';

import './index.less';

const list = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9,
	1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9
];

ReactDom.render(
	<Layout>
		<Layout.Header className="basic-header" />
		<Layout.Content style={{ backgroundColor: 'yellow' }}>
			{list.map((item, key) => {
				return <div key={key}>{item}</div>;
			})}
		</Layout.Content>
		<Layout.Footer style={{ backgroundColor: 'green' }} />
	</Layout>,
	document.getElementById('app')
);