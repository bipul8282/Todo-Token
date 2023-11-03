import React, { useState } from 'react';
import { FaTrash, FaUsers, FaPalette } from 'react-icons/fa';
import styles from './SideBar.module.css';
import Card1 from '../Card/Card1';

function Dashboard() {
  const [showMembers, setShowMembers] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('url(https://c4.wallpaperflare.com/wallpaper/120/445/121/texture-dark-bluri-wallpaper-thumb.jpg)');
  const [members, setMembers] = useState([
    { name: 'Bipul Kumar', github: 'https://github.com/bipul8282' },
   
  ]);



  const clearBoard = (e)=>{
    e.preventDefault()
    localStorage.clear();
    
    window.location.reload()
    
  }
  
  const handleMembersClick = () => {
    setShowMembers(!showMembers);
  };

  const SideBar = () => {
    const [showImageList, setShowImageList] = useState(false);

    const backgroundImages = [
      'https://c4.wallpaperflare.com/wallpaper/120/445/121/texture-dark-bluri-wallpaper-thumb.jpg',
      'https://img.freepik.com/free-vector/realistic-polygonal-background_52683-59998.jpg?w=360',
      'https://c4.wallpaperflare.com/wallpaper/284/753/124/digital-art-dark-wallpaper-preview.jpg',
      'https://cutewallpaper.org/21/mlg-live-wallpaper/Aesthetic-matte-black-patterns-aesthetic-Black-matte-.jpg',
      'https://i.pinimg.com/originals/53/d9/cd/53d9cd303086eae0decfed3d000fc976.jpg',
    ];

    const changeBackground = (image) => {
      setBackgroundImage(`url(${image})`);
      setShowImageList(false);
      const container = document.querySelector(`.${styles.container}`);
      if (container) {
        container.style.backgroundImage = `url(${image})`;
        container.style.backgroundSize = 'cover';
        container.style.backgroundRepeat = 'no-repeat';
      } else {
        console.error('Container element not found');
      }
    };
    
    
   
    return (
    
  
      <div>
        <div style={{ display: 'flex', marginLeft: '0.4rem' }}>
          <span onClick={() => setShowImageList(!showImageList)} className={styles.theme}>Change Theme</span>
        </div>
        {showImageList && (
          <div>
            <ul className={styles.sideImg}>
              {backgroundImages.map((image, index) => (
                <li
                  key={index}
                  onClick={() => changeBackground(image)}
                  className={styles.listItem}
                >
                  <img
                    src={image}
                    alt={`Background ${index + 1}`}
                    className={styles.imagePreview}
                    width="40"
                    height="40"
                    border="1px solid white"
                  />
                  <span className={styles.imageLabel}>Theme {index + 1}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <div className={styles.sidemenu}>
          <ul>
            <li className={styles.listItem}>
              <FaTrash className={styles.icon} />
              <span className={styles.text} onClick={clearBoard}>Clear Board</span>
            </li>
            <li className={styles.listItem} onClick={handleMembersClick}>
              <FaUsers className={styles.icon} />
              <span className={styles.text}>Members</span>
            </li>
            {showMembers && (
              <div className={styles.membersList}>
                <ul>
                  {members.map((member, index) => (
                    <li key={index}>
                      <a href={member.github} target="_blank" rel="noopener noreferrer">
                        {member.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <li className={styles.listItem}>
              <FaPalette className={styles.icon} />
              <SideBar />
            </li>
          </ul>
        </div>
      </div>
      

      <div className={styles.container} style={{ backgroundImage: backgroundImage, backgroundSize: 'cover' }}>
      <Card1 /> 
      </div>


    </div>
  );
}

export default Dashboard;