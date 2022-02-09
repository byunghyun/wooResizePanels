import type { NextPage } from 'next'
import { useEffect, useRef } from 'react';
import { WooResizePanels } from '../util/resizePanels';

const Home: NextPage = () => {
  const leftPaneRef = useRef<HTMLDivElement>(null);
  const gutterPaneRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (leftPaneRef.current && gutterPaneRef.current) {
      const wooResizer = WooResizePanels.getInstance(gutterPaneRef.current, leftPaneRef.current);
      wooResizer.initWooResizer();
    }
    return () => {  
      if (leftPaneRef.current && gutterPaneRef.current) {
        const wooResizer = WooResizePanels.getInstance(gutterPaneRef.current, leftPaneRef.current);
        wooResizer.disableWooResizer();
      }
    }
  }, [leftPaneRef, gutterPaneRef]);

  return (    <div className="wrapper">
      <div ref={leftPaneRef} className="pane left">
        This is the left pane.
      </div>
      <div className="pane right">
        This is the right pane.
        <div ref={gutterPaneRef} className="gutter"></div>
      </div>
    </div>
  )
}

export default Home
