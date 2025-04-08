
export default function LoadingItem( props:{fontSize :string}) {
    return (
        <div className='w-full text-center  p-10 '>
            <span className={`grid items-center grid-flow-col ${props.fontSize}`}>
                <span className="animate-spin m-1 text-center  font-extrabold justify-self-end">↻</span>
                <span className=" justify-self-start"> Loading . . .</span>
            </span>
        </div>
    )
}

 
