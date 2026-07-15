let aipdModalBoxAppContext = null

export function setAipdModalBoxAppContext(appContext) {
  if (!appContext || typeof appContext !== 'object') {
    throw new TypeError('setAipdModalBoxAppContext requires a Vue app context')
  }

  aipdModalBoxAppContext = appContext
}

export function getAipdModalBoxAppContext() {
  return aipdModalBoxAppContext
}

export function requireAipdModalBoxAppContext() {
  if (!aipdModalBoxAppContext) {
    throw new Error(
      'AipdModalBox app context is not registered; call setAipdModalBoxAppContext(app._context) after installing Vue plugins',
    )
  }
  return aipdModalBoxAppContext
}

export function clearAipdModalBoxAppContext() {
  aipdModalBoxAppContext = null
}
