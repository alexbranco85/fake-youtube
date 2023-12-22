'use client';

import { Toast } from 'flowbite-react';
import Icons from '../Icons/Icons';
import { useEffect } from 'react';

const CustomToast = ({ open, message, title, status, setOptions }) => {
  
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOptions({ open: false, message: null, title: null, status: null })
      }, 2000);
    }
  }, [open])
  
  return (
    <>
      {open && (
        <Toast className='absolute z-50 w-min w-max top-2 right-2'>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
            {status == "error" ? (
              Icons("error")
            ) : (
              Icons("success")
            )}
          </div>
          <div>
          <p className="ml-3 text-sm text-black font-bold">{title ? title : ""}</p>
          <p className="ml-3 text-sm font-normal text-black">{message ? message : ""}</p>
          </div>
          <Toast.Toggle className='items-center justify-center' />
        </Toast>
      )}
    </>
  );
}

export default CustomToast;