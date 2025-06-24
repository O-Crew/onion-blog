import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"
import qrcode from "@/assets/image/qrcode.jpg"

export function Pop({children}: {children: React.ReactNode}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Image src={qrcode} alt="WeChat" width={280} height={200} />
      </PopoverContent>
    </Popover>
  )
}
