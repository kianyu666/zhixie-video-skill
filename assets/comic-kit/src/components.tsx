import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const palette={paper:'#f4efdf',ink:'#171716',blue:'#2d6eae',orange:'#d98d3c'};
const {paper,ink,blue,orange}=palette;
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
export const progress=(frame:number,start:number,end:number)=>interpolate(frame,[start,end],[0,1],clamp);
const font={fontFamily:'Microsoft YaHei, sans-serif',fontWeight:900} as const;

/** 可单独放在每个镜头中。 */
export function Paper(_props:{section:string}){
  return <AbsoluteFill style={{backgroundColor:'#eee8d8',backgroundImage:'radial-gradient(#756c6040 .9px, transparent 1.2px)',backgroundSize:'5px 5px',color:ink,...font}}/>;
}
export function Title({children}:{children:React.ReactNode}){
  return <div style={{position:'absolute',top:190,left:68,right:68,background:paper,border:`6px solid ${ink}`,boxShadow:`10px 10px 0 ${ink}`,padding:'25px 34px',transform:'rotate(-1deg)',...font,fontSize:70,lineHeight:1.27,color:ink}}>{children}</div>;
}
export function Stamp({children,top=1450}:{children:React.ReactNode;top?:number}){
  return <div style={{position:'absolute',top,left:95,background:orange,border:`5px solid ${ink}`,boxShadow:`7px 7px 0 ${ink}`,padding:'15px 24px',transform:'rotate(-2deg)',...font,fontSize:38,color:ink}}>{children}</div>;
}
export function InkRing({delay=0}:{delay?:number}){
  const f=useCurrentFrame(),{fps}=useVideoConfig(); const p=progress(f,delay*fps,(delay+.8)*fps);
  return <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}><path d="M100 850 C68 510 330 408 570 470 C868 425 1010 635 970 900 C1025 1170 762 1378 490 1335 C240 1374 38 1180 100 850" stroke={ink} strokeWidth="7" fill="none" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/></svg>;
}
/** 书页在前后两片文件夹之间运动。 */
export function FolderManual({delay=0,label='操作手册'}:{delay?:number;label?:string}){
  const f=useCurrentFrame(),{fps}=useVideoConfig();const u=progress(f,delay*fps,(delay+1.25)*fps);
  return <svg viewBox="0 0 900 900" style={{position:'absolute',top:500,left:90,width:900,height:900,overflow:'visible'}}>
    <g transform="rotate(-3 450 450)">
      <path d="M90 260 L90 180 Q90 150 120 150 L340 150 L390 205 L790 205 Q820 205 820 240 L820 705 Q820 740 785 740 L125 740 Q90 740 90 705 Z" fill="#1e568c" stroke={ink} strokeWidth="9"/>
      <g transform={`translate(0 ${110-235*u})`}>
        <rect x="224" y="215" width="452" height="420" rx="8" fill={paper} stroke={ink} strokeWidth="9"/>
        <rect x="250" y="244" width="400" height="70" fill={blue}/>
        <text x="450" y="294" textAnchor="middle" fill="white" fontSize="38" style={font}>{label}</text>
        <path d="M275 370 H620 M275 420 H600 M275 470 H620 M275 520 H555" stroke={ink} strokeWidth="9" strokeLinecap="round"/>
        <circle cx="605" cy="558" r="22" fill={orange} stroke={ink} strokeWidth="5"/>
      </g>
      <path d="M93 420 Q93 390 130 390 L782 390 Q815 390 810 420 L770 715 Q765 740 735 740 L145 740 Q115 740 110 715 Z" fill={blue} stroke={ink} strokeWidth="9"/>
      <path d="M155 448 H750" stroke="#94bbdd" strokeWidth="7" opacity=".7"/>
      <rect x="300" y="514" width="300" height="92" fill={paper} stroke={ink} strokeWidth="6"/>
      <text x="450" y="576" textAnchor="middle" fill={ink} fontSize="43" style={font}>SKILL</text>
    </g>
  </svg>;
}

