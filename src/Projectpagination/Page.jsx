import React, { useEffect, useState } from 'react'
import '../App.css'
const App = () => {
   const [currentpage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([])
  console.log(posts)
  const recordsPerPage = 10;
   const totalPages = Math.ceil(posts.length/recordsPerPage);
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((d)=>setPosts(d))
    
  }, [])
function getRecords(){
 const  firstIndex = (currentpage - 1) * recordsPerPage;
const lastIndex = firstIndex + recordsPerPage;
const currentRecords = posts.slice(firstIndex, lastIndex);
return currentRecords;
}
function handlePrev(){
  if (currentpage > 1){
    setCurrentPage((state) => state - 1)
  }
}
function handleNext(){
if(currentpage < totalPages){
  setCurrentPage ((state) => state + 1)
}
}
function handlePageClick(pageNumber){
setCurrentPage(pageNumber);
}
function renderPageNumbers() {
  const pageNumbersArray= Array.from({length:totalPages}, (_,i)=> i+1);
  return pageNumbersArray.map((pageNumber)=>{
    // const className = currentpage === pageNumber ? 'active-page' : '';

    return(
      <button key={pageNumber} className={currentpage === pageNumber ? 'active-page' : ''} onClick={()=>handlePageClick(pageNumber)}>{pageNumber}</button>
    )
  })
}
  return (
    <div>
{
getRecords().map((item, index)=>{
  return(
    <div key ={index}>
    <span>{item.id}</span>  <span>{item.title}</span>
      </div>
  )

})
}
<button onClick={handlePrev}>prev</button>
{renderPageNumbers()}
<button onClick={handleNext}>next</button>
    </div>
  )
}

export default App