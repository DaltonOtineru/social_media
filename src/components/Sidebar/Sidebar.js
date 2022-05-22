import React from 'react';
import './Sidebar.scss';
import SidebarLinks from './SidebarLinks';
import { BsTwitter } from 'react-icons/bs';
import { BsThreeDots } from 'react-icons/bs';

// const renderLinks = () => {
//   return accountLinksdata.map((link) => <Link to={link.path} />);
// };

// const Sidebar = () => {
//   return (
//     <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
//       <div className="flex items-center justify-center w-12 h-12 hoverAnimation p-3 xl:ml-24 ">
//         {/* <BsTwitter /> */}
//         <img src="https://rb.gy/ogau5a" alt="twitter" />
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

const Sidebar = () => {
  return (
    <section className="sidebar">
      <div className="sidebar__logoWrap hoverAnimation">
        <BsTwitter className="sidebar__logo" />
      </div>
      <div className="sidebar__linksWrap">
        <SidebarLinks classname="sidebar__links" />
      </div>
      <button className="sidebar__button ">Tweet</button>
      <div className="sidebar__imgWrap hoverAnimation">
        <img
          src="https://lh3.googleusercontent.com/a/AATXAJwCsuneWAkKlHwMPxOmLNjFACEvbtN8QPwbUsZ-=s96-c"
          alt=""
          className="sidebar__img "
        />
        <div className="sidebar__userInfo">
          <h4 className="sidebar__username">Dalton Otineru</h4>
          <p className="sidebar__userHandle">@obey.giant</p>
        </div>
        <div className="sidebar__dotsWrap">
          <BsThreeDots className="sidebar__dots" />
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
