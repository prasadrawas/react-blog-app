import React from 'react'
import { CreateBlog } from '../../components'
import { useParams } from 'react-router-dom'

function EditBlogPage() {
  const {id} = useParams();
  return (
   <CreateBlog id={id}/>
  )
}

export default EditBlogPage