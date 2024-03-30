'use client'

import useParallax from '@/hooks/use-parallax'
import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {}

const MePage: FC<IProps> = memo(() => {
  const parallax = useParallax()!

  const normalOps = {
    isTransparent: true,
    startShowPct: 0.3,
    solidPct: 0.5,
  }

  return (
    <div className="me-page text-gray-300 pb-8">
      <section className="flex justify-center mt-[40vh] text-xl">
        <span>试试往下滑~</span>
        <span className="animate-bounce">👇</span>
      </section>

      <section className="mt-[40vh]">
        <p
          className="opacity-0 relative z-30"
          ref={(elRef) => parallax(elRef, { ...normalOps, speed: -4 })}
        >
          <span className="block text-[22vw]">你好啊</span>
          <span className="block text-right text-[15vw]">我是Cheems</span>
        </p>
        <div className="me-images">
          <Image
            className="w-2/5 float-right relative z-10"
            src="/images/about-me/me_02.jpg"
            width={0}
            height={0}
            sizes="100vw"
            alt="about-me"
            ref={(elRef) => parallax(elRef, { ...normalOps, speed: -3 })}
          />
          <Image
            className="w-1/3"
            src="/images/about-me/me_01.jpg"
            width={0}
            height={0}
            sizes="100vw"
            alt="about-me"
            ref={(elRef) => parallax(elRef, { ...normalOps, speed: -1 })}
          />
          <Image
            className="w-2/5 float-right"
            src="/images/about-me/me_03.jpg"
            width={0}
            height={0}
            sizes="100vw"
            alt="about-me"
            ref={(elRef) => parallax(elRef, { ...normalOps, speed: -2 })}
          />
        </div>
      </section>

      <section>
        <p
          className="flex flex-col relative z-30 w-full py-20"
          ref={(elRef) => parallax(elRef, { ...normalOps, speed: -2 })}
        >
          <span className="text-[10vw]">一名计算机科学与技术专业的大四学生</span>
          <span className="text-[5vw]">就读于西南林业大学</span>
        </p>
        <div className="me-images relative">
          <Image
            className="w-full"
            src="/images/about-me/me_05.jpg"
            width={0}
            height={0}
            sizes="100vw"
            alt="about-me"
            ref={(elRef) => parallax(elRef, { ...normalOps, speed: -1.5 })}
          />
        </div>
      </section>

      <section>
        <p
          className="flex flex-col items-center relative z-30 w-full text-lg lg:text-[2vw] leading-normal"
          ref={(elRef) => parallax(elRef, { ...normalOps, speed: -2 })}
        >
          <span>
            <span className="text-[--primary-color]">编程</span>和
            <span className="text-[--primary-color]">开源</span>爱好者
          </span>
          <span>
            热爱
            <span className="text-[--primary-color]">吉他</span>、
            <span className="text-[--primary-color]">篮球</span>和
            <span className="text-[--primary-color]">阅读</span>
          </span>
          <span>
            喜欢<span className="text-[--primary-color]">摇滚</span>/
            <span className="text-[--primary-color]">民谣</span>/
            <span className="text-[--primary-color]">流行</span>音乐
          </span>
          <span>
            最喜欢的游戏是<span className="text-[--primary-color]">《巫师3》</span>
          </span>
          <span>
            最喜欢的小说是<span className="text-[--primary-color]">《三体》</span>和
            <span className="text-[--primary-color]">《冰与火之歌》</span>
          </span>
        </p>
        <div className="me-images flex flex-col">
          <Image
            className="w-2/3"
            src="/images/about-me/me_06.jpg"
            width={0}
            height={0}
            sizes="100vw"
            alt="about-me"
            ref={(elRef) => parallax(elRef, { ...normalOps, speed: -1.7 })}
          />
          <Image
            className="w-1/2 self-end"
            src="/images/about-me/me_07.jpg"
            width={0}
            height={0}
            sizes="100vw"
            alt="about-me"
            ref={(elRef) => parallax(elRef, { ...normalOps, speed: -1.5 })}
          />
          <Image
            className="w-5/12"
            src="/images/about-me/me_08.jpg"
            width={0}
            height={0}
            sizes="100vw"
            alt="about-me"
            ref={(elRef) => parallax(elRef, { ...normalOps, speed: -1.1 })}
          />
        </div>
      </section>

      <section>
        <p
          className="flex flex-col relative z-30 w-full"
          ref={(elRef) => parallax(elRef, { ...normalOps, speed: -1.5 })}
        >
          <span className="text-[10vw]">闲暇之余</span>
          <span className="text-[10vw]">抬头看看天吧</span>
        </p>
        <div className="me-images flex flex-col">
          <Image
            className="w-7/12"
            src="/images/about-me/me_09.jpg"
            width={0}
            height={0}
            sizes="100vw"
            alt="about-me"
            ref={(elRef) => parallax(elRef, { ...normalOps, speed: -1.3 })}
          />
          <Image
            className="w-7/12 self-end"
            src="/images/about-me/me_10.jpg"
            width={0}
            height={0}
            sizes="100vw"
            alt="about-me"
            ref={(elRef) => parallax(elRef, { ...normalOps, speed: -1.1 })}
          />
          <Image
            className="w-7/12"
            src="/images/about-me/me_11.jpg"
            width={0}
            height={0}
            sizes="100vw"
            alt="about-me"
            ref={(elRef) => parallax(elRef, { ...normalOps, speed: -0.9 })}
          />
          <Image
            className="w-7/12 self-end"
            src="/images/about-me/me_13.jpg"
            width={0}
            height={0}
            sizes="100vw"
            alt="about-me"
            ref={(elRef) => parallax(elRef, { ...normalOps, speed: -0.7 })}
          />
        </div>
      </section>

      <section>
        <p
          className="flex flex-col relative z-30 text-center text-[6vw] mb-10"
          ref={(elRef) => parallax(elRef, { ...normalOps, speed: -1 })}
        >
          <span>很高兴能专注于自己喜欢的东西</span>
          <span>愿大家都能因此沉迷其中</span>
        </p>

        <div className="me-images relative w-full h-[100vh]">
          <Image
            className="object-cover"
            src="/images/about-me/me_14.jpg"
            fill
            sizes="100vw"
            alt="about-me"
            ref={(elRef) => parallax(elRef, { ...normalOps, speed: -1 })}
          />
        </div>
      </section>

      <section
        className="pb-20"
        ref={(elRef) =>
          parallax(elRef, { ...normalOps, startShowPct: 0.1, solidPct: 0.1, speed: -1.1 })
        }
      >
        <p className="flex flex-col items-center mb-10">
          <span className="text-[8vw] mb-1">联系我</span>
          <span className="lg:text-[2vw] indent-[2em]">
            如果您有任何问题，或者仅仅想说一句“hi”!
          </span>
        </p>

        <nav className="flex flex-col items-center gap-1 text-xl text-white">
          <div>
            <i className="iconfont icon-email mr-1" />
            <span>邮箱：</span>
            <Link className="underline" href="mailto:1040461147@qq.com">
              m18669275339@163.com
            </Link>
          </div>
          <div>
            <i className="iconfont icon-QQ mr-1 text-2xl" />
            <span>QQ：1040461147</span>
          </div>
        </nav>
      </section>
    </div>
  )
})

export default MePage
MePage.displayName = 'MePage'
