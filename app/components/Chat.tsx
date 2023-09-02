'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Pusher from 'pusher-js';

interface dataProps {
  data: {
    User: {
      image: string;
      name: string | null;
    };
    message: string;
  }[];
}

export default function ChatComponent({ data }: dataProps) {
  const [comments, setComments] = useState(data);
  const messageRef = useRef<HTMLInputElement>(null);

  var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
    cluster: 'ap3',
  });

  var channel = pusher.subscribe('chat');
  channel.bind('codus', function (data: any) {
    const totalComments = JSON.parse(data.message);

    setComments((prev) => [...prev, totalComments]);
  });

  const scrollMessages = () => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollMessages();
  }, [setComments]);

  return (
    <div className='p-6 flex-grow max-h-screen overflow-y-auto py-32'>
      <div className='flex flex-col gap-4'>
        {comments.map((message, index) => (
          <div key={index}>
            <div className='flex items-center'>
              <Image
                src={message.User.image as string}
                alt='user image'
                className='w-12 h-12 object-cover rounded-full mr-4'
                width={50}
                height={50}
              />
              <div className='rounded-full bg-white p-4 shadow-md self-start'>{message.message}</div>
            </div>
            <p className='font-light text-sm text-gray-600'>{message.User.name}</p>
          </div>
        ))}
        <div ref={messageRef}></div>
      </div>
    </div>
  );
}
