import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FooterRecord: React.FC = () => {
  return (
    <div className="report xs:flex xs:justify-center xs:flex-wrap xs:gap-2 text-center">
      <Link
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=53010202001912"
        target="_blank"
        className="flex items-center gap-1 hover:underline"
      >
        <Image
          src="/images/common/report.png"
          width={0}
          height={0}
          sizes="40px"
          alt="report"
          className="w-4 h-4 lg:w-5 lg:h-5"
        />
        <span>滇公网安备53010202001912号</span>
      </Link>
      <Link
        href="https://beian.miit.gov.cn/#/Integrated/index"
        target="_blank"
        className="hover:underline"
      >
        滇ICP备2024022456号
      </Link>
    </div>
  )
}

export default FooterRecord
