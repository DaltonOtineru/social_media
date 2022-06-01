import React from 'react';
import './Widgets.scss';
import { SearchIcon } from '@heroicons/react/outline';
import avatar from '../../assets/avatar.jpeg';
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
        <div className="widgets__relevant">
          <div className="widgets__relevantHeader">
            <h3>Relevant People</h3>
          </div>
          <div className="widgets__relevantBottom">
            <div className="relevant__imgWrap">
              <img src={avatar} alt="" className="relevant__avatar" />
            </div>
            <div className="relevant__info">
              <div className="relevant__infoTop">
                <div className="relevant__titles">
                  <div className="relevant__name">DataDog, Inc.</div>
                  <div className="relevant__handle">@datadoghq</div>
                </div>
                <div className="relevant__follow">
                  <button className="relevant__btn">Follow</button>
                </div>
              </div>
              <div className="relevant__infoBottom">
                <p>
                  Datadog is the monitoring and security platform for cloud
                  applications
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="widgets__whoToFollow">
          <div className="whoToFollow__header">
            <h3 className="header__text">Who to follow</h3>
          </div>
          <div className="widgets__whoToFollowItems">
            <WhoToFollowItem
              name="Bill Gates"
              handle="@bill__gates"
              img={avatar}
            />
            <WhoToFollowItem
              name="Elon Musk"
              handle="@occupy__mars"
              img={avatar}
            />
            <WhoToFollowItem
              name="Athena Coronado"
              handle="@psycho-nene"
              img={avatar}
            />
            <WhoToFollowItem
              name="Kaya Coronado"
              handle="@mommy-longlegs"
              img={avatar}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Widgets;
