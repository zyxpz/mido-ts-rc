import { Layout } from '@/main';
import React from 'react';
import ReactDom from 'react-dom';

import './index.less';

const list = [];

for (let index = 0; index < 40; index++) {
	list.push(`main-${index}`);
}

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