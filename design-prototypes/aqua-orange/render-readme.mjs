import fs from 'node:fs';
import {makeBadge} from '/tmp/profile-preview-tools/node_modules/badge-maker/lib/index.js';
import * as icons from '/tmp/profile-preview-tools/node_modules/simple-icons/index.mjs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {marked}=await import('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/marked/lib/marked.esm.js');
const root='/workspace/AsherFerdinand/design-prototypes/aqua-orange';const out=root+'/previews';fs.mkdirSync(out,{recursive:true});
let html=marked.parse(fs.readFileSync(root+'/README.md','utf8'));
const toData=s=>'data:image/svg+xml;base64,'+Buffer.from(s).toString('base64');
const available=Object.values(icons).filter(i=>i&&i.slug);let count=0;
html=html.replace(/src="([^"]+)"/g,(_,src)=>{
 if(src.startsWith('https://img.shields.io/')){
  const u=new URL(src.replaceAll('&amp;','&'));const spec=decodeURIComponent(u.pathname.slice('/badge/'.length));const split=spec.lastIndexOf('-');const label=spec.slice(0,split).replaceAll('--','-');const color=spec.slice(split+1);let logoBase64;
  const slug=u.searchParams.get('logo');if(slug){const icon=available.find(i=>i.slug===slug);if(!icon)throw Error('Unknown logo '+slug);const svg=icon.svg.replace('<svg ',`<svg fill="${u.searchParams.get('logoColor')}" `);logoBase64=toData(svg);}
  count++;return `src="${toData(makeBadge({message:label,color:'#'+color,style:'flat',...(logoBase64?{logoBase64}:{})}))}"`;
 }
 return `src="${toData(fs.readFileSync(root+'/'+src,'utf8'))}"`;
});
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
for(const theme of ['light','dark']){
 const page=await browser.newPage({viewport:{width:1040,height:1100},colorScheme:theme});
 await page.setContent(`<style>body{margin:32px auto;padding:0 20px;max-width:940px;font:16px/1.6 -apple-system,BlinkMacSystemFont,Segoe UI,Arial;color:${theme==='dark'?'#e6edf3':'#1f2328'};background:${theme==='dark'?'#0d1117':'#fff'}}a{color:${theme==='dark'?'#4493f8':'#0969da'}}table{width:100%;border-collapse:collapse;margin-bottom:24px}td,th{border:1px solid #8885;padding:16px}h2{border-bottom:1px solid #8885;padding-bottom:8px}img{max-width:100%}sub{font-size:12px}</style>${html}`);
 await page.screenshot({path:`${out}/readme-${theme}.png`,fullPage:true});
 await page.locator('img').first().screenshot({path:`${out}/banner-${theme}.png`});
 const loaded=await page.locator('img').evaluateAll(is=>is.every(i=>i.complete&&i.naturalWidth));if(!loaded)throw Error('Missing preview image');
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:`${out}/mobile-${theme}.png`,fullPage:true});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth))throw Error('Mobile overflow');
 // Check browser-parsed CSS, text safety and theme colours in the actual standalone SVG.
 const svg=fs.readFileSync(root+'/banner-wireframe.svg','utf8');await page.setViewportSize({width:1200,height:320});await page.setContent(svg);
 const report=await page.evaluate(()=>{const rules=document.querySelector('style').sheet.cssRules;return {rules:rules.length,background:getComputedStyle(document.querySelector('.bg')).fill,text:getComputedStyle(document.querySelector('.ink')).fill,boxes:[...document.querySelectorAll('text')].map(t=>{const b=t.getBBox();return {x:b.x,y:b.y,width:b.width,height:b.height}})}});
 console.log(theme,JSON.stringify(report));
 if(report.boxes.some(b=>b.x<0||b.x+b.width>1200||b.y<0||b.y+b.height>420))throw Error('Text extends into motif region');
}
await browser.close();console.log(`PASS: ${count} badges rendered locally using Shields badge-maker; live endpoint validation pending`);
