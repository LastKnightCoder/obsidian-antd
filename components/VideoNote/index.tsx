import * as React from "react";
import * as ReactDOM from 'react-dom/client';
import ReactPlayer from 'react-player';

// @ts-ignore
import MilkDownEditor from '../MilkDownEditor';

const { useState } = React;

interface IVideoNoteProps {
  url: string;
}

const VideoNote = (props: IVideoNoteProps) => {
  const defaultState = {
    url: props.url,
    content: '',
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false
  }
  const [state, setState] = useState(defaultState);

  const handleUpdate = (content: string) => {
    console.log('content: ', content);
    setState({
      ...state,
      content
    })
  }

  return <MilkDownEditor content='# Hello World!' onUpdate={handleUpdate} />
}

export default VideoNote;
