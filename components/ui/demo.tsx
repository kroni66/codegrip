"use client"

import * as React from "react"
import { Home, FileText, CreditCard, Info } from "lucide-react"
import { AnimeNavBar } from "@/components/ui/anime-navbar"
import { useState } from "react"
import { TextScramble } from "@/components/ui/text-scramble"

const items = [
  {
    name: "Home",
    url: "#",
    href: "#",
    icon: Home,
  },
  {
    name: "Convert",
    url: "#",
    href: "#",
    icon: FileText,
  },
  {
    name: "Pricing",
    url: "#",
    href: "#",
    icon: CreditCard,
  },
  {
    name: "About",
    url: "#",
    href: "#",
    icon: Info,
  },
]

export function AnimeNavBarDemo() {
  return <AnimeNavBar items={items} defaultActive="Home" />
}
