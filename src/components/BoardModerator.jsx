import React, { useEffect, useState } from 'react';

import UserService from '../services/user-service';

const BoardModerator = () => {
  const [content, setContent] = useState();
  useEffect(() => {
    UserService.getModeratorBoard().then(
      (resp) => {
        setContent(resp.data);
      },
      (err) => {
        const resMessage =  
          err?.response?.data?.message ||
          err.message ||
          String(err);

        setContent(resMessage);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardModerator;
