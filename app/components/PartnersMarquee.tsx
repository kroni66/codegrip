"use client"

import Image from 'next/image'

const partners = [
  {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYwgZt2x9Tf6j804SP_81BcNIuLT87LEpOlw&s',
    alt: 'Google Partner',
    width: 180,
    height: 60,
  },
  {
    src: 'https://www.nicepng.com/png/detail/16-167642_amazon-logo-amazon-logo-white-text.png',
    alt: 'Amazon',
    width: 220,
    height: 60,
  },
  {
    src: 'https://wpmunk.com/wp-content/uploads/2020/11/Stacked-Logo-Inverted.png',
    alt: 'WordPress Partner',
    width: 220,
    height: 60,
  },
]

export function PartnersMarquee() {
  const row = [...partners, ...partners, ...partners]
  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-950 to-transparent" />

      <div className="[--speed:35s] flex w-max animate-partners-marquee gap-12 pr-12">
        {row.map((p, i) => (
          <div key={i} className="flex items-center opacity-90 hover:opacity-100 transition-opacity">
            <Image src={p.src} alt={p.alt} width={p.width} height={p.height} className="h-10 w-auto md:h-12 object-contain" />
          </div>
        ))}
      </div>
    </div>
  )
}
