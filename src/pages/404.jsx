import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Oops from "../../public/assets/images/img/oops.png"

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Head>
        <title>Page Not Found | 404</title>
      </Head>
      <div className="not-found-container">
        <div className="content-wrapper">
          <h1 className="status-code">404</h1>
          <p className="message">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="image-container">
            <Image 
              src={Oops}
              alt="Sad face illustration"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
          
          <p className="redirect-message">
            You'll be redirected to the home page shortly...
            <span className="countdown"></span>
          </p>
        </div>
        
        <style jsx global>{`
          :root {
            --primary-color: #4a6fa5;
            --secondary-color: #6c8fc7;
            --text-color: #2d3748;
            --text-light: #718096;
            --gradient-start: #f5f7fa;
            --gradient-end: #c3cfe2;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
          
          @keyframes countdown {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>
        
        <style jsx>{`
          .not-found-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            text-align: center;
            animation: fadeIn 0.8s ease-out;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
            justify-content: flex-start; /* Changed from center to flex-start */
            padding-top: 4rem; /* Added more padding at the top */
          }
          
          .content-wrapper {
            max-width: 600px;
            width: 100%;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(8px);
            animation: fadeIn 1s ease-out;
            margin-top: 2rem; /* Added margin at the top */
          }
          
          .status-code {
            font-size: 5rem;
            color: var(--primary-color);
            margin: 0 0 1rem;
            font-weight: 300;
            letter-spacing: 2px;
            background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .message {
            font-size: 1.4rem;
            color: var(--text-color);
            margin-bottom: 2rem;
            line-height: 1.6;
            font-weight: 400;
          }
          
          .image-container {
            position: relative;
            width: 200px;
            height: 200px;
            margin: 2rem auto;
            animation: float 3s ease-in-out infinite;
          }
          
          .redirect-message {
            font-size: 1rem;
            color: var(--text-light);
            margin-top: 2rem;
            position: relative;
            padding-bottom: 5px;
          }
          
          .countdown {
            display: block;
            height: 2px;
            background: var(--primary-color);
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            animation: countdown 5s linear forwards;
          }
          
          @media (max-width: 600px) {
            .status-code {
              font-size: 3.5rem;
            }
            
            .message {
              font-size: 1.1rem;
            }
            
            .image-container {
              width: 150px;
              height: 150px;
            }

            .not-found-container {
              padding-top: 2rem;
            }
          }
        `}</style>
      </div>
    </>
  );
}