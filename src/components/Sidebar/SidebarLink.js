import React from 'react';
import { Link } from 'react-router-dom';

const AccountLink = ({ title, children, path }) => {
  return (
    <Link title={title} to={path}>
      {children}
      {title}
    </Link>
  );
};

export default AccountLink;

{
  /* <AccountLink title="Explore" path="/">
  <BsTwitter className="sidebar__logo" />
</AccountLink> */
}
