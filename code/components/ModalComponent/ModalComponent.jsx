const ModalComponent = ({ children, title, open, setOpen }) => {


  return (
    <>
      {open && (
        <div className="bg-gray-800 w-full h-screen bg-opacity-80 transition-all duration-1000 fixed top-0 z-50">
          <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" className="flex fixed z-50 justify-center items-center w-full max-h-full">
            <div class="relative p-4 w-full max-w-2xl max-h-full">

              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <button onClick={() => setOpen(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>

                {children}
                
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ModalComponent;