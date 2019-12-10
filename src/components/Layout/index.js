import React, { useEffect } from 'react';
import { Flex, Box } from 'rebass';
import { NavLink } from 'react-router-dom';

import css from 'css/Layout.module.css';


const Layout = ({ children }) => {
  const root = document.getElementById('root');

  useEffect(() => {
    let theme = localStorage.getItem('user-theme');

    theme = theme
      ? theme
      : 'theme-light';

    root.classList.add(theme);
  }, [])

  const changeThemeHandler = () => {
    // THEME NOT WORKING. USING REGULAR STYLING ASSIGNATION INSTEAD

    const dark = root.classList.contains('theme-dark');
    
    if (dark) {
      root.classList.remove('theme-dark');
      root.classList.add('theme-light');
      localStorage.setItem('user-theme', 'theme-light')
    } else {
      root.classList.remove('theme-light');
      root.classList.add('theme-dark');
      localStorage.setItem('user-theme', 'theme-dark');
    }
  }

  return (
    <div className={css.App__Container}>
      <Flex as="header"
        alignItems="center"
        justifyContent="flex-start"
        width={1}
        className={css.Navigation__Container}>
        {/* <Flex>
          <Box width={[1/4, 1/2, 1/3]}>
            <button className={`${css.Btn} ${css.Primary}`}
              onClick={changeThemeHandler}>
              Change Theme
            </button>
          </Box>
        </Flex> */}
        <Flex as="nav" 
          alignItems="center"
          justifyContent="space-between"
          width={[3/4, 1/2, 1/3]}>
          <Flex as="ul"
            width={1}
            p={3}>
            <Box as="li"
              width={1/2}>
              <NavLink 
                exact
                to="/"
                activeClassName={css.Active}>
                Homepage
              </NavLink>
            </Box>
            <Box as="li"
              width={1/2}>
              <NavLink 
                exact
                to="/episodes"
                activeClassName={css.active}>
                Episodes
              </NavLink>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Flex as="main"
        className={css.Main_Content__Container}
        width={1}
        alignItems="center"
        justifyContent="flex-start"
        flexDirection={['column-reverse', 'column', 'column']}>
        { children }
      </Flex>
      <Flex as="footer"
        width={1}
        p={5}
        alignItems="center"
        justifyContent="space-between"
        className={css.Footer__Container}>
        <Box as="h3">
          Footer Content
        </Box>
      </Flex>
    </div>
  )
}

export default Layout;