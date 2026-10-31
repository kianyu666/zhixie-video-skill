import {bundle} from '@remotion/bundler';
import {openBrowser, selectComposition, renderStill, renderMedia} from '@remotion/renderer';
import {existsSync, mkdirSync} from 'node:fs';
import path from 'node:path';

const browserCandidates = [process.env.COMIC_BROWSER, 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].filter(Boolean);
const browserExecutable=browserCandidates.find(existsSync);
if(!browserExecutable) throw new Error('未找到浏览器；请把 COMIC_BROWSER 设置为 Edge 或 Chrome 可执行文件路径。');
mkdirSync('output',{recursive:true});
const serveUrl=await bundle({entryPoint:path.resolve('src/index.tsx')});
const browser=await openBrowser('chrome',{browserExecutable});
try {
  const composition=await selectComposition({serveUrl,id:'ComicDemo',browserExecutable,puppeteerInstance:browser});
  for(const [name,frame] of [['folder-closed',5],['folder-open',60],['select-before',165],['select-after',220],['manual-open',300],['steps-start',350],['steps-done',480],['transition',330]]){
    await renderStill({serveUrl,composition,frame,output:`output/${name}.png`,browserExecutable,puppeteerInstance:browser});
  }
  if(!process.argv.includes('--stills')) await renderMedia({serveUrl,composition,codec:'h264',outputLocation:'output/智械-漫画动作组件验证.mp4',browserExecutable,puppeteerInstance:browser,concurrency:2,crf:21,pixelFormat:'yuv420p',onProgress:({renderedFrames})=>{if(renderedFrames%120===0&&renderedFrames<540) console.log(`${renderedFrames}/540`);}});
} finally {await browser.close({silent:true});}
