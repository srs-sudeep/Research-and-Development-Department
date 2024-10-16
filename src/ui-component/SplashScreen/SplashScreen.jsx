import React, { useEffect } from 'react'
import gif from '/gif/Dhanvantari Loader.gif'
const SplashScreen = () => {
  return (
    <div className="loader bg-white">
      <img src={gif} className="h-[100vh] w-[100vw]" alt="Loading" />
    </div>
  )
}

export default SplashScreen
