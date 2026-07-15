import { ElDialog, ElDrawer } from 'element-plus'

import { AipdOverlay } from './AipdOverlay.js'

export class AipdBaseElDialog extends AipdOverlay {
  constructor(contentComponent, defaultConfig = {}) {
    super({
      contentComponent,
      overlayComponent: ElDialog,
      className: 'aipd-modal-box__dialog',
      defaultConfig: {
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        ...defaultConfig,
      },
    })
  }
}

export class AipdBaseElDrawer extends AipdOverlay {
  constructor(contentComponent, defaultConfig = {}) {
    super({
      contentComponent,
      overlayComponent: ElDrawer,
      className: 'aipd-modal-box__drawer',
      defaultConfig: {
        withHeader: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        ...defaultConfig,
      },
    })
  }
}
