'use client'
import { submitComment } from "@/services"
import { useEffect, useRef, useState } from "react"

type Props = {}

const CommentsForm = (slug: string) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const commentEl = useRef<HTMLTextAreaElement>()
  const nameEl = useRef<HTMLInputElement>()
  const emailEl = useRef<HTMLInputElement>()
  const storeDataEl = useRef<HTMLInputElement>()

  const handleCommentSubmission = () => {
    setError(false)
    const comment = commentEl.current?.value;
    const name = nameEl.current?.value;
    const email = emailEl.current?.value;
    const storeData = storeDataEl.current?.checked;

    if(!comment || !name || !email){
      setError(true)
      return
    }

    const commentObj = {
      name, email, comment, slug
    }

    if(storeData){
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    }else{
      window.localStorage.removeItem('name', name)
      window.localStorage.removeItem('email', email)
    }

    console.log(commentObj)

    submitComment(commentObj)
    .then((res) => {
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000);
    })

  }


  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name')
    emailEl.current.value = window.localStorage.getItem('email')
  },[])

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8
    ">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a Reply
      </h3>
      <div className="grid grid-cols-1 gap-4
       mb-4">
        <textarea name="comment" ref={commentEl} id="" cols={30} rows={10} 
        className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg bg-gray-100 text-gray-700"
        placeholder="comment"
        />
       </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4
       mb-4">
        <input type="text" name="name" id="" 
        ref={nameEl}
        className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg bg-gray-100 text-gray-700"
        placeholder="name"
        />
       <input type="text" name="email" id="" 
       ref={emailEl}
       className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg bg-gray-100 text-gray-700"
       placeholder="email"
       />
       </div>
       <div className="grid grid-cols-1 gap-4
       mb-4">
        <div>
          <input
          ref={storeDataEl}
          name="storeData"
          value='true'
          type="checkbox"
          id="storeData"
          />
          <label className="text-gray-500 ml-2 cursor-pointer" htmlFor="storeData">
            Save my email and name for the next time I comment.
          </label>
        </div>
       </div>
     {error && <p className="text-xs text-red-500">All fields are required</p>}
     <div className="mt-8">
      <button type="button" 
      onClick={handleCommentSubmission}
      className="transition duration-500 ease-in hover:bg-indigo-900 inline-block rounded-full bg-blue-600 text-lg text-wrap px-8 py-3 cursor-pointer"
      > Post Comment</button>
      {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">
        Comment submitted for review
        </span>}
     </div>
    </div>
  )
}

export default CommentsForm