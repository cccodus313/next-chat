'use client';

import { useRef } from 'react';
import { postData } from '../action';

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form
      action={async (formData) => {
        await postData(formData);
        formRef.current?.reset();
      }}
      ref={formRef}
      className='p-6 fixed bottom-0 left-0 w-full bg-white'
    >
      <div className='flex'>
        <input
          type='text'
          name='message'
          placeholder='메세지를 입력하세요'
          className='flex-grow py-2 px-4 outline-none'
        />
        <button type='submit' className='bg-red-300 hover:bg-red-400 text-white py-2 px-4 rounded-full'>
          보내기
        </button>
      </div>
    </form>
  );
}
