export class WooResizePanels {
  private static gutter: HTMLDivElement;
  private static targets: Array<HTMLDivElement>;
  public static instance: WooResizePanels;
  private constructor (gutter: HTMLDivElement, ...rest: Array<HTMLDivElement>) {
    WooResizePanels.gutter = gutter;
    WooResizePanels.targets = rest;
  }
  public static getInstance = (
      gutter: HTMLDivElement, 
      ...targets: Array<HTMLDivElement>
    ): WooResizePanels => {
      if (!WooResizePanels.instance) WooResizePanels.instance = new WooResizePanels(gutter, ...targets);
      return WooResizePanels.instance;
  }
  public initWooResizer = (): void => {
    if (!WooResizePanels.gutter && WooResizePanels.targets.length === 0) return alert('잘못된 사용법입니다.');
    this.resizerController;
    WooResizePanels.gutter.addEventListener('mousedown', this.resizerController);
  }
  public disableWooResizer = (): void => {
    WooResizePanels.gutter.removeEventListener('mousedown', this.resizerController);
  }
  public resizerController = (event: { x: number }): void => {
    let prevX: number = event.x;
    const leftPanel: DOMRect = WooResizePanels.targets[0].getBoundingClientRect();
    const handleMouseMoveEvent = (event: { x: number }): void => {
      let newX: number = prevX - event.x;
      WooResizePanels.targets[0].style.width = leftPanel.width - newX + 'px';
    }
    const handleMouseUpClearEvent = (): void => {
      window.removeEventListener('mousemove', handleMouseMoveEvent);
      window.removeEventListener('mouseup', handleMouseUpClearEvent);
    }
    window.addEventListener('mousemove', handleMouseMoveEvent);
    window.addEventListener('mouseup', handleMouseUpClearEvent);
  }
} 

