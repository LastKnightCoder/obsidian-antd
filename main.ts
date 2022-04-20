import {  Plugin, MarkdownPostProcessorContext } from 'obsidian';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import * as antd from 'antd';
import * as Babel from '@babel/standalone';


export default class Antd extends Plugin {
	async onload() {

		// @ts-ignore
		window.antd = antd;
		// @ts-ignore
		window.React = React;
		// @ts-ignore
		window.ReactDOM = ReactDOM;

		this.registerMarkdownCodeBlockProcessor('antd', (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {					
			eval(this.transpileCode(source));
		});
	}

	transpileCode(content: string) {
		return Babel.transform(content, {
				presets: [
						Babel.availablePresets['react'],
						[
								Babel.availablePresets['typescript'],
								{
										onlyRemoveTypeImports: true,
										allExtensions: true,
										isTSX: true
								}
						]
				]
		}).code;
	}

	onunload() {

	}

}
