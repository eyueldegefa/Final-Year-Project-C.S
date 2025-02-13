import React from 'react'
import AboutEtRailways from "../../Vedios/AboutEthipianRailways.mp4"

function AboutUs() {
  return (
    <div>
      <div className="relative h-[400px] w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-96 w-full object-cover"
        >
          <source src={AboutEtRailways} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        </div>
    </div>
  )
}

export default AboutUs