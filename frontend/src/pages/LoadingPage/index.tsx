import React, { useEffect } from 'react'

export default function LoadingPage() {

  useEffect(() => {
    console.log("loading page used")
  }, [])

  return (
    <div>LOADING...</div>
  )
}
