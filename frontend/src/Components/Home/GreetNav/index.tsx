import Search from '@/Components/General/Search'
import { ThemeButton } from '@/Components/SideSheet/ThemeButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IoSearch } from "react-icons/io5";
import { useUser } from '@/context/UserContext'
import moment from 'moment'

const GreetNav = () => {
    const {user} = useUser()
    return (
        <>
            <div className="flex justify-between my-4 mx-8">
                <div>
                    <div>
                        <h1 className="text-2xl font-bold">Greetings, {user?.name}</h1>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">{moment().format('dddd, MMMM Do YYYY')}</p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <Search placeholder="Search for tasks" leadingIcon={<IoSearch/>} focusColor='focus:border-foreground'/>
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