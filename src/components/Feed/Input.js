import React, { useRef, useState } from 'react';

import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';
import './Input.scss';
import { db, storage } from '../../firebase-config';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import EmojiPicker from './EmojiPicker';

const Input = () => {
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);
  const user = useSelector(selectUser);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      uid: user.uid,
      // id: doc.id,
      // username: user.name,
      // userImg: user.image,
      // tag: user.tag,
      name: user.displayName,
      email: user.email,
      // username: user.username,
      photoUrl: user.photoUrl || '',
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image}`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        });
      });
    }
    setLoading(false);
    setInput('');
    setSelectedFile(null);
    setShowEmojis(false);
  };

  const addEmoji = (emoji) => {
    setInput(input + emoji.native);
    console.log(input);
    setShowEmojis(false);
  };

  return (
    <div className={loading ? 'input__loading' : 'input'}>
      {user && <img src={user.photoUrl} alt="" className="input__img" />}
      <div className="input__textOuter">
        <div
          className={`${
            selectedFile || input
              ? 'input__textInner__withImg'
              : 'input__textInner'
          }`}
        >
          <textarea
            value={input}
            rows="2"
            onChange={(e) => setInput(e.target.value)}
            name=""
            id=""
            className="input__textArea"
            placeholder="What's happening?"
            resize="none"
          />
        </div>

        {selectedFile && (
          <div className="selected__files">
            <div
              className="selected__filesInner"
              onClick={() => setSelectedFile(null)}
            >
              <XIcon className="x__icon" />
            </div>
            <img
              src={selectedFile}
              alt="selected file"
              className="selected__file"
            />
          </div>
        )}

        {!loading && (
          <div className="emoji__container">
            <div
              className="emoji__wrap"
              onClick={() => filePickerRef.current.click()}
            >
              <PhotographIcon className="emoji__icon" />
              <input
                type="file"
                className="emoji__input"
                ref={filePickerRef}
                onChange={addImageToPost}
              />
            </div>
            <div className="emoji__wrap">
              <ChartBarIcon className="emoji__icon" />
            </div>
            <div
              className="emoji__wrap"
              onClick={() => setShowEmojis(!showEmojis)}
            >
              <EmojiHappyIcon className="emoji__icon" />
            </div>
            <div className="emoji__wrap">
              <CalendarIcon className="emoji__icon" />
            </div>

            {showEmojis && (
              <EmojiPicker
                className="emoji__picker"
                theme="dark"
                onEmojiSelect={addEmoji}
              />
            )}

            <button
              className={
                !input && !selectedFile ? 'disabled' : 'input__tweetBtn'
              }
              disabled={!input && !selectedFile}
              onClick={() => sendPost()}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
