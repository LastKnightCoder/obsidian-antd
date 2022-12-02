import { App, Plugin, PluginSettingTab, Setting, MarkdownPostProcessorContext, MarkdownRenderer, TFile } from 'obsidian';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import * as antd from 'antd';
import * as charts from '@ant-design/charts';
import * as Babel from '@babel/standalone';

import Nav from './components/Nav';
import CodeTab from './components/CodeTab';

import './components/popover';
import './components/artnav';

interface SaveFolderSettings {
  folder: string;
}

const DEFAULT_SETTINGS: SaveFolderSettings = {
  folder: '.data',
};

const { useState, useEffect } = React;
const useLocalStorage = (key: string, initValue: string = '') => {
  const value = window.localStorage.getItem(key) || '';
  const [content, setContent] = useState(value || initValue);
  const setContentToLocalStorage = (data: string) => {
    window.localStorage.setItem(key, data);
    setContent(data);
  }
  return [content, setContentToLocalStorage];
}

export default class Antd extends Plugin {
  settings: SaveFolderSettings;
  async onload() {
    this.app.workspace.onLayoutReady(() => {
      const source = `
        DOMPurify.setConfig({
          ALLOW_UNKNOWN_PROTOCOLS: !0,
          RETURN_DOM_FRAGMENT: !0,
          FORBID_TAGS: ["style"],
          ADD_TAGS: ["xt-popover", "xt-artnav"],
          ADD_ATTR: ["content", "placement", "noPrev", "prev", "noNext", "next"]
        });
      `
      const script = document.createElement("script");
      script.textContent = source;
      (document.head || document.documentElement).appendChild(script);
    });

    await this.loadSettings();
    // @ts-ignore
    window.React = React;
    // @ts-ignore
    window.ReactDOM = ReactDOM;
    // @ts-ignore
    window.antd = antd;
    //@ts-ignore
    window.charts = charts;
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

    const useFile = (fileName: string, initValue: string = '') => {
      const [content, setContent] = useState<string>('');
      const [file, setFile] = useState<TFile>(null);

      const setContentToFile = (data: string) => {
        setContent(data);
        this.app.vault.modify(file, data);
      }

      useEffect(() => {
        (async () => {
          try {
            await this.app.vault.createFolder(this.settings.folder);
          } catch (e) {
            if (e.message !== 'Folder already exists.') {
              console.error(e);
            }
          }

          let file: TFile;
          const files = this.app.vault.getFiles();
          for (let i = 0; i < files.length; i++) {
            if (files[i].path === `${this.settings.folder}/${fileName}`) {
              file = files[i];
              break;
            }
          }
          if (!file) {
            file = await this.app.vault.create(`${this.settings.folder}/${fileName}`, initValue);
          }
          setFile(file);

          const data = await this.app.vault.read(file);
          setContent(data);
          this.app.vault.modify(file, data);
        })()
      }, []);

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

    this.registerMarkdownCodeBlockProcessor('antd-charts', (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
      const sourceScript = this.transpileCode(source);
      const evalScript = `
        (async () => {
          ${sourceScript}
        })()
      `
      eval(evalScript);
    });

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

