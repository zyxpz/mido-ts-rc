module.exports = function({ types: t }) {
	return {
		visitor: {
			ImportDeclaration(path, source) {
				const {
					opts: {
						libraryName,
						libraryDirectory,
					}
				} = source;
				if (!t.isStringLiteral(path.node.source, { value: libraryName })) {
					return;
				}
				const newImports = path.node.specifiers.map(item => {
					return t.importDeclaration([
						t.importDefaultSpecifier(item.local)], 
					t.stringLiteral(`${libraryDirectory}/${item.local.name}`));
				});
				path.replaceWithMultiple(newImports);
			}
		}
	};
};