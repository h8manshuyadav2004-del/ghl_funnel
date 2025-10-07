import React from 'react'
import ELI from './ELI Roadlife/eli'
import { useWidgetContext } from './context/WidgetContext'

const App = () => {
  const {type}=useWidgetContext()
  return (
   <ELI/>
  )
}

export default App