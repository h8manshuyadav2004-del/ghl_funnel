import React from 'react'
import ELI from './ELI Roadlife/eli'
import { useWidgetContext } from './context/WidgetContext'
import Javier from './Javier/javier'

const App = () => {
  // const {
  //   type
  // } = useWidgetContext()

  return (<>
  {/* { type === 'javier' ? (<Javier />) :(<ELI/>)} */}
  <Javier/>
  </> 
  )

}

export default App