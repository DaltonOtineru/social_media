import React from 'react';
import './Widgets.scss';
import { SearchIcon } from '@heroicons/react/outline';
import react from '../../assets/react.png';
import javascript from '../../assets/js.jpeg';
import next from '../../assets/nextjs.png';
import firebase from '../../assets/firebase.jpeg';
import WhoToFollowItem from './WhoToFollowItem';

const Widgets = () => {
  return (
    <section className="widgets">
      <div className="widgets__inner">
        <div className="widgets__searchHeader">
          <div className="widgets__searchWrap">
            <div className="widgets__searchIconWrap">
              <SearchIcon className="widgets__searchIcon" />
            </div>
            <input
              type="text"
              className="widgets__searchInput"
              placeholder="Search Twitter"
            />
          </div>
        </div>

        <div className="widgets__whoToFollow">
          <div className="whoToFollow__header">
            <h3 className="header__text">Who to follow</h3>
          </div>
          <div className="widgets__whoToFollowItems">
            <WhoToFollowItem name="React" handle="@reactjs" img={react} />
            <WhoToFollowItem
              name="JavaScript"
              handle="@javascript"
              img={javascript}
            />
            <WhoToFollowItem
              name="Firebase"
              handle="@firebase"
              img={firebase}
            />
            <WhoToFollowItem name="Next.js" handle="@nextjs" img={next} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Widgets;
