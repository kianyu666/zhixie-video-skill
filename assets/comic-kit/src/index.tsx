import React from 'react';
import {AbsoluteFill, Composition, Sequence, registerRoot} from 'remotion';
import {Burst, FolderManual, InkRing, Paper, SelectAndOpen, Stamp, Steps, Title, palette} from './components';

function Film(){
  return <AbsoluteFill>
    <Sequence from={0} durationInFrames={150}>
      <Paper section="一门手艺"/><Title>给 AI 一份<br/><span style={{color:palette.blue}}>可复用的手册</span></Title>
      <FolderManual label="操作手册"/><Stamp>步骤和边界，写在里面</Stamp>
    </Sequence>
    <Sequence from={150} durationInFrames={180}>
      <Paper section="找到对应手册"/><Title>任务来了<br/><span style={{color:palette.blue}}>先找到合适的</span></Title>
      <SelectAndOpen labels={['写稿','剪辑','表格']} selected={1}/><Stamp>选中后，展开说明</Stamp>
    </Sequence>
    <Sequence from={330} durationInFrames={210}>
      <Paper section="逐步执行"/><Title>按照手册<br/><span style={{color:palette.blue}}>一步步完成</span></Title>
      <Steps items={['整理素材','执行剪辑','检查结果']}/><InkRing delay={2}/><Stamp>动作与流程可以按主题替换</Stamp>
    </Sequence>
    {[150,330].map(frame=><Sequence key={frame} from={frame-8} durationInFrames={20}><Burst/></Sequence>)}
  </AbsoluteFill>;
}
registerRoot(()=> <Composition id="ComicDemo" component={Film} width={1080} height={1920} fps={30} durationInFrames={540}/>);
