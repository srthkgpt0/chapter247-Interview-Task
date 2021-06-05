import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/sidebar.css'
import { withRouter } from 'react-router'
import { connect, useSelector } from 'react-redux'

import { item as sidebarJSON } from '../../utilities/sidebar'

const Sidebar = ({ match, cmsData, userType = 'admin', userData }) => {
  const path = match.path
  // const userTypes = useSelector((state) => state.userData.userType)
  return (
    <>
      <aside className='c-sidemenu' id='sidemenu'>
        <div className='sidebar'>
          <ul id='sideSubMenu' className='nav flex-column'>
            {sidebarJSON.map((data, index) => {
              if (data.userTypes.includes(userType) && data.addInSideBar) {
                if (userType === 'admin') {
                  return (
                    <li key={index}>
                      <Link
                        className='nav-link nav__link ripple-effect'
                        to={data.endPoint}
                      >
                        <span className='nav__icon'>
                          <i className={data.icon}></i>
                        </span>
                        <span className='nav__title'>{data.title}</span>
                      </Link>
                    </li>
                  )
                }
              }
            })}
          </ul>
        </div>
      </aside>
    </>
  )
}

// const mapStateToProps = (state) => {
//   return {
//     cmsData: state.cms.cmsData,
//     userType: state.auth.userData.userType || '',
//     userData: state.auth.userData || ''
//   }
// }

// export default withRouter(connect(mapStateToProps, null)(Sidebar))
export default withRouter(Sidebar)
