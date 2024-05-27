import { Link, Outlet } from 'react-router-dom';

import {homeLinks} from '../const'


const Links = () => {
  return (
    <>
      <div>
            {homeLinks.map((link) => {
                return (
                    <Link to={link.path} key={link.id} className='flex gap-8  items-center mb-3 hover:bg-slate-300 dark:hover:text-background px-4 py-3 text-md rounded-lg'>
                        {link.icon && <link.icon />}
                        <div>{link.title}</div>
                    </Link>
                );
            })}
        </div>
        <Outlet />
    </>
  )
}

export default Links