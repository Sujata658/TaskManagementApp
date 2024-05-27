import { ThemeButton } from '@/Components/SideSheet/ThemeButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import moment from 'moment'

const GreetNav = () => {
    return (
        <>
            <div className="flex justify-between my-4 mx-8">
                <div>
                    <div>
                        <h1 className="text-2xl font-bold">Good Morning, User</h1>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Today is {moment().format('dddd, MMMM Do YYYY')}</p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>

                    <ThemeButton />
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                </div>

            </div>
        </>
    )
}



export default GreetNav