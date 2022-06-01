import React from 'react';

const WhoToFollowItem = ({ name, handle, img }) => {
  return (
    <div className="widgets__whoToFollowItem">
      <div className="widgets__followImgWrap">
        <img src={img} alt="account avatar" className="follow__img" />
      </div>
      <div className="widgets__followItemRight">
        <div className="widgets__followAccountInfo">
          <p className="widgets__followAccountName">{name}</p>
          <p className="widgets__followAccountHndle">{handle}</p>
        </div>
        <div className="widgets__followAccountBtnWrap">
          <button className="widgets__followAcountBtn">Follow</button>
        </div>
      </div>
    </div>
  );
};

export default WhoToFollowItem;
