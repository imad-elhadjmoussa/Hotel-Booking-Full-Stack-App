
import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "./button"
import { Calendar } from "./calendar"
import { Label } from "./label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover"

type DatePickerProps = {
    onChange: (date: Date | undefined) => void
    value: Date | undefined
    label: string
}

export function DatePicker({ onChange, value, label }: DatePickerProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <div className="flex flex-col gap-1">
            <Label htmlFor="date" className="px-1">
                {label}
            </Label>
            
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between"
                    >
                        {value ? value.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            onChange(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
