import React from 'react'
import UpdateProfileForme from '@/components/profile-form'
async function  page() {

  return (
    <div className="p-5">
    Account Page
     <UpdateProfileForme/>
    {/* <ProfileImageForm data={userImage} className="col-span-2" /> */}
  </div>
  )
}

export default page