/** 多个候选卡片先出现，焦点移动到选中项，随后手册展开。 */
export function SelectAndOpen({labels=['写稿','剪辑','表格'],selected=1}:{labels?:[string,string,string];selected?:0|1|2}){
  const f=useCurrentFrame(),{fps}=useVideoConfig();const show=progress(f,.3*fps,1.05*fps);const choose=progress(f,1.2*fps,2.3*fps);const open=progress(f,2.7*fps,3.45*fps);
  const xs=[40,310,580], sx=xs[selected]; const pointerX=progress(f,1.1*fps,2.1*fps)*sx+120;
  return <svg viewBox="0 0 900 870" style={{position:'absolute',left:90,top:515,width:900,height:870,overflow:'visible'}}>
    {labels.map((label,i)=><g key={label} transform={`translate(${xs[i]},${120+(1-show)*(i%2?160:-160)})`} opacity={i===selected?1:1-open*.62}>
      <rect x="10" y="10" width="250" height="285" fill={ink}/><rect width="250" height="285" fill={i===selected&&choose>.75?blue:paper} stroke={ink} strokeWidth="8"/>
      <rect x="35" y="40" width="180" height="115" fill={i===selected&&choose>.75?paper:blue}/>
      <path d="M58 77 H190 M58 103 H170 M58 128 H190" stroke={i===selected&&choose>.75?blue:paper} strokeWidth="8"/>
      <text x="125" y="225" textAnchor="middle" fontSize="46" fill={i===selected&&choose>.75?'white':ink} style={font}>{label}</text>
    </g>)}
    <g transform={`translate(${pointerX},${430-65*choose})`} opacity={1-open}>
      <path d="M0 0 L0 100 L28 76 L48 118 L70 108 L50 65 L90 65 Z" fill={orange} stroke={ink} strokeWidth="7"/>
    </g>
    <g transform={`translate(75 ${490-75*open}) scale(${.78+.22*open})`} opacity={open}>
      <path d="M0 35 Q190 -20 375 60 Q560 -20 750 35 L750 355 Q560 290 375 370 Q190 290 0 355 Z" fill={paper} stroke={ink} strokeWidth="9"/>
      <path d="M375 60 V370" fill="none" stroke={ink} strokeWidth="8"/>
      <path d="M45 108 H320 M45 155 H320 M45 205 H285 M430 108 H700 M430 155 H700 M430 205 H655" stroke={blue} strokeWidth="12" strokeLinecap="round"/>
      <circle cx="590" cy="275" r="33" fill={orange} stroke={ink} strokeWidth="6"/>
    </g>
  </svg>;
}

/** 手册中的三项流程按顺序打勾，横向进度条同步推进。 */
export function Steps({items=['整理素材','执行任务','检查结果']}:{items?:[string,string,string]}){
  const f=useCurrentFrame(),{fps}=useVideoConfig();
  return <svg viewBox="0 0 900 850" style={{position:'absolute',left:90,top:510,width:900,height:850,overflow:'visible'}}>
    <g transform="rotate(2 450 420)"><rect x="125" y="45" width="660" height="735" fill={ink}/><rect x="110" y="30" width="660" height="735" fill={paper} stroke={ink} strokeWidth="9"/>
      <rect x="110" y="30" width="660" height="110" fill={blue} stroke={ink} strokeWidth="9"/><text x="440" y="103" textAnchor="middle" fontSize="44" fill="white" style={font}>按手册完成任务</text>
      {items.map((item,i)=>{const p=progress(f,(.8+i*1.1)*fps,(1.3+i*1.1)*fps);return <g key={item} transform={`translate(165 ${200+i*145})`}>
        <rect x="0" y="0" width="82" height="82" fill={p>.5?orange:paper} stroke={ink} strokeWidth="7"/>
        <path d="M18 42 L34 58 L67 20" fill="none" stroke={ink} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/>
        <text x="112" y="58" fill={ink} fontSize="43" style={font}>{item}</text>
        <path d="M112 82 H500" stroke={ink} strokeWidth="3" opacity=".3"/>
      </g>})}
      <rect x="165" y="665" width="520" height="25" fill="#c7c1b1" stroke={ink} strokeWidth="4"/><rect x="165" y="665" width={520*progress(f,.8*fps,3.5*fps)} height="25" fill={blue}/>
    </g>
  </svg>;
}
export function Burst(){const f=useCurrentFrame(),{fps}=useVideoConfig();const duration=.65*fps;const alpha=interpolate(f,[0,.16*fps,.38*fps,duration],[0,1,1,0],clamp), p=progress(f,0,.26*fps);const pts=Array.from({length:24},(_,i)=>{const a=i*Math.PI/12,r=i%2?330:1400;return `${540+Math.cos(a)*r},${960+Math.sin(a)*r}`}).join(' ');
  return <AbsoluteFill style={{opacity:alpha,transform:`scale(${.25+.75*p})`,pointerEvents:'none'}}><svg viewBox="0 0 1080 1920" width="100%" height="100%"><polygon points={pts} fill={orange} stroke={ink} strokeWidth="13"/><polygon points={pts} fill={paper} stroke={ink} strokeWidth="10" transform="translate(70 150) scale(.87)"/></svg></AbsoluteFill>;
}
