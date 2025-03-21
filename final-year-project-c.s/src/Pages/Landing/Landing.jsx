import React from 'react'
import Layout from '../../Components/Layout/Layout'
import Banner from '../../Components/Banner/Banner'
import Booking from '../../Components/Booking/Booking'
import Home from '../../Components/Home/Home'

function Landing() {
  return (
    <div>
        <Layout>
            <Banner/>
            <Booking/>
            <Home/>
        </Layout>
    </div>
  )
}

export default Landing