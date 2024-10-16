import { lazy } from 'react'
import Loadable from 'ui-component/Loadable'

const lazyLoad = (importFunc) => {
  return Loadable(lazy(importFunc))
}

export default lazyLoad
