import {  App, Plugin, PluginSettingTab, Setting, MarkdownPostProcessorContext, MarkdownRenderer, Notice, TFile } from 'obsidian';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import * as antd from 'antd';
// import * as charts from '@ant-design/charts';
import * as Babel from '@babel/standalone';
const fs = require('fs');
const path = require('path');

import Nav from './components/Nav';
import CodeTab from './components/Tabs';

interface SaveFolderSettings {
  folder: string;
}

const DEFAULT_SETTINGS: SaveFolderSettings = {
  folder: '',
};

const { useState } = React;
const useLocalStorage = (key: string) => {
  const value = window.localStorage.getItem(key) || '';
  const [content, setContent] = useState(value);
  const setContentToLocalStorage = (data: string) => {
    window.localStorage.setItem(key, data);
    setContent(data);
  }
  return [content, setContentToLocalStorage];
}

export default class Antd extends Plugin {
  settings: SaveFolderSettings;
  async onload() {
    await this.loadSettings();
    // @ts-ignore
    window.React = React;
    // @ts-ignore
    window.ReactDOM = ReactDOM;
    // @ts-ignore
    window.antd = antd;
    // @ts-ignore
    // window.charts = charts;
    // @ts-ignore
    window.components = {}
    // @ts-ignore
    window.components.Nav = Nav;
    // @ts-ignore
    window.components.CodeTab = CodeTab;
    // @ts-ignore
    window.renderMarkdown = async (source: string) => {
      const tempEl = createDiv();
      await MarkdownRenderer.renderMarkdown(source, tempEl, '.', null);
      return tempEl.innerHTML;
    };
    // @ts-ignore
    window.useLocalStorage = useLocalStorage;

    const createFolder = (folder: string) => {
      // @ts-ignore
      // 获得当前 valut 所在的根路径，然后递归创建文件夹
      const root = this.app.vault.adapter.basePath;
      const folderPath = path.join(root, folder);
      if (!fs.existsSync(folderPath)) {
        const folders = folder.split('/');
        
        let currentPath = root;
        for (let i = 0; i < folders.length; i++) {
          currentPath = path.join(currentPath, folders[i]);
          if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath);
          }
        }
      }
    }

    const useFile = (fileName: string) => {
      createFolder(this.settings.folder);
      // @ts-ignore
      const filePath = path.join(this.app.vault.adapter.basePath, this.settings.folder, fileName);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '');
      }	
    
      const [content, setContent] = useState(fs.readFileSync(filePath, 'utf-8'));
      const setContentToFile = (data: string) => {
        fs.writeFileSync(filePath, data);
        setContent(data);
      }
    
      return [content, setContentToFile];
    }
    // @ts-ignore
    window.useFile = useFile;

    this.registerMarkdownCodeBlockProcessor('antd', (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {					
      const sourceScript = this.transpileCode(source);
      const evalScript = `
        (async () => {
          ${sourceScript}
        })()
      `
      // @ts-nocheck
      eval(evalScript);
    });

    // this.registerMarkdownCodeBlockProcessor('antd-charts', (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
    //   const sourceScript = this.transpileCode(source);
    //   const evalScript = `
    //     (async () => {
    //       ${sourceScript}
    //     })()
    //   `
    //   eval(evalScript);
    // });

    this.addSettingTab(new AntdSettingTab(this.app, this));
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

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class AntdSettingTab extends PluginSettingTab {
  plugin: Antd;

  constructor(app: App, plugin: Antd) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h2', { text: 'Settings for Antd.' });

    new Setting(containerEl)
      .setName('Data Folder To Save')
      .setDesc('It\'s a folder to save data')
      .addText(text => text
        .setPlaceholder('Folder path')
        .setValue(this.plugin.settings.folder)
        .onChange(async (value) => {
          this.plugin.settings.folder = value;
          await this.plugin.saveSettings();
        }));
  }
}

