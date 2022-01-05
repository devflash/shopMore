/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';
import Link from 'next/link';
import { useAuth } from '../../context';
import Button from '../common/button';
import { useRouter } from 'next/router';
const header = css`
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
  @media screen and (min-width: 375px) {
    display: flex;
    justify-content: space-between;
    background-color: #2c3e50;
  }
`;

const title = css`
  font-size: 1.2rem;
`;

const iconsMenu = css`
  position: relative;
  @media screen and (min-width: 375px) {
    display: none;
  }
`;

const icon = css`
  color: #fff;
  font-size: 1.5rem;
  position: absolute;
  right: 0;
  transition-property: transform;
  transition-duration: 0.5s;
`;

const navHeader = css`
  padding: 20px;
  background-color: #2c3e50;
  display: flex;
  justify-content: space-between;
`;

const navList = css`
  background-color: #f18805;
  font-size: 2rem;
  font-weight: 500;
  position: fixed;
  bottom: -250px;
  width: 100%;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  transition-property: bottom;
  transition-duration: 1s;
  transition-timing-function: ease-in-out;
  z-index: 100;
  @media screen and (min-width: 375px) {
    position: unset;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    width: unset;
    background-color: #2c3e50;
  }
`;

const navItems = css`
  list-style: none;
  @media screen and (min-width: 375px) {
    display: flex;
    justify-content: flex-end;
    color: #fff;
    align-items: center;
  }
  li {
    margin: 20px;
    font-size: 1.2rem;
    text-align: center;
  }
`;

const navLink = css`
  text-decoration: none;
  color: #fff;
`;

const showMenu = css`
  bottom: 0;
`;

const showIcon = css`
  transform: scale(1);
`;

const hideIcon = css`
  transform: scale(0);
`;

const btnCss = css`
  padding: 10px;
`;

const Header = () => {
  const [show, setShow] = useState(false);
  const { authUser, signOutUser } = useAuth();

  const router = useRouter();
  const handleSignOut = () => {
    signOutUser().then(() => router.push('/signin'));
  };

  console.log(authUser);
  return (
    <header css={header}>
      <div css={navHeader}>
        <p css={title}>Shop More</p>
        <div css={iconsMenu}>
          <GiHamburgerMenu
            css={[icon, !show ? showIcon : hideIcon]}
            onClick={() => setShow(!show)}
          />
          <ImCross
            css={[icon, show ? showIcon : hideIcon]}
            onClick={() => setShow(!show)}
          />
        </div>
      </div>
      <nav css={[navList, show && showMenu]}>
        <ul css={navItems}>
          {!authUser && (
            <>
              <li>
                <Link href="/signup" type="button" passHref>
                  <a css={navLink}>Sign Up</a>
                </Link>
              </li>
              <li>
                <Link href="/signin" type="button" passHref>
                  <a css={navLink}>Login</a>
                </Link>
              </li>
            </>
          )}
          {authUser.displayName && (
            <li>
              <span css={navLink}>Welcome {authUser.displayName}</span>
            </li>
          )}
          <li>
            <Link href="/" type="button" passHref>
              <a css={navLink}>Orders</a>
            </Link>
          </li>
          <li>
            <Link href="/" type="button" passHref>
              <a css={navLink}>Wishlist</a>
            </Link>
          </li>
          {authUser && (
            <li>
              <Button
                onClick={handleSignOut}
                label="Sign out"
                customCss={btnCss}
              ></Button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
