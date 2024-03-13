import { useState } from 'react'
import { Sidebar } from './Sidebar'
import '../../assets/css/layout-sidebar.css'
import { Container } from '../ui'
import { Outlet } from 'react-router-dom'

export const LayoutSidebar = ({children}) => {

    const [sidebarOpened, setSidebarOpened] = useState(false)


  return (
    <div className={sidebarOpened ? "sidebarState active" : "sidebarState"}>
    <section>
      <Sidebar 
        sidebarOpened={sidebarOpened}
        setSidebarOpened={setSidebarOpened}
      /> 
    </section>
    <section>
    <Container className="py-5">
      {children}
      <Outlet />
    </Container>
    </section>
  </div>
  )
}
