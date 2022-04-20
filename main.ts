import {  Plugin, MarkdownPostProcessorContext, MarkdownRenderer } from 'obsidian';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import * as antd from 'antd';
import * as charts from '@ant-design/charts';
import * as Babel from '@babel/standalone';


export default class Antd extends Plugin {
	async onload() {

		// @ts-ignore
		window.React = React;
		// @ts-ignore
		window.ReactDOM = ReactDOM;
		// @ts-ignore
		window.antd = antd;
		// @ts-ignore
		window.charts = charts;
		// @ts-ignore
		window.renderMarkdown = async (source: string) => {
			const tempEl = createDiv();
			await MarkdownRenderer.renderMarkdown(source, tempEl, '.', null);
			return tempEl.innerHTML;
		};

		this.registerMarkdownCodeBlockProcessor('antd', (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {					
			const sourceScript = this.transpileCode(source);
			const evalScript = `
				(async () => {
					${sourceScript}
				})()
			`
			eval(evalScript);
		});

		this.registerMarkdownCodeBlockProcessor('antd-charts', (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
			const sourceScript = this.transpileCode(source);
			const evalScript = `
				(async () => {
					${sourceScript}
				})()
			`
			eval(evalScript);
		})
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
