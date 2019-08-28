import { RulePreview } from '@/main';
import React from 'react';
import ReactDom from 'react-dom';

ReactDom.render(
	<RulePreview>
		<RulePreview.RuleView />
		<RulePreview.RuleConfig />
	</RulePreview>,
	document.getElementById('app')
);