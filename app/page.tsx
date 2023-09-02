import Image from 'next/image';
import { MainLogin } from './components/Button';
import { getServerSession } from 'next-auth';
import { authOptions } from './lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/chat');
  }
  return (
    <div className='max-w-xl mx-auto mt-32'>
      <img
        src='https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA2MDhfMjA4%2FMDAxNjU0NjUwNjg0ODky.O42pf06XYzhiYk-ZKgio8vr7OjjiHfsUlOT3SaOQSV8g.zb4rK4xuCce7JORkctDNI178B2ia3YKAV2z24Joz2jAg.JPEG.tax_sso%2Fg3b403a22d2610063c2a26a762843868f2eb3f49055af25f95f6ac586e437cbf38936f449381.jpg&type=sc960_832'
        alt='main-logo'
      />
      <MainLogin />
    </div>
  );
}
